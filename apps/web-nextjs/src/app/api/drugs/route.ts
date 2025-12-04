import { SearchDrugType } from "@/hooks/store/useSearch";
import { client } from "@/lib/tursoDB";
import { literal } from "zod";

const searchSchema = literal([
  "brandName",
  "genericName",
  "agentName",
  "companyName",
  "countryOfOrigin",
]);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Math.min(Number(searchParams.get("limit")) || 20, 50);

  const q = searchParams.get("q")?.toLowerCase() || "";
  const offset = (page - 1) * limit;
  const filterBy = searchParams.get("filterBy") || "";

  const columnQueries: Record<SearchDrugType, string> = {
    brandName:
      "SELECT * FROM drugs WHERE LOWER(brandName) LIKE ? ORDER BY brandName ASC LIMIT ? OFFSET ?;",
    genericName:
      "SELECT * FROM drugs WHERE LOWER(genericName) LIKE ? ORDER BY genericName ASC LIMIT ? OFFSET ?;",
    agentName:
      "SELECT * FROM drugs WHERE LOWER(agentName) LIKE ? ORDER BY agentName ASC LIMIT ? OFFSET ?;",
    companyName:
      "SELECT * FROM drugs WHERE LOWER(companyName) LIKE ? ORDER BY companyName ASC LIMIT ? OFFSET ?;",
    countryOfOrigin:
      "SELECT * FROM drugs WHERE LOWER(countryOfOrigin) LIKE ? ORDER BY countryOfOrigin ASC LIMIT ? OFFSET ?;",
  };

  let sql = columnQueries.brandName;
  const column = searchSchema.safeParse(filterBy);

  if (column.success) {
    sql = columnQueries[column.data];
  }

  const filtered = await client.execute({
    sql,
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
