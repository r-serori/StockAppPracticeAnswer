import React, { useState, useEffect } from 'react';
import TextFieldComponent from './TextFieldComponent';
import ButtonComponent from './ButtonComponent';

function CreateEmployeePageComponent({ onSave, initialData }) {
    const [id, setId] = useState(null);
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [department, setDepartment] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [hireDate, setHireDate] = useState('');

    // 初期データの設定（編集時）
    useEffect(() => {
        if (initialData) {
            setId(initialData.id);
            setName(initialData.name);
            setPosition(initialData.position);
            setDepartment(initialData.department);
            setEmail(initialData.email);
            setPhoneNumber(initialData.phoneNumber);
            setHireDate(initialData.hireDate);
        }
    }, [initialData]);

    // 保存処理
    const handleSave = () => {
        const employeeItem = {
            id: id, // 編集時のみidを含める
            name: name,
            position: position,
            department: department,
            email: email,
            phoneNumber: phoneNumber,
            hireDate: hireDate
        };
        onSave(employeeItem);
    };

    return (
        <div className="create-employee-page">
            <h3 className="my-3">{initialData ? '社員情報編集' : '社員新規登録'}</h3>
            <div className="form-group">
                <label>名前</label>
                <TextFieldComponent type="text" value={name} onChange={setName} />
            </div>
            <div className="form-group">
                <label>役職</label>
                <TextFieldComponent type="text" value={position} onChange={setPosition} />
            </div>
            <div className="form-group">
                <label>部門</label>
                <TextFieldComponent type="text" value={department} onChange={setDepartment} />
            </div>
            <div className="form-group">
                <label>メール</label>
                <TextFieldComponent type="email" value={email} onChange={setEmail} />
            </div>
            <div className="form-group">
                <label>電話番号</label>
                <TextFieldComponent type="tel" value={phoneNumber} onChange={setPhoneNumber} />
            </div>
            <div className="form-group">
                <label>入社日</label>
                <TextFieldComponent type="date" value={hireDate} onChange={setHireDate} />
            </div>
            <div className="text-end mt-3">
                <ButtonComponent label={initialData ? '更新' : '保存'} variant="primary" onClick={handleSave} />
            </div>
            </div>
    );
}

export default CreateEmployeePageComponent;
