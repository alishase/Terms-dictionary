import React from "react";
import { Folder } from "lucide-react";

const CategoryFilter = ({
  categories,
  selectedCategory,
  onCategorySelect,
  categoryStats,
}) => {
  if (!categories.length) return null;

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center flex items-center justify-center gap-2">
        <Folder className="w-5 h-5" />
        Фильтр по категории
      </h3>
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={() => onCategorySelect(null)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            selectedCategory === null
              ? "bg-emerald-600 text-white shadow-lg"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Все категории
          <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">
            {Object.values(categoryStats).reduce(
              (sum, count) => sum + count,
              0
            )}
          </span>
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategorySelect(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              selectedCategory === category
                ? "bg-emerald-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {category}
            <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">
              {categoryStats[category] || 0}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
