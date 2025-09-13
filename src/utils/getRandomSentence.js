import { fetchWords } from "./monkeytypeApi";

// English words for typing practice (fallback word list)
const englishWords = [
  // Common words
  "the",
  "be",
  "to",
  "of",
  "and",
  "a",
  "in",
  "that",
  "have",
  "i",
  "it",
  "for",
  "not",
  "on",
  "with",
  "he",
  "as",
  "you",
  "do",
  "at",
  "this",
  "but",
  "his",
  "by",
  "from",
  "they",
  "we",
  "say",
  "her",
  "she",
  // Additional common words
  "about",
  "above",
  "accept",
  "across",
  "act",
  "active",
  "actual",
  "adapt",
  "add",
  "adjust",
  "admit",
  "adult",
  "advance",
  "advice",
  "affect",
  "afford",
  "afraid",
  "after",
  "again",
  "age",
  "agree",
  "ahead",
  "air",
  "all",
  "allow",
  "almost",
  "alone",
  "along",
  "already",
  "always",
  "am",
  "amount",
  "amuse",
  "analyze",
  "ancient",
  "anger",
  "angle",
  "angry",
  "animal",
  "answer",
  "any",
  "apple",
  "approve",
  "argue",
  "arm",
  "army",
  "around",
  "arrive",
  "art",
  "article",
  "artist",
  "ask",
  "assume",
  "athlete",
  "atom",
  "attack",
  "attend",
  "attract",
  "author",
  "autumn",
  "average",
  "avoid",
  "awake",
  "aware",
  "away",
  "baby",
  "back",
  "bad",
  "bag",
  "balance",
  "ball",
  "band",
  "bank",
  "bar",
  "base",
  "basic",
  "basis",
  "basket",
  "battle",
  "beach",
  "bear",
  "beat",
  "beauty",
  "because",
  "become",
  "bed",
  "before",
  "begin",
  "behind",
  "believe",
  "bell",
  "belong",
  "below",
  "belt",
  "bench",
  "bend",
  "benefit",
  "best",
  "bet",
  "between",
  "beyond",
  "bicycle",
  "bid",
  "big",
  "bike",
  "bill",
  "bind",
  "bird",
  "birth",
  "black",
  "blade",
  "blame",
  "blank",
  "blast",
  "blind",
  "block",
  "blood",
  "blow",
  "blue",
  "board",
];

// Grammatically correct sentences for fallback
const fallbackSentences = [
  "The quick brown fox jumps over the lazy dog and runs into the forest.",
  "She walked through the garden, admiring the colorful flowers swaying in the breeze.",
  "The old library contains thousands of books, each telling its own unique story.",
  "Children played in the park while parents watched from nearby benches.",
  "The scientist conducted experiments in the laboratory, seeking new discoveries.",
  "Waves crashed against the shore as seagulls soared overhead in the cloudy sky.",
  "The chef prepared a delicious meal using fresh ingredients from the local market.",
  "Students gathered in the classroom, eager to learn about world history.",
  "The musician practiced diligently, perfecting every note of the complex piece.",
  "Autumn leaves fell gently from the trees, creating a carpet of red and gold.",
];

/**
 * Generates a random sentence using words from Monkeytype's API
 * Falls back to local word list if API fails
 * @returns {Promise<string>} A sentence for typing practice
 */
export async function getRandomSentence(minWords = 35) {
  try {
    // Try to get enough words from Monkeytype's API to satisfy minWords
    const collected = [];
    while (collected.length < minWords) {
      const batchSize = Math.min(50, minWords - collected.length);
      const words = await fetchWords(Math.max(25, batchSize));
      if (!words || words.length === 0) throw new Error("No words returned from API");
      collected.push(...words);
    }
    const text = collected.slice(0, minWords).join(" ");
    return text.charAt(0).toUpperCase() + text.slice(1);
  } catch (error) {
    console.warn("Error fetching from Monkeytype API, using fallback:", error);

    try {
      // Use local word list as first fallback, ensuring minWords
      const selectedWords = [];
      for (let i = 0; i < minWords; i++) {
        const randomWord = englishWords[Math.floor(Math.random() * englishWords.length)];
        selectedWords.push(randomWord);
      }
      const text = selectedWords.join(" ");
      return text.charAt(0).toUpperCase() + text.slice(1);
    } catch (fallbackError) {
      console.error("Error using word list fallback:", fallbackError);
      // Use grammatically correct sentences as final fallback. Concatenate until minWords satisfied.
      const sentences = [];
      let totalWords = 0;
      while (totalWords < minWords) {
        const s = fallbackSentences[Math.floor(Math.random() * fallbackSentences.length)];
        sentences.push(s);
        totalWords += s.split(/\s+/).length;
      }
      return sentences.join(" ");
    }
  }
}
