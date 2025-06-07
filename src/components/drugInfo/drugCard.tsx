import { Drug } from "@/types/types";
import { CardTitle } from "../ui/card";
import DrugPropertyDescription from "./DrugPropertyDescription";

interface DrugCardProps {
  drug: Drug;
}

export function DrugCard({ drug }: DrugCardProps) {
  return (
    <CardTitle className='flex w-full flex-col gap-4'>
      <div className='w-full border-none shadow-none'>
        <div>
          <div className='p-2 text-xl font-bold'>{drug.brandName}</div>
        </div>
        <div className='px-2 pt-2'>
          <dl className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
            <DrugPropertyDescription
              title='Generic Name'
              property={drug.genericName}
            />
            <DrugPropertyDescription
              title='Dosage Form'
              property={drug.dosageFormName}
            />
            <DrugPropertyDescription
              title='Strength'
              property={drug.strength}
            />
            <DrugPropertyDescription
              title='Pack Size'
              property={drug.packSize}
            />
            <DrugPropertyDescription
              title='Company'
              property={drug.companyName}
            />
            <DrugPropertyDescription
              title='Country of Origin'
              property={drug.countryOfOrigin}
            />
            <DrugPropertyDescription
              title='Agent'
              property={drug.agentName}
            />
          </dl>
        </div>
      </div>
    </CardTitle>
  );
}
