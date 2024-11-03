import React, { ChangeEventHandler, FC } from 'react';
import './SearchInput.css'

type Props = {
    filterText: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

export const SearchInput: FC<Props> = ({ filterText, onChange }) => {
    return (
        <div className='description-block__search-block'>
            <span className='description-block__search-icon'/>
            <input
                className="description-block__search"
                placeholder="Найти классы"
                type="text"
                value={filterText}
                onChange={onChange}
            />
        </div>
    );
};