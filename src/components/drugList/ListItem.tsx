import { Drug } from "@/types/types";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

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
      className='gap-2 rounded-none border-4 border-transparent border-l-indigo-700 bg-purple-100/50 py-2 hover:bg-purple-100/90 dark:bg-purple-800/50 dark:hover:bg-purple-800/90'
      onClick={handleCardClick}>
      <CardHeader>
        <CardTitle className='flex gap-1 text-sm uppercase'>
          <span
            id='drugInfo-card-brandName'
            className='ov font-bold'>
            {drug.brandName || "No Brand Name"}
          </span>{" "}
          <span
            id='drugInfo-card-strength'
            className='text-sm font-normal'>
            {drug.strength || "No Strength"}
          </span>{" "}
          <span
            id='drugInfo-card-dosageFormName'
            className='text-sm font-extralight text-gray-600 dark:text-gray-400'>
            {drug.dosageFormName || "No Dosage Form"}
          </span>{" "}
        </CardTitle>
      </CardHeader>

      <CardContent className='flex flex-col gap-1 text-sm'>
        <div className='flex justify-between'>
          <p
            id='drugInfo-card-genericName'
            className='font-bold text-green-600'>
            {drug.genericName}
          </p>
          <p
            id='drugInfo-card-packSize'
            className='font-bold text-red-600'>
            {drug.packSize}
          </p>
        </div>
        <p
          id='drugInfo-card-agentName'
          className='font-bold text-blue-600'>
          {drug.agentName}
        </p>
        <p
          id='drugInfo-card-companyName'
          className='font-bold text-orange-600'>
          {drug.companyName}
        </p>
        <p
          id='drugInfo-card-countryOfOrigin'
          className='font-bold'>
          {drug.countryOfOrigin}
        </p>
      </CardContent>
    </Card>
  );
});
