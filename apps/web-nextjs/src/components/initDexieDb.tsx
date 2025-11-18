// components/DrugInitializer.js
"use client"; // This directive is essential

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
        const isExists = await drugDB.isExists();

        if (!isExists) {
          const drugList = await fetchDrugList();
          await drugDB.populate(drugList);
          ignore = true;
        }

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
