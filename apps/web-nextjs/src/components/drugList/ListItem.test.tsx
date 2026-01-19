import { Wrapper } from "@/testing/test-utils";
import { render, screen } from "@testing-library/react";
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

describe("ListItem", () => {
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

    it("should render as a link to the drug details page", async () => {
      render(<ListItem drug={mockDrug} />, { wrapper: Wrapper });

      // Wait for the link to be in the document
      const link = await screen.findByTestId("drug-card");
      expect(link).toHaveAttribute("href", "/drug-list/panadol-extra");
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
