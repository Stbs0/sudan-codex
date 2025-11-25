import drugs from "@/data/drugData.json";
export async function GET(
  req: Request,
  { params }: { params: Promise<{ no: string }> }
) {
  const { no } = await params;
  const drug = drugs.find((d) => d.no === no);
  if (!drug) {
    return new Response("Drug not found", { status: 404 });
  }
  return Response.json(drug);
}
