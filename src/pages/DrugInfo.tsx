import DrugInfoAccordion from "@/components/drugList/DrugInfoAccordion";
import SearchDrugInfo from "@/components/drugList/SearchDrugInfo";
import { queryClient } from "@/lib/queryQlient";

import { getDrugInfo } from "@/services/drugServices";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const DrugInfo = () => {
  const { state: drug } = useLocation();

  const [searchInputs, setSearchInputs] = useState({
    generic: drug.genericName,
    dosage: drug.dosageFormName,
    strength: drug.strength,
    brandName: drug.brandName,
    refetch: false,
  });

  console.log(searchInputs);

  const { data, isLoading } = useQuery({
    queryKey: ["drugInfo", drug.no],

    queryFn: async () => {
      return await getDrugInfo(
        searchInputs.generic,
        searchInputs.dosage,
        searchInputs.strength,
        searchInputs.brandName,
        searchInputs.refetch
      );
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    console.log(formData);
    const genericName = formData.get("genericName") as string;
    const dosageFormName = formData.get("dosageFormName") as string;
    const strength = formData.get("strength") as string;
    const brandName = formData.get("brandName") as string;
    const submittedData = {
      generic: genericName,
      dosage: dosageFormName,
      strength,
      brandName,
      refetch: true,
    };
    setSearchInputs(submittedData);
    // refetch();
    queryClient.removeQueries({ queryKey: ["drugInfo", drug.no] });
  };

  console.log(data);
  return (
    <div className='p-6 max-w-4xl mx-auto font-sans dark:invert'>
      <h1 className='text-2xl font-bold text-gray-800 mb-8'>
        Drug Information
      </h1>
      <div className='flex flex-col gap-4'>
        <SearchDrugInfo handleSubmit={handleSubmit} />
        <h2 className='text-xl font-bold text-gray-800 mb-8'>
          {drug.brandName} / {drug.genericName}/ {drug.dosageFormName}
        </h2>
      </div>
      {isLoading
        ? "Loading..."
        : data
          ? Object.keys(data).map((key) => (
              <DrugInfoAccordion
                key={key}
                title={key.replace(/_/g, " ")}
                content={data[key]}
              />
            ))
          : "No data found. Please search."}
    </div>
  );
};

export default DrugInfo;
