import { useState, useMemo, useEffect } from "react";
import { fetchDictionaryData } from "../services/airtable";

export const useDictionary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dictionaryData, setDictionaryData] = useState([]);
  const [duplicatesRemoved, setDuplicatesRemoved] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDictionaryData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Loading dictionary data from multiple tables...");

        // Store original console.log to capture duplicate removal info
        const originalLog = console.log;
        let duplicateCount = 0;

        console.log = (...args) => {
          const message = args.join(" ");
          if (
            message.includes("Removed") &&
            message.includes("duplicate terms")
          ) {
            const match = message.match(/Removed (\d+) duplicate terms/);
            if (match) {
              duplicateCount = parseInt(match[1]);
            }
          }
          originalLog(...args);
        };

        const data = await fetchDictionaryData();

        // Restore original console.log
        console.log = originalLog;

        console.log("Data loaded:", data.length, "unique terms");
        setDictionaryData(data);
        setDuplicatesRemoved(duplicateCount);
      } catch (err) {
        setError(err.message);
        console.error("Failed to load dictionary data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDictionaryData();
  }, []);

  const filteredTerms = useMemo(() => {
    if (!dictionaryData.length) return [];

    let filtered = dictionaryData;

    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (term) =>
          term.english.toLowerCase().includes(searchLower) ||
          term.french.toLowerCase().includes(searchLower) ||
          term.belarusian.toLowerCase().includes(searchLower) ||
          term.category.toLowerCase().includes(searchLower) ||
          term.definitionEnglish.toLowerCase().includes(searchLower) ||
          term.definitionFrench.toLowerCase().includes(searchLower) ||
          term.definitionBelarusian.toLowerCase().includes(searchLower) ||
          term.exampleEnglish.toLowerCase().includes(searchLower) ||
          term.exampleFrench.toLowerCase().includes(searchLower) ||
          term.exampleBelarusian.toLowerCase().includes(searchLower)
      );
    }

    // Filter by selected letter
    if (selectedLetter) {
      filtered = filtered.filter(
        (term) => term.english.charAt(0).toUpperCase() === selectedLetter
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((term) => term.category === selectedCategory);
    }

    return filtered.sort((a, b) => a.english.localeCompare(b.english));
  }, [dictionaryData, searchTerm, selectedLetter, selectedCategory]);

  const alphabetLetters = useMemo(() => {
    if (!dictionaryData.length) return [];

    const letters = new Set();
    dictionaryData.forEach((term) => {
      if (term.english) {
        letters.add(term.english.charAt(0).toUpperCase());
      }
    });
    return Array.from(letters).sort();
  }, [dictionaryData]);

  const availableCategories = useMemo(() => {
    if (!dictionaryData.length) return [];

    const categories = new Set();
    dictionaryData.forEach((term) => {
      if (term.category && term.category.trim()) {
        categories.add(term.category.trim());
      }
    });
    return Array.from(categories).sort();
  }, [dictionaryData]);

  const tableStats = useMemo(() => {
    if (!dictionaryData.length) return {};

    const stats = {};
    dictionaryData.forEach((term) => {
      stats[term.tableName] = (stats[term.tableName] || 0) + 1;
    });
    return stats;
  }, [dictionaryData]);

  const categoryStats = useMemo(() => {
    if (!dictionaryData.length) return {};

    const stats = {};
    dictionaryData.forEach((term) => {
      if (term.category && term.category.trim()) {
        const category = term.category.trim();
        stats[category] = (stats[category] || 0) + 1;
      }
    });
    return stats;
  }, [dictionaryData]);

  return {
    searchTerm,
    setSearchTerm,
    selectedLetter,
    setSelectedLetter,
    selectedCategory,
    setSelectedCategory,
    filteredTerms,
    alphabetLetters,
    availableCategories,
    tableStats,
    categoryStats,
    duplicatesRemoved,
    totalTerms: dictionaryData.length,
    loading,
    error,
  };
};
