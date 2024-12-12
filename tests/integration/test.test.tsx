import App from "@/App";
import { render, screen } from "@testing-library/react";


describe("App", () => {
  it("renders headline", () => {
    render(<App  />);

    screen.debug();

    // check if App components renders headline
  });
});
