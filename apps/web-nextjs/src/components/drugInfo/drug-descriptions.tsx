import { GetDrugBySlugReturnType } from "@/services/server/getDrugs";

import { CardTitle } from "../ui/card";

import DrugPropertyDescription from "./DrugPropertyDescription";

interface DrugCardProps {
  drug: GetDrugBySlugReturnType;
}

export function DrugDescriptions({ drug }: DrugCardProps) {
  return (
    <CardTitle className='flex w-full flex-col gap-4'>
      <div className='w-full border-none shadow-none'>
        <div className='px-2 pt-2'>
          <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
            <DrugPropertyDescription
              title='Generic Name'
              path={"/generics/" + drug.generic?.slug}
              property={drug.generic_name}
              data-test='generic_name_property'
              data-analytics='generic_name_property'
            />
            <DrugPropertyDescription
              title='Dosage Form'
              data-test='dosage_form_property'
              property={drug.dosage_form}
            />
            <DrugPropertyDescription
              title='Strength'
              data-test='strength_property'
              property={drug.strength}
            />
            <DrugPropertyDescription
              title='Pack Size'
              data-test='pack_size_property'
              property={drug.pack_size}
            />
            <DrugPropertyDescription
              title='Company'
              data-test='company_property'
              data-analytics='company_property'
              path={"/companies/" + drug.company?.slug}
              property={drug.company_name}
            />
            <DrugPropertyDescription
              title='Country of Origin'
              data-test='country_of_origin_property'
              property={drug.country_name}
            />
            <DrugPropertyDescription
              title='Agent'
              data-test='agent_property'
              data-analytics='agent_property'
              path={"/agents/" + drug.agent?.slug}
              property={drug.agent_name}
            />
          </div>
        </div>
      </div>
    </CardTitle>
  );
}
