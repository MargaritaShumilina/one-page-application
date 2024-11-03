import {FC} from "react";

type Props = {
    tBodyData: Record<string, string>[];
    tHeadData: string[]
}

export const Table:FC<Props> = ({tBodyData, tHeadData}) => {
    return (
        <table className="properties-table">
            <thead>
                <tr>
                    {tHeadData.map((value, index) => (
                            <th key={index}>{value}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {tBodyData.map((property, index) => (
                    <tr key={index}>
                        <td>{property.name}</td>
                        <td>
                            {property.defaultValue === 'checkbox' ? (
                                <input type="checkbox" />
                            ) : (
                                property.defaultValue
                            )}
                        </td>
                        <td>{property.unit}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
