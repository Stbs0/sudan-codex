import { DrugWithRelations } from "@/services/server/getDrugs";
import { CardTitle } from "../ui/card";
import DrugPropertyDescription from "./DrugPropertyDescription";

interface DrugCardProps {
  drug: DrugWithRelations;
}

export function DrugDescriptions({ drug }: DrugCardProps) {
  return (
    <CardTitle className='flex w-full flex-col gap-4'>
      <div className='w-full border-none shadow-none'>
        <div className='px-2 pt-2'>
          <dl className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
            <DrugPropertyDescription
              title='Generic Name'
              path={"/stats/generic/" + drug.generic?.slug}
              property={drug.generic_name}
            />
            <DrugPropertyDescription
              title='Dosage Form'
              property={drug.dosage_form}
            />
            <DrugPropertyDescription
              title='Strength'
              property={drug.strength}
            />
            <DrugPropertyDescription
              title='Pack Size'
              property={drug.pack_size}
            />
            <DrugPropertyDescription
              title='Company'
              path={"/stats/company/" + drug.company?.slug}
              property={drug.company_name}
            />
            <DrugPropertyDescription
              title='Country of Origin'
              property={drug.country_name}
            />
            <DrugPropertyDescription
              title='Agent'
              path={"/stats/agent/" + drug.agent?.slug}
              property={drug.agent_name}
            />
          </dl>
        </div>
      </div>
    </CardTitle>
  );
}
