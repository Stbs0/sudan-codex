import SearchDrugInfo from "@/components/SearchDrugInfo";

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
  });

  console.log(searchInputs);

  const { data, isLoading } = useQuery({
    queryKey: ["drugInfo", searchInputs],

    queryFn: async () => {
      return await getDrugInfo(
        searchInputs.generic,
        searchInputs.dosage,
        searchInputs.strength
      );
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const genericName = formData.get("genericName") as string;
    const dosageFormName = formData.get("dosageFormName") as string;
    const strength = formData.get("strength") as string;

    setSearchInputs({ generic: genericName, dosage: dosageFormName, strength });
  };

  if (isLoading || !data) return <div>Loading...</div>;
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

      <section className='mb-8'>
        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          Indications and Usage
        </h2>
        {data.indications_and_usage &&
          data.indications_and_usage.map((text, index) => (
            <p
              key={index}
              className='text-gray-600 mb-2'>
              {text}
            </p>
          ))}
      </section>

      <section className='mb-8'>
        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          Dosage and Administration
        </h2>
        {data.dosage_and_administration &&
          data.dosage_and_administration.map((text, index) => (
            <p
              key={index}
              className='text-gray-600 mb-2'>
              {text}
            </p>
          ))}
        {data.dosage_and_administration_table &&
          data.dosage_and_administration_table.map((html, index) => (
            <div
              key={index}
              className='mt-4 overflow-x-auto'
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ))}
      </section>

      <section className='mb-8'>
        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          Dosage Forms and Strengths
        </h2>
        {data.dosage_forms_and_strengths &&
          data.dosage_forms_and_strengths.map((text, index) => (
            <p
              key={index}
              className='text-gray-600 mb-2'>
              {text}
            </p>
          ))}
      </section>

      <section className='mb-8'>
        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          Contraindications
        </h2>
        {data.contraindications &&
          data.contraindications.map((text, index) => (
            <p
              key={index}
              className='text-gray-600 mb-2'>
              {text}
            </p>
          ))}
      </section>

      <section className='mb-8'>
        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          Warnings and Cautions
        </h2>
        {data.warnings_and_cautions &&
          data.warnings_and_cautions.map((text, index) => (
            <p
              key={index}
              className='text-gray-600 mb-2'>
              {text}
            </p>
          ))}
      </section>

      <section className='mb-8'>
        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          Adverse Reactions
        </h2>
        {data.adverse_reactions &&
          data.adverse_reactions.map((text, index) => (
            <p
              key={index}
              className='text-gray-600 mb-2'>
              {text}
            </p>
          ))}
        {data.adverse_reactions_table &&
          data.adverse_reactions_table.map((html, index) => (
            <div
              key={index}
              className='mt-4 overflow-x-auto'
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ))}
      </section>

      <section className='mb-8'>
        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          Drug Interactions
        </h2>
        {data.drug_interactions &&
          data.drug_interactions.map((text, index) => (
            <p
              key={index}
              className='text-gray-600 mb-2'>
              {text}
            </p>
          ))}
      </section>

      <section className='mb-8'>
        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          Use in Specific Populations
        </h2>
        {data.use_in_specific_populations &&
          data.use_in_specific_populations.map((text, index) => (
            <p
              key={index}
              className='text-gray-600 mb-2'>
              {text}
            </p>
          ))}
        {data.use_in_specific_populations_table &&
          data.use_in_specific_populations_table.map((html, index) => (
            <div
              key={index}
              className='mt-4 overflow-x-auto'
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ))}
      </section>
    </div>
  );
};

export default DrugInfo;
