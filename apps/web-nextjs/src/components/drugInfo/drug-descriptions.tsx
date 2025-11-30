import { Drug } from "@/lib/types";
import { CardTitle } from "../ui/card";
import DrugPropertyDescription from "./DrugPropertyDescription";
import { paths } from "@/config/paths";
import { slugify } from "@/lib/utils";

interface DrugCardProps {
  drug: Drug;
}

export function DrugDescriptions({ drug }: DrugCardProps) {
  return (
    <CardTitle className='flex w-full flex-col gap-4'>
      <div className='w-full border-none shadow-none'>
        <div className='px-2 pt-2'>
          <dl className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
            <DrugPropertyDescription
              title='Generic Name'
              path={paths.stats.generic.getHref(slugify(drug.genericName))}
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
              path={paths.stats.company.getHref(slugify(drug.companyName))}
              property={drug.companyName}
            />
            <DrugPropertyDescription
              title='Country of Origin'
              property={drug.countryOfOrigin}
            />
            <DrugPropertyDescription
              title='Agent'
              path={paths.stats.agent.getHref(slugify(drug.agentName))}
              property={drug.agentName}
            />
          </dl>
        </div>
      </div>
    </CardTitle>
  );
}
