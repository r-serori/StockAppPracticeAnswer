import React from 'react';
import ButtonComponent from './ButtonComponent';

function TableComponent({ theadData, tbodyData, onEdit, onDelete }) {
    return (
        <table className="table table-striped table-bordered text-center mt-3"> {/* テーブル全体を中央揃え */}
            <thead className="table-light">
                <tr>
                    {theadData.map((column, index) => (
                        <th key={index} className="text-center">{column.title}</th>
                    ))}
                    <th className="text-center"></th>
                    <th className="text-center"></th>
                </tr>
            </thead>
            <tbody>
                {tbodyData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {theadData.map((column, cellIndex) => (
                            <td key={cellIndex} className="text-center">{row[column.key]}</td>
                        ))}
                        <td className="text-center">
                            <ButtonComponent
                                type="button"
                                label="編集"
                                onClick={() => onEdit(row)}
                                variant="primary"
                            />
                        </td>
                        <td className="text-center">
                            <ButtonComponent
                                type="button"
                                label="削除"
                                onClick={() => onDelete(row.id)}
                                variant="danger"
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TableComponent;
