import React, { useState, useEffect } from 'react';
import TableComponent from './TableComponent';
import SearchBarComponent from './SearchBarComponent';
import ButtonComponent from './ButtonComponent';
import CreateStockPageComponent from './CreateStockPageComponent';

function StockPageComponent() {
    const [stockData, setStockData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingItem, setEditingItem] = useState(null); // 編集対象のアイテム

    const columns = [
        { title: "ID", key: "id" },
        { title: "商品名", key: "itemName" },
        { title: "カテゴリー", key: "category" },
        { title: "数量", key: "quantity" },
        { title: "価格", key: "price" },
        { title: "サプライヤー", key: "supplier" },
        { title: "備考", key: "remarks" }
    ];

    // データの取得
    useEffect(() => {
        fetch('http://localhost:3006/stocks')
            .then(response => response.json())
            .then(data => {
                setStockData(data);
                setFilteredData(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // 検索機能
    const handleSearch = (query) => {
        setFilteredData(stockData.filter(item =>
            item.itemName.toLowerCase().includes(query.toLowerCase())
        ));
    };

    // 新規登録時の保存処理
    const handleSave = (newStockItem) => {
        const maxId = stockData.length > 0 ? Math.max(...stockData.map(item => parseInt(item.id))) : 0;
        const newId = maxId + 1;

        const itemWithId = { ...newStockItem, id: newId };

        fetch('http://localhost:3006/stocks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(itemWithId),
        })
            .then(response => response.json())
            .then(savedItem => {
                setStockData([...stockData, savedItem]);
                setFilteredData([...filteredData, savedItem]);
                setShowCreateForm(false);
            })
            .catch(error => console.error('Error saving data:', error));
    };

    // 編集処理
    const handleEdit = (row) => {
        setEditingItem(row);
        setShowCreateForm(true);
    };

    // 編集データの更新処理
    const handleUpdate = (updatedItem) => {
        fetch(`http://localhost:3006/stocks/${updatedItem.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedItem),
        })
            .then(response => response.json())
            .then(() => {
                setStockData(stockData.map(item => item.id === updatedItem.id ? updatedItem : item));
                setFilteredData(filteredData.map(item => item.id === updatedItem.id ? updatedItem : item));
                setShowCreateForm(false);
                setEditingItem(null);
            })
            .catch(error => console.error('Error updating data:', error));
    };

    // 削除処理
    const handleDelete = (id) => {
        fetch(`http://localhost:3006/stocks/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                setStockData(stockData.filter(stock => stock.id !== id));
                setFilteredData(filteredData.filter(stock => stock.id !== id));
            })
            .catch(error => console.error('Error deleting data:', error));
    };

    return (
        <div className="stock-page">
            {showCreateForm ? (
                <div className="my-3">
                    <ButtonComponent label="戻る" variant="secondary" onClick={() => setShowCreateForm(false)} />
                    <CreateStockPageComponent
                        onSave={editingItem ? handleUpdate : handleSave}
                        initialData={editingItem}
                    />
                </div>
            ) : (
                    <div className="my-3">
                    <h2>在庫管理</h2>
                    <div className="search-bar">
                        <SearchBarComponent onSearch={handleSearch} />
                        <ButtonComponent label="新規登録" variant="primary" onClick={() => {
                            setShowCreateForm(true);
                            setEditingItem(null);
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

export default StockPageComponent;
