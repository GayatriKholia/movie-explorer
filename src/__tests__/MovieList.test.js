import { render, screen, fireEvent } from "@testing-library/react";
import MovieList from "../components/MovieList";

const mockMovies = [
  { id: "m1", title: "The Avengers", genre: "Action", rating: 8.0 },
  { id: "m11", title: "Whispers of the Heartbeat", genre: "Romance", rating: 7.4 },
];

test("filters movies by genre", () => {
  render(
    <MovieList
      movies={mockMovies}
      loading={false}
      error={null}
      wishlist={[]}
      addToWishlist={() => {}}
      removeFromWishlist={() => {}}
    />
  );

  // Select Romance
  fireEvent.change(screen.getByLabelText(/genre/i), {
    target: { value: "Romance" },
  });

  // Should show Romance movie
  expect(screen.getByAltText("Whispers of the Heartbeat")).toBeInTheDocument();

  // Should hide Action movie
  expect(screen.queryByAltText("The Avengers")).not.toBeInTheDocument();
});
