// src/App.js
import React, { useEffect, useState } from "react";
import "./App.css";
import { ThemeProvider } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext";
import { fetchMovies } from "./api/MovieApi";
import MovieList from "./components/MovieList";
import NavigationBar from "./components/NavigationBar";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  // wishlist stored in App state so we can pass handlers down (prop drilling)
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist when app starts
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist"));
    if (saved) setWishlist(saved);
  }, []);

  // Save wishlist whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchMovies()
      .then((data) => {
        if (isMounted) {
          setMovies(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Error fetching movies");
          setLoading(false);
        }
      });
    return () => (isMounted = false);
  }, []);

  // prop drilling handlers (will be passed down)
  const addToWishlist = (movie) =>
    setWishlist((prev) =>
      prev.some((m) => m.id === movie.id) ? prev : [...prev, movie]
    );
  const removeFromWishlist = (movieId) =>
    setWishlist((prev) => prev.filter((m) => m.id !== movieId));

  return (
    <ThemeProvider>
      <UserProvider>
        <div className="app-root">
          <NavigationBar wishlistCount={wishlist.length} />
          <main className="container">
            <MovieList
              movies={movies}
              loading={loading}
              error={error}
              wishlist={wishlist}
              addToWishlist={addToWishlist}
              removeFromWishlist={removeFromWishlist}
            />
          </main>
        </div>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
