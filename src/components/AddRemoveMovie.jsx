import { useEffect, useState } from "react";
import "./AddRemoveMovie.css";

export default function AddRemoveMovie({ wishlist, removeFromWishlist }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handler = () => setVisible(v => !v);
    window.addEventListener("toggleWishlist", handler);
    return () => window.removeEventListener("toggleWishlist", handler);
  }, []);

  if (!wishlist.length) return <div id="wishlist-section" className="wishlist-panel">Your wishlist is empty.</div>;

  return (
    <div id="wishlist-section" className={`wishlist-panel ${visible ? "open" : "closed"}`} aria-hidden={!visible}>
      <div className="wishlist-header">
        <h2>Wishlist</h2>
        <div className="count">{wishlist.length}</div>
      </div>
      <ul>
        {wishlist.map(m => (
          <li key={m.id}>
            <span className="title">{m.title}</span>
            <button className="remove-icon" onClick={() => removeFromWishlist(m.id)} aria-label={`Remove ${m.title}`}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}