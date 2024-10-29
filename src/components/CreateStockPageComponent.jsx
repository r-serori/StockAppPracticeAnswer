import React, { useState, useEffect } from 'react';
import TextFieldComponent from './TextFieldComponent';
import ButtonComponent from './ButtonComponent';

function CreateStockPageComponent({ onSave, initialData }) {
    const [id, setId] = useState(null);
    const [itemName, setItemName] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState(null);
    const [price, setPrice] = useState(null);
    const [supplier, setSupplier] = useState('');
    const [remarks, setRemarks] = useState('');

    useEffect(() => {
        if (initialData) {
            setId(initialData.id);
            setItemName(initialData.itemName);
            setCategory(initialData.category);
            setQuantity(initialData.quantity);
            setPrice(initialData.price);
            setSupplier(initialData.supplier);
            setRemarks(initialData.remarks);
        }
    }, [initialData]);

    const handleSave = () => {
        const stockItem = {
            id: id,  // 編集時のみidを含める
            itemName : itemName,
            category: category,
            quantity: parseInt(quantity),
            price: parseInt(price),
            supplier : supplier,
            remarks : remarks
        };
        onSave(stockItem);
    };

    return (
        <div className="create-stock-page">
            <h3 className="my-3">{initialData ? '在庫編集' : '在庫新規登録'}</h3>
            <div className="form-group">
                <label>商品名</label>
                <TextFieldComponent type="text" value={itemName} onChange={setItemName} />
            </div>
            <div className="form-group">
                <label>カテゴリー</label>
                <TextFieldComponent type="text" value={category} onChange={setCategory} />
            </div>
            <div className="form-group">
                <label>数量</label>
                <TextFieldComponent type="number" value={quantity} onChange={setQuantity} />
            </div>
            <div className="form-group">
                <label>価格</label>
                <TextFieldComponent type="number" value={price} onChange={setPrice} />
            </div>
            <div className="form-group">
                <label>サプライヤー</label>
                <TextFieldComponent type="text" value={supplier} onChange={setSupplier} />
            </div>
            <div className="form-group">
                <label>備考</label>
                <TextFieldComponent type="text" value={remarks} onChange={setRemarks} />
            </div>
            <div className="text-end mt-3">
                <ButtonComponent label={initialData ? '更新' : '保存'} variant="primary" onClick={handleSave} />
            </div>
            </div>
    );
}

export default CreateStockPageComponent;
