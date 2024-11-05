export type User = {
    name: string;
    surname: string;
    token: string;
};

export type UserInfo = {
    name: string;
    surname: string;
};

export interface TreeNode {
    id: string;
    name: string;
    description: string;
    children?: TreeNode[];
}

export type DropdownOption = {
    label: string;
    value: boolean | null;
}

export interface TransformedTreeNode {
    key: string;
    title: string;
    description?: string;
    isLeaf: boolean;
    children?: TransformedTreeNode[];
}