import  type {TransformedTreeNode, TreeNode} from "../types";

export const transformTree = (nodes: TreeNode[]) => {
    return nodes.map((node) => {
        const transformedNode: TransformedTreeNode = {
            key: node.id,
            title: node.name,
            description: node.description,
            isLeaf: !node.children || node.children.length === 0,
        };

        if (node.children && node.children.length > 0) {
            transformedNode.children = transformTree(node.children);
        }

        return transformedNode;
    });
};