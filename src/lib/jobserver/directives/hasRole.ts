import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { GraphQLSchema } from "graphql";
import { verifyToken, JwtPayload } from "../utils/jwt";

const ROLE_HIERARCHY: Record<string, number> = {
  SUPER_ADMIN: 3,
  ADMIN: 2,
  EMPLOYEE: 1,
};

export function hasRoleDirectiveTransformer(schema: GraphQLSchema): GraphQLSchema {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const hasRoleDirective = getDirective(schema, fieldConfig, "hasRole")?.[0];
      if (!hasRoleDirective) return fieldConfig;

      const requiredRole = hasRoleDirective["role"];
      const originalResolve = fieldConfig.resolve;

      fieldConfig.resolve = async (source, args, context, info) => {
        const authHeader = context.req?.headers?.authorization;
        if (!authHeader) {
          throw new Error("Not authenticated");
        }

        const token = authHeader.replace("Bearer ", "");
        const payload: JwtPayload = verifyToken(token);

        const userLevel = ROLE_HIERARCHY[payload.role] ?? 0;
        const requiredLevel = ROLE_HIERARCHY[requiredRole] ?? 0;

        if (userLevel < requiredLevel) {
          throw new Error(`Requires role: ${requiredRole} or higher`);
        }

        context.user = payload;

        return originalResolve?.(source, args, context, info);
      };

      return fieldConfig;
    },
  });
}
