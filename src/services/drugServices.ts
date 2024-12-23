import api from "@/lib/api";
import { getOpenFdaSearchUrl } from "@/lib/utils";
import { FetchedDrugInfo } from "@/types/types";
import { AxiosError } from "axios";

export const getDrugInfo = async (
  genericName: string,
  dosageForm: string,
  strength: string
) => {
  try {
    const url = getOpenFdaSearchUrl(genericName, dosageForm, strength);
    const { data } = await api.get<FetchedDrugInfo>(url);
    console.log(data.results);
    return data.results[0];
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.status);
    }
    throw error;
  }
};
