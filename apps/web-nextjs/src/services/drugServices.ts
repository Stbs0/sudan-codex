import { OPENFDA_SEARCH_URL } from "@/src/constants";
import { getOpenFdaSearchUrl, parseQuery } from "@/src/lib/utils";
import { Drug, FetchedDrugInfo } from "../lib/types";

export const getDrugInfo = async (
  genericName: string,
  route: string,
  refetch: boolean
) => {
  try {
    const parsedGenericName = parseQuery(genericName);

    const routeQuery = route ? `+AND+(openfda.route:"${route}")` : "";

    const url = refetch
      ? encodeURI(
          `${OPENFDA_SEARCH_URL}?search=(spl_product_data_elements:(*${parsedGenericName}*)${routeQuery})`
        )
      : getOpenFdaSearchUrl(parsedGenericName);
    const res = await fetch(url);
    const data = (await res.json()) as FetchedDrugInfo;

    return data.results?.[0];
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const fetchDrugList = async () => {
  const res = await fetch("/data/drugData.json");

  return (await res.json()) as Drug[];
};
