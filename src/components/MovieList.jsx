
import { useEffect, useMemo, useState } from "react";
import Filter from "../components/Filter";
import MovieCard from "../components/MovieCard";

export default function MovieList({ movies = [], loading, error, wishlist, addToWishlist, removeFromWishlist }) {
  const [filters, setFilters] = useState({ genre: "", minRating: "" });
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 4;

  useEffect(() => {
    const handler = e => setQuery(e.detail || "");
    window.addEventListener("movieSearch", handler);
    return () => window.removeEventListener("movieSearch", handler);
  }, []);

  // reset filters when requested by navbar clear button
  useEffect(() => {
    const resetHandler = () => setFilters({ genre: "", minRating: "" });
    window.addEventListener("resetFilters", resetHandler);
    return () => window.removeEventListener("resetFilters", resetHandler);
  }, []);

  // available genres from data
  const genres = useMemo(() => Array.from(new Set(movies.map(m => m.genre))), [movies]);

  // filtered & searched list
  const filtered = useMemo(() => {
    let list = movies;
    if (filters.genre) list = list.filter(m => m.genre === filters.genre);
    if (filters.minRating) list = list.filter(m => Number(m.rating) >= Number(filters.minRating));
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(m => m.title.toLowerCase().includes(q) || (m.description || "").toLowerCase().includes(q));
    }
    return list;
  }, [movies, filters, query]);

  // pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  if (loading) return <div>Loading movies...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="movies-section">
      <div className="movies-header">
        <div>
          <h2 className="page-title">Movie Explorer</h2>
          <div className="results-count">{filtered.length} results</div>
        </div>
      </div>
      <Filter genres={genres} selected={filters} onChange={setFilters} />
      <div className="movie-grid">
        {pageItems.map(movie => {
          const wishlisted = wishlist.some(m => m.id === movie.id);
          // Prop drilling: pass handlers directly to MovieCard
          return (
            <MovieCard
              key={movie.id}
              movie={movie}
              isWishlisted={wishlisted}
              onAdd={addToWishlist}
              onRemove={removeFromWishlist}
            />
          );
        })}
      </div>

      <div className="pagination" role="navigation" aria-label="Pagination">
        <button className="btn btn-ghost" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
          Prev
        </button>
        <span className="page-indicator">
          {page} / {totalPages}
        </span>
        <button className="btn btn-ghost" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
          Next
        </button>
      </div>

      <hr />
    </div>
  );
}
