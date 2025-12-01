export default function MovieCard({ movie, isWishlisted, onAdd, onRemove }) {
  return (
    <article className="movie-card">
      <img src={movie.poster} alt={movie.title} className="poster"/>
      <div className="movie-info">
        {/* <h3>{movie.title} ({movie.year})</h3> */}
        <p>{movie.genre} · Rating: {movie.rating}</p>
        {/* <p>{movie.description}</p> */}

        {isWishlisted ? (
          // <button onClick={() => onRemove(movie.id)}>Remove from Wishlist</button>
          <></>
        ) : (
          <button onClick={() => onAdd(movie)}>Add to Wishlist</button>
        )}
      </div>
    </article>
  );
}