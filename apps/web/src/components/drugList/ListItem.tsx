import type { Drug } from "@/types/types";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "../ui/badge";
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
      className='rounded-none border-4 border-transparent border-l-indigo-700 py-2 shadow-md hover:bg-purple-100/90 dark:bg-purple-800/50 dark:hover:bg-purple-800/90'
      onClick={handleCardClick}>
      <CardContent className='flex flex-col justify-center gap-2 px-3 text-sm sm:text-base'>
        <div className='flex items-end gap-2'>
          <p
            id='drugInfo-card-brandName'
            className='max-w-52 truncate text-lg font-bold text-gray-800 sm:max-w-72 dark:text-gray-200'
            title={drug.brandName || "No Brand Name"}>
            {drug.brandName || "No Brand Name"}
          </p>
          <Badge
            id='drugInfo-card-strength'
            title={drug.strength}
            className='block max-w-[100px] justify-start truncate sm:max-w-72'>
            {drug.strength || "No Strength"}
          </Badge>
        </div>
        <div className='flex gap-2'>
          <Badge
            id='drugInfo-card-dosageFormName'
            title={drug.dosageFormName}
            className='block max-w-36 justify-start truncate bg-blue-500 sm:max-w-72'>
            {drug.dosageFormName || "No Dosage Form"}
          </Badge>
          <Badge
            id='drugInfo-card-packSize'
            title={drug.packSize}
            className='block max-w-36 justify-start truncate text-left sm:max-w-72'
            variant={"destructive"}>
            {drug.packSize}
          </Badge>
        </div>
        <p
          title={drug.genericName}
          id='drugInfo-card-genericName'
          className='max-w-60 truncate font-bold text-green-600 dark:text-green-400'>
          {drug.genericName}
        </p>
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
