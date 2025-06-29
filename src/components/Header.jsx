import React from 'react';
import { BookOpen, Globe2 } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-12 shadow-xl">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-white/20 p-3 rounded-full">
              <BookOpen className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Электронный словарь
            </h1>
            <div className="bg-white/20 p-3 rounded-full">
              <Globe2 className="w-8 h-8" />
            </div>
          </div>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Трёхъязычный словарь терминов: английский • французский • белорусский
          </p>
          <div className="mt-6 flex items-center justify-center gap-8 text-sm text-blue-200">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span>3000+ терминов</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span>Быстрый поиск</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span>Определения</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;