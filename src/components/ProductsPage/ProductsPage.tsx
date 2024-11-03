import React, {ChangeEvent, FC, Key, useState} from 'react';
import { Preloader } from '../Preloader/Preloader';
import {TransformedTreeNode, TreeNode} from '../../utils/types';
import './ProductsPage.css';
import Tree from 'rc-tree';
import Button from '../Button/Button';
import { SearchInput } from '../SearchInput/SearchInput';
import Description from '../Description/Description';
import 'rc-tree/assets/index.css';
import Dropdown from "../Dropdown/Dropdown";
import {dropdownOptions} from "../../utils/constants";

type Props = {
    isLoading: boolean;
    objectTree?: TreeNode[];
};

export const ProductsPage: FC<Props> = ({ isLoading, objectTree }) => {
    const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
    const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
    const [filterText, setFilterText] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [assignedFilter, setAssignedFilter] = useState<boolean | null>(null);
    const [libraryFilter, setLibraryFilter] = useState<boolean | null>(null);

    const transformTree = (nodes: TreeNode[]): any[] => {
        return nodes.map((node) => {
            const transformedNode: any = {
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

    const transformedTree: TransformedTreeNode[] = objectTree ? transformTree(objectTree) : [];

    const handleExpandAll = () => {
        const allKeys = getAllNodeKeys(transformedTree);
        setExpandedKeys(allKeys);
    };

    const handleCollapseAll = () => {
        setExpandedKeys([]);
    };

    const getAllNodeKeys = (nodes: any[]): string[] => {
        let keys: string[] = [];
        nodes.forEach((node) => {
            keys.push(node.key);
            if (node.children) {
                keys = keys.concat(getAllNodeKeys(node.children));
            }
        });
        return keys;
    };

    const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
        setFilterText(event.target.value);
    };

    const filterTree = (nodes: any[], searchTerm: string): any[] => {
        return nodes.reduce<any[]>((filtered, node) => {
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

    const filteredTree: TransformedTreeNode[] = filterText ? filterTree(transformedTree, filterText) : transformedTree;

    const handleSelect = (selectedKeys: Key[], info: any) => {
        setSelectedKeys(selectedKeys as string[]);
        if (info.node) {
            console.log(info.node);
            setDescription(info.node.description || 'Нет описания');
        } else {
            setDescription('Нет описания');
        }
    };

    const handleNodeDoubleClick = (key: string) => {
        if (!expandedKeys.includes(key)) {
            setExpandedKeys([...expandedKeys, key]);
        } else {
            setExpandedKeys(expandedKeys.filter((expandedKey) => expandedKey !== key));
        }
    };

    return (
        <>
            {isLoading ? (
                <Preloader />
            ) : (
                <div className='tree-page'>
                    <div className='tree-block'>
                        <h1 className='heading tree-block__header'>Классы</h1>
                        <div className='tree-block__button-block'>
                            <Button onClick={handleCollapseAll} style={'btn tree-block__close-button'} text={'Свернуть все'} />
                            <Button onClick={handleExpandAll} style={'btn tree-block__open-button'} text={'Развернуть все'} />
                        </div>
                        <Tree
                            className='tree-block__tree-items'
                            treeData={filteredTree}
                            expandedKeys={expandedKeys}
                            onExpand={(keys) => setExpandedKeys(keys as string[])}
                            checkedKeys={checkedKeys}
                            onCheck={(keys) => setCheckedKeys(keys as string[])}
                            selectable
                            selectedKeys={selectedKeys}
                            onSelect={(selectedKeys, info) => handleSelect(selectedKeys, info)}
                            showLine
                            checkable
                            onDoubleClick={(event, node) => handleNodeDoubleClick(node.key)}
                        />
                    </div>
                    <div className="description-block">
                        <div className="description-block__filters">
                            <Dropdown
                                label={`Присвоенные ${assignedFilter !== null ? '+1' : ''}`}
                                options={dropdownOptions}
                                selectedValue={assignedFilter}
                                onChange={(value) => setAssignedFilter(value as boolean | null)}
                                isCollapsible
                            />
                            <Dropdown
                                label={`В Библиотеке ${libraryFilter !== null ? '+1' : ''}`}
                                options={dropdownOptions}
                                selectedValue={libraryFilter}
                                onChange={(value) => setLibraryFilter(value as boolean | null)}
                                isCollapsible
                            />
                            <SearchInput filterText={filterText} onChange={handleSearch} />
                        </div>
                        <Description style={'heading'} text={description} />
                    </div>
                </div>
            )}
        </>
    );
};
