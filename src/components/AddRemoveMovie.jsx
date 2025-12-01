import "./AddRemoveMovie.css";
export default function AddRemoveMovie({ wishlist, removeFromWishlist }) {
  if (!wishlist.length) return <div>Your wishlist is empty.</div>;

  return (
    <div className="wishlist">
      <h2>Wishlist</h2>
      <ul>
        {wishlist.map(m => (
          <li key={m.id}>
            {m.title} <button className="remove-icon" onClick={() => removeFromWishlist(m.id)}> ✕ </button>
          </li>
        ))}
      </ul>
    </div>
  );
}