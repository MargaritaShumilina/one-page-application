import React, { ChangeEventHandler, FC, InputHTMLAttributes } from 'react';

type Props = {
    filterText: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

export const SearchInput: FC<Props> = ({ filterText, onChange }) => {
    return (
        <input
            className="filter-text"
            placeholder="Найти классы"
            type="text"
            value={filterText}
            onChange={onChange}
        />
    );
};