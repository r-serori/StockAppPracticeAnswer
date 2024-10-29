// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import StockPageComponent from './components/StockPageComponent';
import EmployeePageComponent from './components/EmployeePageComponent';

function App() {
    return (
        <Router>
            {/* 共通のヘッダーを追加 */}
            <HeaderComponent />
            <Routes>
                <Route path="/employee" element={<EmployeePageComponent />} />
                <Route path="/stock" element={<StockPageComponent />} />
                <Route path="/" element={<StockPageComponent />} />
            </Routes>
        </Router>
    );
}

export default App;
