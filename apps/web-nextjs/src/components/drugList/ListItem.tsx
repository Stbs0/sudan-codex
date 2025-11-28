import type { Drug } from "@/lib/types";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

type Props = {
  drug: Drug;
  isFirst?: boolean;
};
export const ListItem = ({ drug, isFirst }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const handleCardClick = () => {
    queryClient.setQueryData(["drug", drug.no], () => [drug]);
    router.push(`/drug-list/${drug.no}`);
  };
  return (
    <Card
      id={isFirst ? "drugInfo-card" : undefined}
      className='rounded-none border-4 border-transparent border-l-indigo-700 py-2 shadow-md hover:bg-purple-100/90 dark:bg-purple-800/50 dark:hover:bg-purple-800/90'
      onClick={handleCardClick}>
      <CardContent className='flex flex-col justify-center gap-2 px-3 text-sm sm:text-base'>
        <div className='flex items-end gap-2'>
          <p
            id={isFirst ? "drugInfo-card-brandName" : undefined}
            className='max-w-52 truncate text-lg font-bold text-gray-800 sm:max-w-72 dark:text-gray-200'
            title={drug.brandName || "No Brand Name"}>
            {drug.brandName || "No Brand Name"}
          </p>
          <Badge
            id={isFirst ? "drugInfo-card-strength" : undefined}
            title={drug.strength}
            className='block max-w-[100px] justify-start truncate sm:max-w-72'>
            {drug.strength || "No Strength"}
          </Badge>
        </div>
        <div className='flex gap-2'>
          <Badge
            id={isFirst ? "drugInfo-card-dosageFormName" : undefined}
            title={drug.dosageFormName}
            className='block max-w-36 justify-start truncate bg-blue-500 sm:max-w-72'>
            {drug.dosageFormName || "No Dosage Form"}
          </Badge>
          <Badge
            id={isFirst ? "drugInfo-card-packSize" : undefined}
            title={drug.packSize}
            className='block max-w-36 justify-start truncate text-left sm:max-w-72'
            variant={"destructive"}>
            {drug.packSize}
          </Badge>
        </div>
        <div className='flex max-w-60 justify-start truncate font-bold text-green-600 dark:text-green-400'>
          <p
            title={drug.genericName}
            id={isFirst ? "drugInfo-card-genericName" : undefined}>
            {drug.genericName}
          </p>
        </div>
        <div className='flex justify-start font-bold text-blue-600 dark:text-blue-400'>
          <p
            title={drug.agentName}
            id={isFirst ? "drugInfo-card-agentName" : undefined}>
            {drug.agentName}
          </p>
        </div>
        <div className='flex justify-start font-bold text-orange-600 dark:text-orange-400'>
          <p
            className='text-start'
            title={drug.companyName}
            id={isFirst ? "drugInfo-card-companyName" : undefined}>
            {drug.companyName}
          </p>
        </div>
        <div className='flex justify-start font-bold text-gray-800 dark:text-gray-200'>
          <p
            className='text-start'
            title={drug.countryOfOrigin}
            id={isFirst ? "drugInfo-card-countryOfOrigin" : undefined}>
            {drug.countryOfOrigin}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
