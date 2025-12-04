import { client } from "@/lib/tursoDB";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Math.min(Number(searchParams.get("limit")) || 20, 50);
  const q = searchParams.get("q")?.toLowerCase() || "";
  const offset = (page - 1) * limit;
  const filterBy = searchParams.get("filterBy") || "";
  const allowedColumns = [
    "brandName",
    "genericName",
    "agentName",
    "companyName",
    "countryOfOrigin",
  ];
  const column = allowedColumns.includes(filterBy) ? filterBy : "brandName";

  // search filtering
  const filtered = await client.execute({
    sql: `SELECT * FROM drugs
     WHERE LOWER(${column}) LIKE ?
     ORDER BY ${column} ASC
     LIMIT ? OFFSET ?;`,
    args: [`%${q}%`, limit, offset],
  });

  const rows = filtered.rows ?? [];

  const nextPage = rows.length === limit ? page + 1 : null;

  const res = {
    data: rows,
    nextPage,
  };

  return Response.json(res);
}
