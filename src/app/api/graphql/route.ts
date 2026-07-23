import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest, NextResponse } from "next/server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { parse } from "graphql";
import { depthLimit } from "@/lib/jobserver/validation";

type GraphQLHandler = (request: NextRequest) => Promise<Response>;

let handlerPromise: Promise<GraphQLHandler> | null = null;

async function getHandler(): Promise<GraphQLHandler> {
  handlerPromise ??= (async () => {
    const [{ typeDefs }, { resolvers }, { createContext }, { hasRoleDirectiveTransformer }] =
      await Promise.all([
        import("@/lib/jobserver/schema"),
        import("@/lib/jobserver/resolvers"),
        import("@/lib/jobserver/context"),
        import("@/lib/jobserver/directives/hasRole"),
        import("@/lib/jobserver/models"),
      ]);

    let schema = makeExecutableSchema({ typeDefs, resolvers });
    schema = hasRoleDirectiveTransformer(schema);

    const server = new ApolloServer({
      schema,
      introspection: process.env.NODE_ENV !== "production",
      plugins: [
        {
          async requestDidStart() {
            return {
              async didResolveOperation(requestContext) {
                const query = requestContext.request.query;
                if (query) {
                  depthLimit(parse(query));
                }
              },
            };
          },
        },
      ],
    });

    return startServerAndCreateNextHandler(server, {
      context: async (req: NextRequest) => {
        // Convert Headers to plain object for compatibility with @hasRole directive
        const headers: Record<string, string | undefined> = {};
        req.headers.forEach((value, key) => {
          headers[key] = value;
        });
        return createContext({ headers });
      },
    }) as GraphQLHandler;
  })();

  return handlerPromise;
}

async function handle(request: NextRequest) {
  try {
    const handler = await getHandler();
    return handler(request);
  } catch (err: any) {
    handlerPromise = null;
    return NextResponse.json(
      {
        errors: [
          {
            message:
              process.env.NODE_ENV === "production"
                ? "GraphQL server failed to start. Check DATABASE_URL and server logs."
                : err.message,
          },
        ],
      },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  return handle(request);
}

export async function POST(request: NextRequest) {
  return handle(request);
}
