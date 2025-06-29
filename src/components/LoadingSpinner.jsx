import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
        <div className="text-center">
          <Loader2 className="w-12 h-12 mx-auto text-blue-600 animate-spin mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Загрузка словаря...
          </h3>
          <p className="text-gray-500">
            Получаем данные из Airtable
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;