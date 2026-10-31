import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch, placeholder = 'Search medicines, generics, or symptoms...' }) => {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(keyword.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ position: 'relative', width: '100%', maxWidth: '600px' }}>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '12px 16px 12px 42px',
          borderRadius: '10px',
          border: '1px solid #cbd5e1',
          fontSize: '0.95rem',
          outline: 'none',
          backgroundColor: '#ffffff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}
      />
      <Search
        size={18}
        color="#94a3b8"
        style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
      />
    </form>
  );
};

export default SearchBar;
