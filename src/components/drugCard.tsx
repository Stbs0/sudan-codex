import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Drug } from "@/types/types";

interface DrugCardProps {
  drug: Drug;
}

export function DrugCard({ drug }: DrugCardProps) {
  return (
    <Card className='w-full border-none shadow-none'>
      <CardHeader>
        <CardTitle className='text-xl font-bold'>{drug.brandName}</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
          <div className='border-l-2 border-blue-400 p-2 '>
            <dt className='font-medium text-gray-500'>Generic Name</dt>
            <dd>{drug.genericName}</dd>
          </div>
          <div className='border-l-2 border-blue-400 p-2 '>
            <dt className='font-medium text-gray-500'>Dosage Form</dt>
            <dd>{drug.dosageFormName}</dd>
          </div>
          <div className='border-l-2 border-blue-400 p-2 '>
            <dt className='font-medium text-gray-500'>Strength</dt>
            <dd>{drug.strength}</dd>
          </div>
          <div className='border-l-2 border-blue-400 p-2 '>
            <dt className='font-medium text-gray-500'>Pack Size</dt>
            <dd>{drug.packSize}</dd>
          </div>
          <div className='border-l-2 border-blue-400 p-2 '>
            <dt className='font-medium text-gray-500'>Company</dt>
            <dd>{drug.companyName}</dd>
          </div>
          <div className='border-l-2 border-blue-400 p-2 '>
            <dt className='font-medium text-gray-500'>Country of Origin</dt>
            <dd>{drug.countryOfOrigin}</dd>
          </div>
          <div className='border-l-2 border-blue-400 p-2 '>
            <dt className='font-medium text-gray-500'>Agent</dt>
            <dd>{drug.agentName}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
