import "./Filter.css";

function Filter({ genres, selected, onChange }) {
  return (
    <div className="filter">
      <label>
        Genre:
        <select
          value={selected.genre || ""}
          onChange={(e) => onChange({ ...selected, genre: e.target.value })}
        >
          <option value="">All</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </label>
      <label>
        Min Rating:
        <input
          type="number"
          min="0"
          max="10"
          step="0.1"
          value={selected.minRating || ""}
          //onChange={e => onChange({ ...selected, minRating: e.target.value })}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "") {
              onChange({ ...selected, minRating: "" });
              return;
            }

            const num = parseFloat(value);
            if (!isNaN(num) && num >= 0 && num <= 10) {
              onChange({ ...selected, minRating: num });
            }
          }}
          onKeyDown={(e) => {
            const allowedKeys = [
              "Backspace",
              "Delete",
              "Tab",
              "Escape",
              "Enter",
              "ArrowLeft",
              "ArrowRight",
              "ArrowUp",
              "ArrowDown",
            ];

            if (allowedKeys.includes(e.key)) return;

            // Allow digits and decimal point
            if (!/[0-9.]/.test(e.key)) {
              e.preventDefault();
              return;
            }

            // Prevent more than one decimal point
            if (e.key === "." && e.target.value.includes(".")) {
              e.preventDefault();
              return;
            }

            // Prevent typing a number greater than 10
            const selectionStart = e.target.selectionStart;
            const selectionEnd = e.target.selectionEnd;
            const newValue =
              e.target.value.substring(0, selectionStart) +
              e.key +
              e.target.value.substring(selectionEnd);

            const parsed = parseFloat(newValue);
            if (!isNaN(parsed) && parsed > 10) {
              e.preventDefault();
            }
          }}
        />
      </label>
    </div>
  );
}

export default Filter;
