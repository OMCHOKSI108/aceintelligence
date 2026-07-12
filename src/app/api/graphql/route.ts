import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { parse } from "graphql";
import { typeDefs } from "@/lib/jobserver/schema";
import { resolvers } from "@/lib/jobserver/resolvers";
import { createContext, type Context } from "@/lib/jobserver/context";
import { hasRoleDirectiveTransformer } from "@/lib/jobserver/directives/hasRole";
import { depthLimit } from "@/lib/jobserver/validation";
import "@/lib/jobserver/models"; // ensure all models are registered

let schema = makeExecutableSchema({ typeDefs, resolvers });
schema = hasRoleDirectiveTransformer(schema);

const server = new ApolloServer<Context>({
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

const handler = startServerAndCreateNextHandler(server, {
  context: async (req: NextRequest) => {
    // Convert Headers to plain object for compatibility with @hasRole directive
    const headers: Record<string, string | undefined> = {};
    req.headers.forEach((value, key) => {
      headers[key] = value;
    });
    return createContext({ headers });
  },
});

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
