import { OPENFDA_SEARCH_URL } from "@/constants";
import api from "@/lib/api";
import { getOpenFdaSearchUrl, parseQuery } from "@/lib/utils";
import { FetchedDrugInfo } from "@/types/types";

export const getDrugInfo = async (
  genericName: string,
  route: string,
  refetch: boolean
) => {
  try {
    const parsedGenericName = parseQuery(genericName);

    const routeQuery = route ? `+AND+(openfda.route:"${route}")` : "";

    console.log(refetch);
    const url = refetch
      ? encodeURI(
          `${OPENFDA_SEARCH_URL}?search=(spl_product_data_elements:(*${parsedGenericName}*)${routeQuery})`
        )
      : getOpenFdaSearchUrl(parsedGenericName);

    const { data } = await api.get<FetchedDrugInfo>(url);

    console.log(data.results);

    return data.results[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};
