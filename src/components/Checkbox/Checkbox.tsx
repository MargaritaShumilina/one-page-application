import {FC} from "react";

type Props = {
    label: string;
    checked: boolean;
    onChange: () => void;
};

export const Checkbox: FC<Props> = ({ label, checked, onChange }) => {
    return (
        <label className="checkbox-container">
            <input type="checkbox" checked={checked} onChange={onChange} />
            <span className="checkbox-label">{label}</span>
        </label>
    );
};