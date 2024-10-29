// ButtonComponent.jsx
import React from 'react';

function ButtonComponent({ type = "button", label, onClick, variant = "primary" }) {
    return (
        <button
            type={type}
            className={`btn btn-${variant}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
}

export default ButtonComponent;


//<ButtonComponent type="button" label="登録" onClick={handleRegister} variant="primary" />
//<ButtonComponent type="button" label="削除" onClick={handleDelete} variant="danger" />
//<ButtonComponent type="button" label="戻る" onClick={handleBack} variant="secondary" />
