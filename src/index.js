// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";

// We want to add the theme class to <body> or root element. Simple approach:
// Wrap the App in ThemeProvider and then read theme in a small wrapper:
function Root() {
  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({ theme }) => (
          <div className={`theme-${theme}`}>
            <App />
          </div>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);
