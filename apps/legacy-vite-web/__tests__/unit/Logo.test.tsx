import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate, NavigateFunction } from "react-router-dom";
import React from "react";
import Logo from "../../src/components/MainLayout/Logo";

// Mock the useNavigate hook
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
    useLocation: vi.fn(() => ({ pathname: "/some-path" })),
  };
});

describe("Logo Component", () => {
  it("renders logo image correctly", () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );

    const logoImage = screen.getByAltText("logo");
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveClass("h-full w-full object-contain");
  });

  it("navigates to home when clicked and not on home page", () => {
    const navigate = vi.fn() as NavigateFunction;
    (useNavigate as ReturnType<typeof vi.fn>).mockReturnValue(navigate);

    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(navigate).toHaveBeenCalledWith("/", {});
  });

  it("applies custom className when provided", () => {
    render(
      <MemoryRouter>
        <Logo className='custom-class' />
      </MemoryRouter>
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });
});
