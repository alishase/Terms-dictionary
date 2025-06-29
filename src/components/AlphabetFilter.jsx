import React from 'react';

const AlphabetFilter = ({ letters, selectedLetter, onLetterSelect }) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
        Поиск по алфавиту
      </h3>
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={() => onLetterSelect(null)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            selectedLetter === null
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Все
        </button>
        {letters.map((letter) => (
          <button
            key={letter}
            onClick={() => onLetterSelect(letter)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              selectedLetter === letter
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AlphabetFilter;