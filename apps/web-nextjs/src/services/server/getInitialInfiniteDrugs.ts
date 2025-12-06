import { Drug } from "@/db/schema";
import "server-only";

export async function getDrugs(page = 1, q?: string) {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api"
      : process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }
  const url = new URL(`${baseUrl}/drugs`);

  if (q) url.searchParams.set("q", q);
  url.searchParams.set("page", page.toString());
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch drugs: ${res.status} ${res.statusText}`);
  }
  const data = (await res.json()) as FetchedDrugs;
  return data;
}
export type FetchedDrugs = {
  data: Drug[];
  nextPage: number | null;
};
