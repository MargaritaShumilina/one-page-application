import { FC } from "react";
import './Table.css';

type Props = {
    tBodyData: Record<string, string>[];
    tHeadData: string[];
}

export const Table: FC<Props> = ({ tBodyData, tHeadData }) => {
    return (
        <div className="properties-table-container">
            <table className="properties-table">
                <thead className='properties-table__thead'>
                <tr className='properties-table__heading'>
                    {tHeadData.map((value, index) => (
                        <th key={index} className='properties-table__th'>{value}</th>
                    ))}
                </tr>
                </thead>
                <tbody className='properties-table__tbody'>
                {tBodyData.map((property, index) => (
                    <tr key={index} className='properties-table__row'>
                        <td className='properties-table__cell properties-table__first'>{property.name}</td>
                        <td className='properties-table__cell properties-table__another'>
                            {property.defaultValue === 'checkbox' ? (
                                <input type="checkbox" className='properties-table__checkbox'/>
                            ) : (
                                property.defaultValue
                            )}
                        </td>
                        <td className='properties-table__cell properties-table__another'>{property.unit}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
