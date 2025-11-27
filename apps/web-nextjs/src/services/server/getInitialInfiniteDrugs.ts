import { Drug } from "@/lib/types";
import "server-only";

export async function getDrugs(page = 1, q?: string) {
  const url = new URL(
    `${process.env.NODE_ENV === "development" ? "http://localhost:3000" : process.env.NEXT_PUBLIC_API_URL}/api/drugs`
  );
  url.searchParams.set("page", page.toString());
  if (q) url.searchParams.set("q", q);
  const res = await fetch(url, { cache: "no-store" });
  return res.json() as Promise<FetchedDrugs>;
}
export type FetchedDrugs = {
  data: Drug[];
  nextCursor: number | null;
};
