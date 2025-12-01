import { render, screen, fireEvent } from "@testing-library/react";
import Filter from "../components/Filter";

test("updates genre when user selects a value", () => {
  const genres = ["Action", "Romance", "Sci-Fi"];
  const selected = { genre: "", minRating: "" };
  const onChange = jest.fn();

  render(<Filter genres={genres} selected={selected} onChange={onChange} />);

  // user selects "Romance"
  fireEvent.change(screen.getByLabelText(/genre/i), {
    target: { value: "Romance" },
  });

  // Verify that onChange was called with updated state
  expect(onChange).toHaveBeenCalledWith({
    ...selected,
    genre: "Romance",
  });
});
