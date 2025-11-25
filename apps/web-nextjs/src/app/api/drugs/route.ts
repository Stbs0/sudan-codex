// app/api/drugs/route.ts
import drugs from "@/data/drugData.json";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") || 1);
  const limit = 20;
  const q = searchParams.get("q")?.toLowerCase() || "";

  // search filtering
  const filtered = q
    ? drugs.filter(
        (d) =>
          d.brandName.toLowerCase().includes(q) ||
          d.genericName.toLowerCase().includes(q) ||
          d.companyName.toLowerCase().includes(q)
      )
    : drugs;

  const start = (page - 1) * limit;
  const end = start + limit;

  const pageData = filtered.slice(start, end);
  const res = {
    data: pageData,

    nextCursor: end < filtered.length ? page + 1 : null,
  };
  console.log("res", res);
  return Response.json(res);
}
