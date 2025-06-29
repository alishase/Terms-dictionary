import React, { useState } from "react";
import {
  BookOpen,
  Globe,
  Tag,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Database,
  Folder,
} from "lucide-react";

const TermCard = ({ term }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPartOfSpeechColor = (partOfSpeech) => {
    const colors = {
      1: "bg-blue-100 text-blue-800", // Существительное
      2: "bg-green-100 text-green-800", // Глагол
      3: "bg-yellow-100 text-yellow-800", // Прилагательное
      4: "bg-purple-100 text-purple-800", // Наречие
    };
    return colors[partOfSpeech] || "bg-gray-100 text-gray-800";
  };

  const getTableDisplayName = (tableName) => {
    return tableName.replace("Rhetorical Terms Part ", "Часть ");
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-600" />
          {term.english}
        </h3>
        <div className="flex flex-col gap-2">
          {term.category && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
              <Folder className="w-3 h-3 inline mr-1" />
              {term.category}
            </span>
          )}

          {term.tableName && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              <Database className="w-3 h-3 inline mr-1" />
              {getTableDisplayName(term.tableName)}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-gray-500">FR:</span>
          </div>
          <span className="text-lg font-semibold text-green-700">
            {term.french}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-red-600" />
            <span className="text-sm font-medium text-gray-500">BY:</span>
          </div>
          <span className="text-lg font-semibold text-red-700">
            {term.belarusian}
          </span>
        </div>
      </div>

      {/* Main definition (English) */}
      {term.definitionEnglish && (
        <div className="border-t border-gray-100 pt-4 mb-4">
          <p className="text-gray-600 leading-relaxed">
            {term.definitionEnglish}
          </p>
        </div>
      )}

      {/* Expandable section for additional content */}
      {(term.definitionFrench ||
        term.definitionBelarusian ||
        term.exampleEnglish ||
        term.exampleFrench ||
        term.exampleBelarusian ||
        term.comments) && (
        <div className="border-t border-gray-100 pt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Скрыть подробности
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Показать подробности
              </>
            )}
          </button>

          {isExpanded && (
            <div className="mt-4 space-y-4">
              {/* Additional definitions */}
              {term.definitionFrench && (
                <div>
                  <h4 className="text-sm font-semibold text-green-600 mb-1">
                    Определение (FR):
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {term.definitionFrench}
                  </p>
                </div>
              )}

              {term.definitionBelarusian && (
                <div>
                  <h4 className="text-sm font-semibold text-red-600 mb-1">
                    Определение (BY):
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {term.definitionBelarusian}
                  </p>
                </div>
              )}

              {/* Examples */}
              {(term.exampleEnglish ||
                term.exampleFrench ||
                term.exampleBelarusian) && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    Примеры:
                  </h4>
                  <div className="space-y-2">
                    {term.exampleEnglish && (
                      <div>
                        <span className="text-xs font-medium text-blue-600">
                          EN:
                        </span>
                        <p className="text-sm text-gray-600 italic ml-6">
                          "{term.exampleEnglish}"
                        </p>
                      </div>
                    )}
                    {term.exampleFrench && (
                      <div>
                        <span className="text-xs font-medium text-green-600">
                          FR:
                        </span>
                        <p className="text-sm text-gray-600 italic ml-6">
                          "{term.exampleFrench}"
                        </p>
                      </div>
                    )}
                    {term.exampleBelarusian && (
                      <div>
                        <span className="text-xs font-medium text-red-600">
                          BY:
                        </span>
                        <p className="text-sm text-gray-600 italic ml-6">
                          "{term.exampleBelarusian}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Comments */}
              {term.comments && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <MessageSquare className="w-4 h-4 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-yellow-800 mb-1">
                        Комментарии:
                      </h4>
                      <p className="text-sm text-yellow-700">{term.comments}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TermCard;
