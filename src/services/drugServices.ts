import { OPENFDA_SEARCH_URL } from "@/constants";
import { getOpenFdaSearchUrl, parseQuery } from "@/lib/utils";
import { FetchedDrugInfo } from "@/types/types";
import axios from "axios";

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

    const { data } = await axios.get<FetchedDrugInfo>(url);

    return data.results[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};
