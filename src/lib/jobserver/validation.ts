import { GraphQLError } from "graphql";
import {
  DocumentNode,
  FieldNode,
  FragmentDefinitionNode,
  FragmentSpreadNode,
  InlineFragmentNode,
  OperationDefinitionNode,
  SelectionNode,
} from "graphql";

const MAX_DEPTH = 10;

function getDepth(
  selections: ReadonlyArray<SelectionNode>,
  fragments: Map<string, FragmentDefinitionNode>,
  depth: number,
): number {
  let maxDepth = depth;

  for (const selection of selections) {
    if (selection.kind === "Field") {
      const field = selection as FieldNode;
      if (field.selectionSet) {
        const childDepth = getDepth(field.selectionSet.selections, fragments, depth + 1);
        maxDepth = Math.max(maxDepth, childDepth);
      }
    } else if (selection.kind === "FragmentSpread") {
      const spread = selection as FragmentSpreadNode;
      const fragment = fragments.get(spread.name.value);
      if (fragment?.selectionSet) {
        const childDepth = getDepth(fragment.selectionSet.selections, fragments, depth + 1);
        maxDepth = Math.max(maxDepth, childDepth);
      }
    } else if (selection.kind === "InlineFragment") {
      const inline = selection as InlineFragmentNode;
      if (inline.selectionSet) {
        const childDepth = getDepth(inline.selectionSet.selections, fragments, depth + 1);
        maxDepth = Math.max(maxDepth, childDepth);
      }
    }
  }

  return maxDepth;
}

export function depthLimit(doc: DocumentNode): void {
  const fragments = new Map<string, FragmentDefinitionNode>();
  const operations: OperationDefinitionNode[] = [];

  for (const def of doc.definitions) {
    if (def.kind === "FragmentDefinition") {
      fragments.set(def.name.value, def as FragmentDefinitionNode);
    } else if (def.kind === "OperationDefinition") {
      operations.push(def as OperationDefinitionNode);
    }
  }

  for (const op of operations) {
    if (op.selectionSet) {
      const depth = getDepth(op.selectionSet.selections, fragments, 0);
      if (depth > MAX_DEPTH) {
        throw new GraphQLError(`Query too complex. Maximum depth is ${MAX_DEPTH}.`, {
          extensions: { code: "QUERY_TOO_COMPLEX" },
        });
      }
    }
  }
}
