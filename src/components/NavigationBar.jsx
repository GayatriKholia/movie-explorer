// src/components/NavigationBar.jsx
import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "./NavigationBar.css"; // component-specific CSS

function NavigationBar({ wishlistCount = 0 }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [q, setQ] = useState("");

  const onSearch = () => {
    const event = new CustomEvent("movieSearch", { detail: q });
    window.dispatchEvent(event);
  };

  return (
    <nav className={`nav ${theme}`}>
      <h1 className="logo">MOVIE EXPLORER</h1>

      <div className="nav-controls">
        <input
          className="search-input"
          type="text"
          placeholder="Search movies..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
        />
        <button className="search-btn" onClick={onSearch}>
          Search
        </button>
        <button className={`theme-btn ${theme}`} onClick={toggleTheme}>
          {theme === "light" ? "Dark" : "Light"}
        </button>
        <div className="wishlist">Wishlist: {wishlistCount}</div>
      </div>
    </nav>
  );
}

export default NavigationBar;
