import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders account component", () => {
  render(<App />);
  const linkElement = screen.getByText(/Account Name/i);
  expect(linkElement).toBeInTheDocument();
});
