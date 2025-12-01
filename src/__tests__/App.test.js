import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders Movie Explorer heading", () => {
  render(<App />);
  expect(screen.getByText(/movie explorer/i)).toBeInTheDocument();
});