export default function MovieCard({ movie, isWishlisted, onAdd, onRemove }) {
  return (
    <article className="movie-card">
      <img src={movie.poster} alt={movie.title} className="poster"/>
      <div className="movie-info">
        {/* <h3>{movie.title} ({movie.year})</h3> */}
        <p>{movie.genre} · Rating: {movie.rating}</p>
        {/* <p>{movie.description}</p> */}

        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:12}}>
          <div>
            <h3 style={{margin:'0 0 6px 0'}}>{movie.title}</h3>
            <p style={{margin:0, color:'var(--muted)'}}>{movie.year ? `${movie.year}` : ''}</p>
          </div>

          {isWishlisted ? (
            <button className="btn btn-accent btn-added" title="Wishlisted">✓</button>
          ) : (
            <button className="btn-add" onClick={() => onAdd(movie)} aria-label={`Add ${movie.title} to wishlist`}>
              <span className="plus">+</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}