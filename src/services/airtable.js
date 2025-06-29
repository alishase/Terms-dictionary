import Airtable from "airtable";

const AIRTABLE_API_KEY =
  "patZaTMfsBPraaDO2.6906267683d0b539d5da68d328e54915fea6a682792443d2de9934523ecc1406";
const AIRTABLE_BASE_ID = "appjxQWvXJ6jgjClp";
const AIRTABLE_TABLE_NAMES =
  "Rhetorical Terms Part 1,Rhetorical Terms Part 2,Rhetorical Terms Part 3";

// Initialize base with your specific base ID
const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

// Parse table names from environment variable
const getTableNames = () => {
  if (!AIRTABLE_TABLE_NAMES) {
    return [
      "Rhetorical Terms Part 1",
      "Rhetorical Terms Part 2",
      "Rhetorical Terms Part 3",
    ];
  }
  return AIRTABLE_TABLE_NAMES.split(",").map((name) => name.trim());
};

// Fetch data from a single table
const fetchTableData = async (tableName) => {
  // console.log(`Fetching data from table: ${tableName}`);

  try {
    const records = await base(tableName)
      .select({
        sort: [{ field: "Term (EN)", direction: "asc" }],
      })
      .all();

    // console.log(`Fetched ${records.length} records from ${tableName}`);
    return records;
  } catch (error) {
    console.error(`Error fetching from table ${tableName}:`, error);
    throw new Error(`Ошибка загрузки таблицы "${tableName}": ${error.message}`);
  }
};

// Transform a single record to our format
const transformRecord = (record, tableName) => {
  const fields = record.fields || {};
  // console.log("Record:", record);
  return {
    id: `${tableName}-${record.id}`, // Unique ID across tables
    originalId: record.id,
    english: fields["Term (EN)"] || "",
    french: fields["Term (FR)"] || "",
    belarusian: fields["Term (BE)"] || "",
    category: fields["Category"] || "",
    definitionEnglish: fields["Definition (EN)"] || "",
    definitionFrench: fields["Definition (FR)"] || "",
    definitionBelarusian: fields["Definition (BE)"] || "", // Note: keeping the typo as in your schema
    exampleEnglish: fields["Example (EN)"] || "",
    exampleFrench: fields["Example (FR)"] || "",
    exampleBelarusian: fields["Example (BE)"] || "",
    comments: fields["Comments"] || "",
  };
};

// Main function to fetch data from all tables
const removeDuplicates = (terms) => {
  const seen = new Set();
  const uniqueTerms = [];

  terms.forEach((term) => {
    // const englishLower = term.english.toLowerCase().trim();
    uniqueTerms.push(term);
  });

  return uniqueTerms;
};

// Main function to fetch data from all tables
export const fetchDictionaryData = async () => {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    throw new Error(
      "Airtable configuration is missing. Please check your environment variables."
    );
  }

  try {
    // console.log("Starting to fetch data from multiple Airtable tables...");

    const tableNames = getTableNames();
    // console.log("Tables to fetch:", tableNames);

    // Fetch data from all tables in parallel
    const tablePromises = tableNames.map((tableName) =>
      fetchTableData(tableName).catch((error) => {
        console.warn(`Failed to fetch from ${tableName}:`, error.message);
        return []; // Return empty array if table fails
      })
    );

    const tableResults = await Promise.all(tablePromises);

    // Combine all records from all tables
    const allRecords = [];
    tableResults.forEach((records, index) => {
      const tableName = tableNames[index];
      // console.log(`Processing ${records.length} records from ${tableName}`);

      records.forEach((record) => {
        allRecords.push({ record, tableName });
        // console.log(record);
      });
    });

    // console.log(`Total records from all tables: ${allRecords.length}`);

    // Transform all records
    const transformedData = allRecords
      .map(({ record, tableName }) => transformRecord(record, tableName))
      .filter((term) => {
        const isValid = term.english && term.french && term.belarusian;
        if (!isValid) {
          console.log("Filtered out invalid term:", {
            id: term.id,
            table: term.tableName,
            english: term.english,
            french: term.french,
            belarusian: term.belarusian,
          });
        }
        return isValid;
      });

    // console.log(
    //   `Valid terms before duplicate removal: ${transformedData.length}`
    // );

    // Remove duplicates based on English term
    const uniqueTerms = removeDuplicates(transformedData);

    // console.log(`Unique terms after duplicate removal: ${uniqueTerms.length}`);

    // Sort by English term
    uniqueTerms.sort((a, b) => a.english.localeCompare(b.english));

    // console.log(
    //   `Successfully processed ${uniqueTerms.length} unique dictionary terms from ${tableNames.length} tables`
    // );

    // Log statistics per table (after deduplication)
    const tableStats = {};
    uniqueTerms.forEach((term) => {
      tableStats[term.tableName] = (tableStats[term.tableName] || 0) + 1;
    });
    // console.log("Unique terms per table:", tableStats);

    return uniqueTerms;
  } catch (error) {
    console.error("Error fetching dictionary data:", error);

    // Provide more specific error messages
    if (error.message.includes("configuration is missing")) {
      throw new Error(
        "Настройка Airtable отсутствует. Проверьте переменные окружения."
      );
    } else if (error.message.includes("401")) {
      throw new Error(
        "Неверный API ключ Airtable. Проверьте VITE_AIRTABLE_API_KEY."
      );
    } else if (error.message.includes("404")) {
      throw new Error(
        "База данных или таблица не найдена. Проверьте VITE_AIRTABLE_BASE_ID и названия таблиц."
      );
    } else if (error.message.includes("422")) {
      throw new Error(
        "Ошибка в структуре запроса. Проверьте названия полей в таблицах."
      );
    } else {
      throw new Error(`Ошибка загрузки данных: ${error.message}`);
    }
  }
};

// Alternative simplified version (keeping for compatibility)
export const fetchDictionaryDataSimple = fetchDictionaryData;
