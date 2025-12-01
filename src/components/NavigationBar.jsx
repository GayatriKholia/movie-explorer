// src/components/NavigationBar.jsx
import React, { useContext, useState, useRef, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "./NavigationBar.css"; // component-specific CSS
function NavigationBar({ wishlistCount = 0, wishlist = [], removeFromWishlist }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const rootRef = useRef();

  useEffect(() => {
    function onDocClick(e) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const onSearch = () => {
    const event = new CustomEvent("movieSearch", { detail: q });
    window.dispatchEvent(event);
  };

  const inputRef = useRef();

  const clearSearch = () => {
    setQ("");
    // clear query for MovieList
    const ev = new CustomEvent("movieSearch", { detail: "" });
    window.dispatchEvent(ev);
    // also notify to reset filters
    const ev2 = new CustomEvent("resetFilters");
    window.dispatchEvent(ev2);
    // focus back to input
    if (inputRef.current) inputRef.current.focus();
  };

  const onToggleWishlist = () => setOpen(o => !o);

  return (
    <nav ref={rootRef} className={`nav ${theme}`}>
      <h1 className="logo">MOVIE EXPLORER</h1>

      <div className="nav-controls">
        <div className="search-wrapper">
          <input
            ref={inputRef}
            className="search-input"
            type="text"
            placeholder="Search movies..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
          />
          {q && (
            <button className="search-clear" onClick={clearSearch} aria-label="Clear search">×</button>
          )}
        </div>
        <button className="search-btn" onClick={onSearch}>
          Search
        </button>
        <button className={`theme-btn ${theme}`} onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "light" ? "Dark" : "Light"}
        </button>

        <div style={{position:'relative'}}>
          <button className="wishlist-btn" onClick={onToggleWishlist} aria-label="Open wishlist">
            <span className="heart">❤</span>
            {wishlistCount > 0 && <span className="badge" aria-hidden>{wishlistCount}</span>}
          </button>

          {open && (
            <div className="wishlist-dropdown" role="dialog" aria-label="Wishlist panel">
              <div className="wishlist-dropdown-header">Wishlist <span className="count">{wishlistCount}</span></div>
              <ul>
                {wishlist.length === 0 ? <li className="empty">No items</li> : wishlist.map(m => (
                  <li key={m.id}>
                    <span className="title">{m.title}</span>
                    <button className="remove-icon" onClick={() => removeFromWishlist && removeFromWishlist(m.id)}>✕</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
