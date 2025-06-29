import React from 'react';
import { Settings, Key, Database, Table } from 'lucide-react';

const ConfigurationGuide = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <Settings className="w-16 h-16 mx-auto text-blue-600 mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Настройка подключения к Airtable
          </h2>
          <p className="text-gray-600">
            Для работы словаря необходимо настроить подключение к вашей базе данных Airtable
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-6 bg-blue-50 rounded-xl">
            <Key className="w-8 h-8 mx-auto text-blue-600 mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">API Key</h3>
            <p className="text-sm text-gray-600">
              Получите API ключ в настройках Airtable
            </p>
          </div>
          
          <div className="text-center p-6 bg-green-50 rounded-xl">
            <Database className="w-8 h-8 mx-auto text-green-600 mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Base ID</h3>
            <p className="text-sm text-gray-600">
              ID вашей базы данных из URL
            </p>
          </div>
          
          <div className="text-center p-6 bg-purple-50 rounded-xl">
            <Table className="w-8 h-8 mx-auto text-purple-600 mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Table Name</h3>
            <p className="text-sm text-gray-600">
              Название таблицы с терминами
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">Инструкция по настройке:</h3>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>Создайте файл <code className="bg-gray-200 px-2 py-1 rounded">.env</code> в корне проекта</li>
            <li>Скопируйте содержимое из <code className="bg-gray-200 px-2 py-1 rounded">.env.example</code></li>
            <li>Замените значения на ваши данные из Airtable:</li>
          </ol>
          
          <div className="mt-4 bg-gray-800 text-green-400 p-4 rounded-lg font-mono text-sm">
            <div>VITE_AIRTABLE_API_KEY=patXXXXXXXXXXXXXX</div>
            <div>VITE_AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX</div>
            <div>VITE_AIRTABLE_TABLE_NAME=Dictionary</div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="font-semibold text-blue-800 mb-3">Требуемая структура таблицы Airtable:</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-blue-700 mb-2">Основные поля:</h5>
              <ul className="space-y-1 text-blue-600">
                <li>• Term English</li>
                <li>• Term French</li>
                <li>• Term Belarusian</li>
                <li>• Part of Speech in integer format</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-blue-700 mb-2">Дополнительные поля:</h5>
              <ul className="space-y-1 text-blue-600">
                <li>• Definition English</li>
                <li>• Definition French</li>
                <li>• Defintition Belarusian</li>
                <li>• Example English</li>
                <li>• Example French</li>
                <li>• Example Belarusian</li>
                <li>• Comments</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-100 rounded">
            <p className="text-xs text-blue-700">
              <strong>Part of Speech:</strong> 1 = Существительное, 2 = Глагол, 3 = Прилагательное, 4 = Наречие
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationGuide;