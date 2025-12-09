import { OPENFDA_SEARCH_URL } from "@/constants";
import { getOpenFdaSearchUrl, parseQuery } from "@/lib/utils";
import type { FetchedDrugInfo } from "@/types";
import axios from "axios";

export const getDrugInfo = async (
  genericName: string,
  route: string,
  refetch: boolean,
) => {
  try {
    const parsedGenericName = parseQuery(genericName);

    const routeQuery = route ? `+AND+(openfda.route:"${route}")` : "";

    const url = refetch
      ? encodeURI(
          `${OPENFDA_SEARCH_URL}?search=(spl_product_data_elements:(*${parsedGenericName}*)${routeQuery})`,
        )
      : getOpenFdaSearchUrl(parsedGenericName);
    if (__DEV__) console.log("[getDrugInfo] url:", url);
    const { data } = await axios.get<FetchedDrugInfo>(url);

    return data.results?.[0];
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const fetchDrugList = async () => {
  const { default: drugList } = await import("../assets/data/drugData.json");
  return drugList;
};
