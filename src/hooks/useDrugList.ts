import { getDrugs } from "@/services/drugServices";
import { FetchedDrugList } from "@/types/types";

import { useEffect, useState } from "react";

const useDrugList = () => {
  const [drugList, setDrugList] = useState<FetchedDrugList[]>([]);

  useEffect(() => {
    const fetchDrugs = async () => {
      const drugsQuerySnapshot = await getDrugs();
      console.log("first", drugsQuerySnapshot.size);
      const drugs = drugsQuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setDrugList(drugs);
    };

    fetchDrugs();
  }, []);

  return drugList;
};

export default useDrugList;
