// Classic require syntax for Airtable
import Airtable from "airtable";

const AIRTABLE_API_KEY =
  "patZaTMfsBPraaDO2.6906267683d0b539d5da68d328e54915fea6a682792443d2de9934523ecc1406";
const AIRTABLE_BASE_ID = "appjxQWvXJ6jgjClp";
const AIRTABLE_TABLE_NAME = "Rhetorical Terms Part 1";
const AIRTABLE_TABLE_NAME_2 = "Rhetorical Terms Part 2";
const AIRTABLE_TABLE_NAME_3 = "Rhetorical Terms Part 3";

// Initialize base with your specific base ID
const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

// Part of Speech mapping

export const fetchDictionaryData = async () => {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_NAME) {
    throw new Error(
      "Airtable configuration is missing. Please check your environment variables."
    );
  }

  try {
    // console.log("Starting to fetch data from Airtable...");

    // Use Promise to handle the async eachPage method
    const allRecords = await new Promise((resolve, reject) => {
      const records = [];

      base(AIRTABLE_TABLE_NAME)
        .select({
          // Optional parameters:
          // maxRecords: 3000,
          sort: [{ field: "Term (EN)", direction: "asc" }],
          // filterByFormula: "NOT({Term English} = '')",
        })
        .eachPage(
          function page(pageRecords, fetchNextPage) {
            // Process each page of records
            pageRecords.forEach(function (record) {
              records.push(record);
            });

            // Fetch the next page of records
            fetchNextPage();
          },
          function done(err) {
            if (err) {
              console.error("Error in eachPage:", err);
              reject(err);
            } else {
              // console.log(`Total records fetched: ${records.length}`);
              resolve(records);
            }
          }
        );
      base(AIRTABLE_TABLE_NAME_2)
        .select({
          // Optional parameters:
          // maxRecords: 3000,
          sort: [{ field: "Term (EN)", direction: "asc" }],
          // filterByFormula: "NOT({Term English} = '')",
        })
        .eachPage(
          function page(pageRecords, fetchNextPage) {
            // Process each page of records
            pageRecords.forEach(function (record) {
              records.push(record);
            });

            // Fetch the next page of records
            fetchNextPage();
          },
          function done(err) {
            if (err) {
              console.error("Error in eachPage:", err);
              reject(err);
            } else {
              // console.log(`Total records fetched: ${records.length}`);
              resolve(records);
            }
          }
        );
      base(AIRTABLE_TABLE_NAME_3)
        .select({
          // Optional parameters:
          // maxRecords: 3000,
          sort: [{ field: "Term (EN)", direction: "asc" }],
          // filterByFormula: "NOT({Term English} = '')",
        })
        .eachPage(
          function page(pageRecords, fetchNextPage) {
            // Process each page of records
            pageRecords.forEach(function (record) {
              records.push(record);
            });

            // Fetch the next page of records
            fetchNextPage();
          },
          function done(err) {
            if (err) {
              console.error("Error in eachPage:", err);
              reject(err);
            } else {
              // console.log(`Total records fetched: ${records.length}`);
              resolve(records);
            }
          }
        );
    });

    // Transform Airtable records to our dictionary format
    const transformedData = allRecords
      .map((record) => {
        const fields = record.fields;

        return {
          id: record.id,
          english: fields["Term (EN)"] || "",
          french: fields["Term (FR)"] || "",
          belarusian: fields["Term (BE)"] || "",
          definitionEnglish: fields["Definition (EN)"] || "",
          definitionFrench: fields["Definition (FR)"] || "",
          definitionBelarusian: fields["Definition (BE)"] || "", // Note: keeping the typo as in your schema
          exampleEnglish: fields["Example (EN)"] || "",
          exampleFrench: fields["Example (FR)"] || "",
          exampleBelarusian: fields["Example (BE)"] || "",
          comments: fields["Comments"] || "",
        };
      })
      .filter((term) => term.english && term.french && term.belarusian);

    console.log(
      `Successfully transformed ${transformedData.length} dictionary terms`
    );
    return transformedData;
  } catch (error) {
    console.error("Error fetching dictionary data:", error);

    // Provide more specific error messages
    if (error.message.includes("configuration is missing")) {
      throw new Error(
        "Настройка Airtable отсутствует. Проверьте переменные окружения."
      );
    } else if (error.statusCode === 401) {
      throw new Error(
        "Неверный API ключ Airtable. Проверьте VITE_AIRTABLE_API_KEY."
      );
    } else if (error.statusCode === 404) {
      throw new Error(
        "База данных или таблица не найдена. Проверьте VITE_AIRTABLE_BASE_ID и VITE_AIRTABLE_TABLE_NAME."
      );
    } else if (error.statusCode === 422) {
      throw new Error(
        "Ошибка в структуре запроса. Проверьте названия полей в таблице."
      );
    } else {
      throw new Error(`Ошибка загрузки данных: ${error.message}`);
    }
  }
};

// Alternative method using .all() which is simpler
export const fetchDictionaryDataSimple = async () => {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_NAME) {
    throw new Error(
      "Airtable configuration is missing. Please check your environment variables."
    );
  }

  try {
    console.log("Fetching all records at once...");
    console.log("Config:", {
      hasApiKey: !!AIRTABLE_API_KEY,
      baseId: AIRTABLE_BASE_ID,
      tableName: AIRTABLE_TABLE_NAME,
    });

    const allRecords = await base(AIRTABLE_TABLE_NAME)
      .select({
        sort: [{ field: "Term English", direction: "asc" }],
      })
      .all();

    console.log(`Fetched ${allRecords.length} records`);
    console.log("Records array type:", Array.isArray(allRecords));
    console.log("Records array length:", allRecords.length);

    // More detailed debugging
    if (allRecords.length > 0) {
      console.log("First record exists:", !!allRecords[0]);
      console.log("First record type:", typeof allRecords[0]);
      console.log(
        "First record keys:",
        allRecords[0] ? Object.keys(allRecords[0]) : "no keys"
      );
      console.log("First record id:", allRecords[0]?.id);
      console.log("First record fields:", allRecords[0]?.fields);

      if (allRecords[0]?.fields) {
        console.log(
          "First record field keys:",
          Object.keys(allRecords[0].fields)
        );
        console.log(
          "Term English value:",
          allRecords[0].fields["Term English"]
        );
      }
    } else {
      console.log("No records found in the response");
    }

    // Transform Airtable records to our dictionary format
    const transformedData = allRecords
      .map((record, index) => {
        console.log(`Processing record ${index}:`, record?.id);
        const fields = record.fields || {};

        const transformed = {
          id: record.id,
          english: fields["Term English"] || "",
          french: fields["Term French"] || "",
          belarusian: fields["Term Belarusian"] || "",
          partOfSpeech: fields["Part of Speech in integer format"] || null,
          partOfSpeechText:
            PART_OF_SPEECH_MAP[fields["Part of Speech in integer format"]] ||
            "",
          definitionEnglish: fields["Definition English"] || "",
          definitionFrench: fields["Definition French"] || "",
          definitionBelarusian: fields["Defintition Belarusian"] || "",
          exampleEnglish: fields["Example English"] || "",
          exampleFrench: fields["Example French"] || "",
          exampleBelarusian: fields["Example Belarusian"] || "",
          comments: fields["Comments"] || "",
        };

        if (index === 0) {
          console.log("First transformed record:", transformed);
        }

        return transformed;
      })
      .filter((term) => {
        const isValid = term.english && term.french && term.belarusian;
        if (!isValid) {
          console.log("Filtered out invalid term:", {
            id: term.id,
            english: term.english,
            french: term.french,
            belarusian: term.belarusian,
          });
        }
        return isValid;
      });

    console.log(
      `Successfully transformed ${transformedData.length} dictionary terms`
    );
    if (transformedData.length > 0) {
      console.log("First valid transformed term:", transformedData[0]);
    }

    return transformedData;
  } catch (error) {
    console.error("Detailed error info:", {
      message: error.message,
      statusCode: error.statusCode,
      error: error,
    });
    throw new Error(`Ошибка загрузки данных: ${error.message}`);
  }
};
