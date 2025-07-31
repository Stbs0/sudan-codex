import { Drug } from "@/types/types";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../ui/card";

type Props = {
  drug: Drug;
  ref: React.Ref<HTMLDivElement> | null;
};
export const ListItem = memo(({ drug, ref }: Props) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/drug-list/${drug.no}`);
  };
  return (
    <Card
      ref={ref}
      id='drugInfo-card'
      className=' w-full gap-2 rounded-none border-4 border-transparent border-l-indigo-700 bg-purple-100/50 py-2 *:hyphens-auto hover:bg-purple-100/90 md:mx-auto md:max-w-[600px] dark:bg-purple-800/50 dark:hover:bg-purple-800/90'
      onClick={handleCardClick}>
      <CardContent className='flex flex-col gap-2 text-sm sm:text-base'>
        <div className='flex gap-2'>
          <p
            id='drugInfo-card-brandName'
            className='font-bold text-gray-800 dark:text-gray-200'
            title={drug.brandName || "No Brand Name"}>
            {drug.brandName || "No Brand Name"}
          </p>
          <p
            title={drug.strength}
            id='drugInfo-card-strength'
            className='text-sm font-normal text-gray-700 dark:text-gray-300'>
            {drug.strength || "No Strength"}
          </p>
          <p
            title={drug.dosageFormName}
            id='drugInfo-card-dosageFormName'
            className='text-sm font-extralight text-gray-600 dark:text-gray-400'>
            {drug.dosageFormName || "No Dosage Form"}
          </p>
        </div>
        <div className='flex justify-between'>
          <p
            title={drug.genericName}
            id='drugInfo-card-genericName'
            className='font-bold text-green-600 dark:text-green-400'>
            {drug.genericName}
          </p>
          <p
            title={drug.packSize}
            id='drugInfo-card-packSize'
            className='font-bold text-red-600 dark:text-red-400'>
            {drug.packSize}
          </p>
        </div>
        <p
          title={drug.agentName}
          id='drugInfo-card-agentName'
          className='font-bold text-blue-600 dark:text-blue-400'>
          {drug.agentName}
        </p>
        <p
          title={drug.companyName}
          id='drugInfo-card-companyName'
          className='font-bold text-orange-600 dark:text-orange-400'>
          {drug.companyName}
        </p>
        <p
          title={drug.countryOfOrigin}
          id='drugInfo-card-countryOfOrigin'
          className='font-bold text-gray-800 dark:text-gray-200'>
          {drug.countryOfOrigin}
        </p>
      </CardContent>
    </Card>
  );
});
