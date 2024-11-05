import {type TransformedTreeNode} from "../types";

export const filterTree = (nodes: TransformedTreeNode[], searchTerm: string) => {
    return nodes.reduce<TransformedTreeNode[]>((filtered, node) => {
        const children = node.children ? filterTree(node.children, searchTerm) : [];
        if (
            node.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            children.length > 0
        ) {
            filtered.push({ ...node, children });
        }
        return filtered;
    }, []);
};