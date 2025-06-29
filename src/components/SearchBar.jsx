import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative max-w-2xl mx-auto mb-8">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Поиск терминов на английском, французском или белорусском..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 text-lg placeholder-gray-400"
        />
      </div>
    </div>
  );
};

export default SearchBar;