// components/DrugInitializer.js
"use client"; // This directive is essential

import { useEffect } from "react";
import drugDB from "../lib/indexedDB";
import { fetchDrugList } from "../services/drugServices";

const DrugInitializer = () => {
  useEffect(() => {
    let ignore = false;
    const fn = async () => {
      if (ignore) return;
      const isExists = await drugDB.isExists();
      if (isExists === false) {
        const drugList = await fetchDrugList();
        await drugDB.populate(drugList);
        ignore = true;
        // You might also want to trigger a re-fetch or state update here
      }
    };
    fn().catch(console.error);
  }, []);

  return null; // This component doesn't render anything
};

export default DrugInitializer;
