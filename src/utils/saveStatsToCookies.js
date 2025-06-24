import Cookies from "js-cookie";

const STATS_COOKIE_KEY = "typing_stats";
const MAX_STATS_ENTRIES = 50; // Keep last 50 entries

export function saveStatsToCookies(stats) {
  try {
    // Get existing stats
    const existingStats = Cookies.get(STATS_COOKIE_KEY);
    let statsArray = existingStats ? JSON.parse(existingStats) : [];

    // Add new stats at the beginning
    statsArray.unshift(stats);

    // Keep only the last MAX_STATS_ENTRIES entries
    if (statsArray.length > MAX_STATS_ENTRIES) {
      statsArray = statsArray.slice(0, MAX_STATS_ENTRIES);
    }

    // Save back to cookie (expires in 30 days)
    Cookies.set(STATS_COOKIE_KEY, JSON.stringify(statsArray), { expires: 30 });
    return true;
  } catch (error) {
    console.error("Error saving stats to cookies:", error);
    return false;
  }
}

export function getStatsFromCookies() {
  try {
    const stats = Cookies.get(STATS_COOKIE_KEY);
    return stats ? JSON.parse(stats) : [];
  } catch (error) {
    console.error("Error reading stats from cookies:", error);
    return [];
  }
}

export function clearStats() {
  try {
    Cookies.remove(STATS_COOKIE_KEY);
    return true;
  } catch (error) {
    console.error("Error clearing stats:", error);
    return false;
  }
}
