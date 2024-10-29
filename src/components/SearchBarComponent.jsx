// SearchBarComponent.jsx
import React, { useState } from 'react';
import ButtonComponent from './ButtonComponent';

function SearchBarComponent({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query); // 親コンポーネントに検索クエリを渡す
    };

    return (
        <div className="input-group my-3 w-25">
            <input
                type="text"
                className="form-control"
                placeholder="検索ワードを入力"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <ButtonComponent
                type="button"
                label="検索"
                onClick={handleSearch}
                variant="secondary"
            />
        </div>
    );
}

export default SearchBarComponent;
