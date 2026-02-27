import { FetchedDrugInfo, OPENFDA_SEARCH_URL } from "@sudan-codex/types";

import { getOpenFdaSearchUrl, parseQuery } from "@/lib/utils";
export const getDrugInfo = async (
  genericName: string,
  route: string,
  refetch: boolean
) => {
  const parsedGenericName = parseQuery(genericName);

  const routeQuery = route ? `+AND+(openfda.route:"${route}")` : "";

  const url = refetch
    ? encodeURI(
        `${OPENFDA_SEARCH_URL}?search=(spl_product_data_elements:(*${parsedGenericName}*)${routeQuery})`
      )
    : getOpenFdaSearchUrl(parsedGenericName);
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = (await res.json()) as FetchedDrugInfo;
    return data.results?.[0] || null;
  } catch {
    return null;
  }
};
