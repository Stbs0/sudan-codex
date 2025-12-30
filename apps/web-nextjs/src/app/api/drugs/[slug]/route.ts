import { getPostHogServer } from "@/lib/posthog-server";
import { getDrugBySlug } from "@/services/server/getDrugs";
import { notFound } from "next/navigation";
import type { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: RouteContext<"/api/drugs/[slug]">,
) {
  const { slug } = await params.catch(() => {
    return notFound();
  });

  if (!slug || slug.length > 120 || !/^[a-z0-9-]+$/.test(slug)) {
    return Response.json({ error: "Invalid slug" }, { status: 400 });
  }

  try {
    const drug = await getDrugBySlug(slug);

    if (!drug) {
      return Response.json({ error: "Drug not found" }, { status: 404 });
    }

    return Response.json(drug);
  } catch (err) {
    const posthog = getPostHogServer();
    console.error(err);
    posthog.captureException(err, "get_drug_by_slug_api_error", {
      slug,
    });
    await posthog.shutdown();
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
