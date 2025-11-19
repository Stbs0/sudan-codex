"use client";

import Dexie from "dexie";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import drugDB from "../lib/indexedDB";
import { fetchDrugList } from "../services/drugServices";

const DrugInitializer = () => {
  const initializedRef = useRef(false);

  useEffect(() => {
    let ignore = false;
    const fn = async () => {
      if (ignore) return;
      if (initializedRef.current) return;
      initializedRef.current = true;
      try {
        if (!(await Dexie.exists("DrugIndex"))) {
          const drugList = await fetchDrugList();
          await drugDB.drugList.bulkAdd(drugList);
          return;
        }

        ignore = true;

        // TODO: add a retry mechanism
      } catch (error) {
        toast("There was an error fetching data");
      }
    };
    fn();
  }, []);
  return null;
};

export default DrugInitializer;
