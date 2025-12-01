// src/api/moviesApi.js
export function fetchMovies(delay = 700) {
  // simulate an asynchronous API call that returns JSON
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        // import JSON with dynamic import so bundler includes it
        const data = await import("../assets/Movies.json");
        resolve(data.default);
      } catch (err) {
        reject(new Error("Failed to load movies"));
      }
    }, delay);
  });
}
