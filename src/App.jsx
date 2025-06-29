import React from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import AlphabetFilter from "./components/AlphabetFilter";
// import PartOfSpeechFilter from "./components/PartOfSpeechFilter";
// import TableFilter from "./components/TableFilter";
import CategoryFilter from "./components/CategoryFilter";
import TermCard from "./components/TermCard";
import Stats from "./components/Stats";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import ConfigurationGuide from "./components/ConfigurationGuide";
import { useDictionary } from "./hooks/useDictionary";

function App() {
  const {
    searchTerm,
    setSearchTerm,
    selectedLetter,
    setSelectedLetter,
    selectedPartOfSpeech,
    setSelectedPartOfSpeech,
    selectedTable,
    setSelectedTable,
    selectedCategory,
    setSelectedCategory,
    filteredTerms,
    alphabetLetters,
    partsOfSpeech,
    availableTables,
    availableCategories,
    tableStats,
    categoryStats,
    duplicatesRemoved,
    totalTerms,
    loading,
    error,
  } = useDictionary();

  // Show configuration guide if environment variables are missing
  const isConfigured =
    import.meta.env.VITE_AIRTABLE_API_KEY &&
    import.meta.env.VITE_AIRTABLE_BASE_ID;

  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <ConfigurationGuide />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage
            error={error}
            onRetry={() => window.location.reload()}
          />
        ) : (
          <>
            <Stats
              totalTerms={totalTerms}
              filteredCount={filteredTerms.length}
              tableStats={tableStats}
              duplicatesRemoved={duplicatesRemoved}
            />

            {duplicatesRemoved > 0 && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 text-yellow-800">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                  <span className="font-medium">
                    Обнаружены и удалены дубликаты: {duplicatesRemoved} терминов
                  </span>
                </div>
                <p className="text-sm text-yellow-700 mt-1">
                  Термины с одинаковыми английскими названиями были объединены.
                  Сохранена первая найденная версия каждого термина.
                </p>
              </div>
            )}

            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

            <CategoryFilter
              categories={availableCategories}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
              categoryStats={categoryStats}
            />

            <AlphabetFilter
              letters={alphabetLetters}
              selectedLetter={selectedLetter}
              onLetterSelect={setSelectedLetter}
            />

            {filteredTerms.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
                  <div className="text-gray-400 mb-4">
                    <svg
                      className="w-16 h-16 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Термины не найдены
                  </h3>
                  <p className="text-gray-500">
                    Попробуйте изменить критерии поиска
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTerms.map((term) => (
                  <TermCard key={term.id} term={term} />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300">
            © 2025 Электронный словарь. Создано для изучения языков и
            терминологии.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
