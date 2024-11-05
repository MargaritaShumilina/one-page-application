import {type TransformedTreeNode} from "../types";

export const getAllNodeKeys = (nodes: TransformedTreeNode[]): string[] => {
    let keys: string[] = [];
    nodes.forEach((node) => {
        keys.push(node.key);
        if (node.children) {
            keys = keys.concat(getAllNodeKeys(node.children));
        }
    });
    return keys;
};