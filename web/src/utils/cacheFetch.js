// cacheFetch.js
// Utility for client-side caching of API responses using localStorage

/**
 * Fetch data with caching (localStorage)
 * @param {string} url - The API endpoint
 * @param {object} [options] - Fetch options
 * @param {string} [cacheKey] - Optional custom cache key
 * @returns {Promise<any>} - The fetched or cached data
 */
export async function cacheFetch(url, options = {}, cacheKey = null) {
  const key = cacheKey || url;
  const cache = localStorage.getItem(key);
  const now = Date.now();
  const maxAge = 5 * 60 * 1000; // 5 minutes in ms

  if (cache) {
    try {
      const { data, timestamp } = JSON.parse(cache);
      if (now - timestamp < maxAge) {
        return data;
      }
    } catch (e) {
      // Ignore parse errors, fetch fresh
    }
  }

  const response = await fetch(url, options);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  localStorage.setItem(key, JSON.stringify({ data, timestamp: now }));
  return data;
}
