import "server-only";

import { Drug } from "@sudan-codex/db";

import type { InfiniteDrugApiResponse } from "@/app/api/v1/drugs/route";

export async function getDrugs(page = 1, q?: string) {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api"
      : process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }
  const url = new URL(`${baseUrl}/v1/drugs`);

  if (q) url.searchParams.set("q", q);
  url.searchParams.set("page", page.toString());
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch drugs: ${res.status} ${res.statusText} ${url}`
    );
  }
  const data = (await res.json()) as InfiniteDrugApiResponse;
  return data;
}
export type FetchedDrugs = {
  data: Drug[];
  nextPage: number | null;
};
