import React, {ChangeEvent, ChangeEventHandler, FC, useState} from 'react';
import {Preloader} from "../Preloader/Preloader";
import {CheckboxTreeNode, TreeNode} from "../../utils/types";
import './ProductsPage.css'
import CheckboxTree from 'react-checkbox-tree';
import Tree from "rc-tree";
import Button from "../Button/Button";
import {SearchInput} from "../SearchInput/SearchInput";
import Description from "../Description/Description";

type Props = {
    isLoading: boolean;
    objectTree?: TreeNode[]
};

export const ProductsPage: FC<Props> = ({ isLoading, objectTree }) => {
    const [checked, setChecked] = useState<string[]>([]);
    const [expanded, setExpanded] = useState<string[]>([]);
    const [filterText, setFilterText] = useState<string>('');

    const transformTree = (nodes: TreeNode[]): CheckboxTreeNode[] => {
        return nodes.map((node) => {
            const transformedNode: CheckboxTreeNode = {
                value: node.id,
                label: node.name,
                description: node.description
            };

            if (node.children && node.children.length > 0) {
                transformedNode.children = transformTree(node.children);
            }

            return transformedNode;
        });
    };

    const transformedTree = objectTree ? transformTree(objectTree) : [];
    console.log(transformedTree);

    const getAllNodeValues = (nodes: CheckboxTreeNode[]): string[] => {
        let allValues: string[] = [];
        nodes.forEach((node) => {
            allValues.push(node.value);
            if (node.children) {
                allValues = allValues.concat(getAllNodeValues(node.children));
            }
        });
        return allValues
    };

    const handleOpen = () => {
        const allNodeValues = getAllNodeValues(transformedTree);
        setExpanded(allNodeValues);
    };
    const handleClose = () => {
        setExpanded([])
    };

    const filterNodes = (filterText: string, nodes: CheckboxTreeNode[]): CheckboxTreeNode[] => {
        return nodes.reduce<CheckboxTreeNode[]>((filtered, node) => {
            const children = node.children ? filterNodes(filterText, node.children) : [];
            if (
                node.label.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase()) > -1 ||
                children.length > 0
            ) {
                filtered.push({ ...node, children });
            }

            return filtered;
        }, []);
    };

    const filteredTree = filterText ? filterNodes(filterText, transformedTree) : transformedTree;

    const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
        setFilterText(event.target.value);
    }

    //В ТЗ указано, что должны возвращаться имя и фамилия пользователя, но вывода нигде по дизайну нет
    //Я записала сюда, как в наиболее логичное место вывода
    let savedUserString = localStorage.getItem('user');

    return (
        <>
            {transformedTree.length < 0 ? (
                <Preloader/>
            ) : (
                <>
                   <Button onClick={handleClose} style={'btn close-button'} text={'Свернуть все'}/>
                   <Button onClick={handleOpen} style={'btn open-button'} text={'Развернуть все'}/>
                   <SearchInput filterText={filterText} onChange={handleSearch}/>
                   <CheckboxTree
                        nodes={filteredTree}
                        checked={checked}
                        expanded={expanded}
                        onCheck={(checkedKeys) => setChecked(checkedKeys)}
                        onExpand={(expandedKeys) => setExpanded(expandedKeys)}
                        onClick={(e)=> {
                            console.log(e)}}
                        icons={{
                            check: <span className="rct-icon rct-icon-check" />,
                            uncheck: <span className="rct-icon rct-icon-uncheck" />,
                            // halfCheck: <span className="rct-icon rct-icon-half-check" />,
                            expandClose: <span className="expandClose" />,
                            expandOpen: <span className="expandOpen" />,
                            // parentClose: <span className="rct-icon rct-icon-parent-close" />,
                            // parentOpen: <span className="rct-icon rct-icon-parent-open" />,
                            leaf: <span className="rct-icon rct-icon-leaf" />,
                        }}
                   />
                    <Description text={''}/>

                </>
            )
            }
        </>
    );
};