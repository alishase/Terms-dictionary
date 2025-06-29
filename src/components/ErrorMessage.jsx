import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ error, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 mx-auto text-red-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Ошибка загрузки
          </h3>
          <p className="text-gray-500 mb-4">
            {error}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Попробовать снова
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;