export type User = {
    name: string;
    surname: string;
    token: string;
};

export type UserInfo = {
    name: string;
    surname: string;
};

export type TreeNode = {
    id: string;
    name: string;
    description: string;
    children?: TreeNode[];
};

export type CheckboxTreeNode = {
    value: string;
    label: string;
    description: string;
    children?: CheckboxTreeNode[];
};