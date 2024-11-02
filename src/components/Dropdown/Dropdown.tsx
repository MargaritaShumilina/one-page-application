import React, { FC, useState } from 'react';
import './Dropdown.css';
import {DropdownOption} from "../../utils/types";

interface Props {
    label: string;
    options: DropdownOption[];
    selectedValue: boolean | null;
    onChange: (value: boolean | null) => void;
    isCollapsible: boolean;
}

const Dropdown: FC<Props> = ({ label, options, selectedValue, onChange, isCollapsible }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        if (isCollapsible) {
            setIsOpen(!isOpen);
        }
    };

    const handleOptionClick = (value: boolean | null) => {
        onChange(value);
        setIsOpen(false);
    };

    return (
        <div className="dropdown">
            <div className="dropdown-label" onClick={handleToggle}>
                {label} <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
            </div>
            {isOpen && (
                <div className="dropdown-menu">
                    {options.map((option) => (
                        <label key={option.value !== null ? option.value.toString() : 'null'} className="dropdown-option">
                            <input
                                type="checkbox"
                                checked={selectedValue === option.value}
                                onChange={() => handleOptionClick(option.value)}
                            />
                            {option.label}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
