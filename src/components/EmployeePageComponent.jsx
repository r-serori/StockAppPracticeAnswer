import React, { useState, useEffect } from 'react';
import TableComponent from './TableComponent';
import SearchBarComponent from './SearchBarComponent';
import ButtonComponent from './ButtonComponent';
import CreateEmployeePageComponent from './CreateEmployeePageComponent';

function EmployeePageComponent() {
    const [employeeData, setEmployeeData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);

    const columns = [
        { title: "ID", key: "id" },
        { title: "名前", key: "name" },
        { title: "役職", key: "position" },
        { title: "部門", key: "department" },
        { title: "メール", key: "email" },
        { title: "電話番号", key: "phoneNumber" },
        { title: "入社日", key: "hireDate" }
    ];

    // データの取得
    useEffect(() => {
        fetch('http://localhost:3006/employees')
            .then(response => response.json())
            .then(data => {
                setEmployeeData(data);
                setFilteredData(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // 検索機能
    const handleSearch = (query) => {
        setFilteredData(employeeData.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase())
        ));
    };

    // 新規登録時の保存処理
    const handleSave = (newEmployee) => {
        const maxId = employeeData.length > 0 ? Math.max(...employeeData.map(emp => parseInt(emp.id))) : 0;
        const newId = maxId + 1;

        const employeeWithId = { ...newEmployee, id: newId };

        fetch('http://localhost:3006/employees', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employeeWithId),
        })
            .then(response => response.json())
            .then(savedEmployee => {
                setEmployeeData([...employeeData, savedEmployee]);
                setFilteredData([...filteredData, savedEmployee]);
                setShowCreateForm(false);
            })
            .catch(error => console.error('Error saving employee:', error));
    };

    // 編集処理
    const handleEdit = (employee) => {
        setEditingEmployee(employee);
        setShowCreateForm(true);
    };

    // 編集データの更新処理
    const handleUpdate = (updatedEmployee) => {
        fetch(`http://localhost:3006/employees/${updatedEmployee.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedEmployee),
        })
            .then(response => response.json())
            .then(() => {
                setEmployeeData(employeeData.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp));
                setFilteredData(filteredData.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp));
                setShowCreateForm(false);
                setEditingEmployee(null);
            })
            .catch(error => console.error('Error updating employee:', error));
    };

    // 削除処理
    const handleDelete = (id) => {
        fetch(`http://localhost:3006/employees/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                setEmployeeData(employeeData.filter(emp => emp.id !== id));
                setFilteredData(filteredData.filter(emp => emp.id !== id));
            })
            .catch(error => console.error('Error deleting employee:', error));
    };

    return (
        <div className="employee-page">
            {showCreateForm ? (
                <div className="my-3">
                    <ButtonComponent label="戻る" variant="secondary" onClick={() => setShowCreateForm(false)} />
                    <CreateEmployeePageComponent
                        onSave={editingEmployee ? handleUpdate : handleSave}
                        initialData={editingEmployee}
                    />
                </div>
            ) : (
                    <div className="my-3">
                    <h2>社員管理</h2>
                    <div className="search-bar">
                        <SearchBarComponent onSearch={handleSearch} />
                        <ButtonComponent label="新規登録" variant="primary" onClick={() => {
                            setShowCreateForm(true);
                            setEditingEmployee(null);
                        }} />
                    </div>
                    <div className="table-container">
                        <TableComponent
                            theadData={columns}
                            tbodyData={filteredData}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default EmployeePageComponent;
