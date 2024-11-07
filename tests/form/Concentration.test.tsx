import { Concentration } from "@/components/form/Concentration";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Concentration", () => {
  const defaultProps = {
    name: "strength.0.nominator",
    unitName: "strength.0.denominator",

    placeholder: "100",
    hasDenominator: true,
  };

  it("renders with required props", () => {
    const { getByPlaceholderText } = render(
      <Concentration {...defaultProps} />,
    );
    expect(getByPlaceholderText("100")).toBeInTheDocument();
  });

  it("renders with optional props (denominator, hasDenominator)", () => {
    const props = { ...defaultProps, denominator: true, hasDenominator: true };
    const { getByPlaceholderText } = render(<Concentration {...props} />);
    expect(getByPlaceholderText("100")).toBeInTheDocument();
  });

  it("handles input changes for number field", async () => {
    const props = { ...defaultProps };
    const { getByPlaceholderText } = render(<Concentration {...props} />);
    const input = getByPlaceholderText("100");
    fireEvent.change(input, { target: { value: "10" } });
    await waitFor(() => expect(input).toBe("10"));
  });

  it("handles input changes for autocomplete field", async () => {
    const props = { ...defaultProps };
    const { getByText } = render(<Concentration {...props} />);
    const autocomplete = getByText("mg");
    fireEvent.click(autocomplete);
    await waitFor(() =>
      expect(autocomplete).toHaveAttribute("aria-selected", "true"),
    );
  });

  it("displays error message when form state has errors", async () => {
    const props = { ...defaultProps };
    // const formState = {
    //   errors: {
    //     strength: [
    //       {
    //         nominator: { message: "Error message" },
    //       },
    //     ],
    //   },
    // };
    const { getByText } = render(<Concentration {...props} />, {
      // formState,
    });
    await waitFor(() => expect(getByText("Error message")).toBeInTheDocument());
  });
});
