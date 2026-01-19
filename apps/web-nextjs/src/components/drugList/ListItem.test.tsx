import { Wrapper } from "@/testing/test-utils";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ListItem, type ListItemProps } from "./ListItem";

const mockDrug: ListItemProps["drug"] = {
  brand_name: "Panadol Extra",
  slug: "panadol-extra",
  dosage_form: "Tablet",
  pack_size: "24 Tablets",
  strength: "500mg",
  company_name: "GSK",
  agent_name: "Sudan Agent Co.",
  generic_name: "Paracetamol",
  country_name: "UK",
  id: 1,
  agent: {
    slug: "sudan-agent-co",
  },
  company: {
    slug: "gsk",
  },
  generic: {
    slug: "paracetamol",
  },
};

const mockDrugWithNullValues: ListItemProps["drug"] = {
  brand_name: "",
  slug: "empty-drug",
  dosage_form: null,
  pack_size: null,
  strength: null,
  company_name: null,
  agent_name: null,
  generic_name: null,
  country_name: null,
  id: 1,
  agent: null,
  company: null,
  generic: null,
};
vi.mock("next/link", async () => {
  const React = await import("react");

  return {
    default: ({
      //@ts-expect-error i dont know
      href,
      children,
      onClick,
      ...props
    }: React.HTMLAttributes<HTMLAnchorElement>) => (
      <a
        href={typeof href === "string" ? href : href.pathname}
        onClick={onClick}
        {...props}>
        {children}
      </a>
    ),
  };
});

export const pushMock = vi.fn();

vi.mock("next/navigation", async () => {
  const actual =
    await vi.importActual<typeof import("next/navigation")>("next/navigation");

  return {
    ...actual,
    useRouter: () => ({
      push: pushMock,
      replace: vi.fn(),
      prefetch: vi.fn(),
    }),
  };
});

describe("ListItem", () => {
  afterEach(() => {
    pushMock.mockClear();
  });
  describe("rendering", () => {
    it("should render drug information correctly", async () => {
      render(<ListItem drug={mockDrug} />, { wrapper: Wrapper });

      // Using findByText to wait for React to flush updates
      expect(await screen.findByText("Panadol Extra")).toBeInTheDocument();
      expect(screen.getByText("500mg")).toBeInTheDocument();
      expect(screen.getByText("Tablet")).toBeInTheDocument();

      expect(screen.getByText("24 Tablets")).toBeInTheDocument();
      expect(screen.getByText("Paracetamol")).toBeInTheDocument();
      expect(screen.getByText("Sudan Agent Co.")).toBeInTheDocument();
      expect(screen.getByText("GSK")).toBeInTheDocument();
      expect(screen.getByText("UK")).toBeInTheDocument();
    });

    it("should render fallback text when drug properties are null or empty", async () => {
      render(<ListItem drug={mockDrugWithNullValues} />, { wrapper: Wrapper });

      expect(await screen.findByText("No Brand Name")).toBeInTheDocument();
      expect(screen.getByText("No Strength")).toBeInTheDocument();
      expect(screen.getByText("No Dosage Form")).toBeInTheDocument();
      expect(screen.getByText("No Pack Size")).toBeInTheDocument();
      expect(screen.getByText("No Generic Name")).toBeInTheDocument();
      expect(screen.getByText("No Agent Name")).toBeInTheDocument();
      expect(screen.getByText("No Company Name")).toBeInTheDocument();
      expect(screen.getByText("No Country of Origin")).toBeInTheDocument();
    });

    it("should navigate to the drug details page when clicked", async () => {
      const user = userEvent.setup();

      render(<ListItem drug={mockDrug} />, { wrapper: Wrapper });

      // Wait for the link to be in the document
      const card = await screen.findByTestId("drug-card");
      await user.click(card);
      expect(pushMock).toHaveBeenCalledWith("/drug-list/panadol-extra");
    });
    it("should navigate to the agent details page when clicked", async () => {
      const user = userEvent.setup();

      render(<ListItem drug={mockDrug} />, { wrapper: Wrapper });

      const Link = await screen.findByTestId("drug-card-agentName");
      await user.click(Link);
      expect(Link).toHaveAttribute("href", "/agents/sudan-agent-co");
    });
    it("should navigate to the generic details page when clicked", async () => {
      const user = userEvent.setup();

      render(<ListItem drug={mockDrug} />, { wrapper: Wrapper });

      const Link = await screen.findByTestId("drug-card-genericName");
      await user.click(Link);
      expect(Link).toHaveAttribute("href", "/generics/paracetamol");
    });
    it("should navigate to the company details page when clicked", async () => {
      const user = userEvent.setup();

      render(<ListItem drug={mockDrug} />, { wrapper: Wrapper });

      // Wait for the link to be in the document
      const Link = await screen.findByTestId("drug-card-companyName");
      await user.click(Link);
      expect(Link).toHaveAttribute("href", "/companies/gsk");
    });
  });

  describe("isFirst prop", () => {
    it("should add IDs to elements when isFirst is true", async () => {
      render(
        <ListItem
          drug={mockDrug}
          isFirst={true}
        />,
        { wrapper: Wrapper }
      );

      await screen.findByText("Panadol Extra");

      expect(document.getElementById("drugInfo-card")).toBeInTheDocument();
      expect(
        document.getElementById("drugInfo-card-brandName")
      ).toBeInTheDocument();
    });

    it("should not add IDs to elements when isFirst is false", async () => {
      render(<ListItem drug={mockDrug} />, { wrapper: Wrapper });

      await screen.findByText("Panadol Extra");

      expect(document.getElementById("drugInfo-card")).not.toBeInTheDocument();
    });
  });

  describe("title attributes", () => {
    it("should have correct title attributes", async () => {
      render(<ListItem drug={mockDrug} />, { wrapper: Wrapper });

      await screen.findByText("Panadol Extra");

      expect(screen.getByTitle("Panadol Extra")).toBeInTheDocument();
    });
  });
});
