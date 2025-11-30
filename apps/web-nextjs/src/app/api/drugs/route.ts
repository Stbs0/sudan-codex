import { getAllDrugs } from "@/services/server/getDrugs";

export async function GET(req: Request) {
  const drugs = await getAllDrugs();
  const { searchParams } = new URL(req.url);

  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const limit = Math.min(Number(searchParams.get("limit") || 20), 100);
  const q = decodeURIComponent(searchParams.get("q")?.toLowerCase() || "");

  // search filtering
  const filtered = q
    ? drugs.filter(
        (d) =>
          d.brandName?.toLowerCase().includes(q) ||
          d.genericName?.toLowerCase().includes(q) ||
          d.companyName?.toLowerCase().includes(q)
      )
    : drugs;

  const start = (page - 1) * limit;
  const end = start + limit;

  const pageData = filtered.slice(start, end);
  const res = {
    data: pageData,

    nextCursor: end < filtered.length ? page + 1 : null,
  };
  return Response.json(res);
}
