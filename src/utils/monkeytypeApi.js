// API endpoints
const MONKEYTYPE_API_BASE = "https://api.monkeytype.com";

/**
 * Fetches a list of words from Monkeytype's API
 * @param {number} wordCount - Number of words to fetch
 * @returns {Promise<string[]>} Array of words
 */
export async function fetchWords(wordCount = 30) {
  try {
    const response = await fetch(`${MONKEYTYPE_API_BASE}/words`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch words from Monkeytype API");
    }

    const data = await response.json();
    return data.words || [];
  } catch (error) {
    console.error("Error fetching words from Monkeytype API:", error);
    throw error;
  }
}

/**
 * Fetches English language configuration from Monkeytype
 * @returns {Promise<Object>} Language configuration
 */
export async function fetchLanguageConfig() {
  try {
    const response = await fetch(`${MONKEYTYPE_API_BASE}/languages/english`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch language config from Monkeytype API");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching language config:", error);
    throw error;
  }
}
