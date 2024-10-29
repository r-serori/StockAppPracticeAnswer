// TextFieldComponent.jsx
import React from 'react';

function TextFieldComponent({ type = "text", value, onChange }) {
    return (
        <input
            type={type}
            className="form-control" // Bootstrapのスタイルクラスを追加
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}

export default TextFieldComponent;
