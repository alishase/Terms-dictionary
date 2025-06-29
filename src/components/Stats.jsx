import React from 'react';
import { TrendingUp, Users, BookOpen } from 'lucide-react';

const Stats = ({ totalTerms, filteredCount }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium">Всего терминов</p>
            <p className="text-3xl font-bold">{totalTerms}</p>
          </div>
          <BookOpen className="w-8 h-8 text-blue-200" />
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm font-medium">Найдено</p>
            <p className="text-3xl font-bold">{filteredCount}</p>
          </div>
          <TrendingUp className="w-8 h-8 text-green-200" />
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm font-medium">Языков</p>
            <p className="text-3xl font-bold">3</p>
          </div>
          <Users className="w-8 h-8 text-purple-200" />
        </div>
      </div>
    </div>
  );
};

export default Stats;