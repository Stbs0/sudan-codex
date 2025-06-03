import { Drug } from "@/types/types";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import ListDescription from "./ListDescription";

type Props = {
  drug: Drug;
};
export const ListItem = memo(({ drug }: Props) => {
  const navigate = useNavigate();
  return (
    <Card
      className='gap-2 rounded-none border-4 border-transparent border-l-indigo-700 bg-purple-100/50 hover:bg-purple-100/90 dark:bg-purple-800/50 dark:hover:bg-purple-800/90'
      onClick={() => {
        navigate(`/drug-list/${drug.no}`);
      }}>
      <CardHeader>
        <CardTitle className='uppercase'>
          <span className='font-bold'>{drug.brandName}</span>
          <span className='ml-2 text-sm font-normal'>
            {drug.strength.trim()}
          </span>
          <span className='ml-1 text-sm font-extralight text-gray-600 dark:text-gray-400'>
            {drug.dosageFormName}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className='flex'>
        <div className='flex flex-col'>
          <ListDescription
            title='Generic'
            text={drug.genericName}
          />
          <ListDescription
            title='Agency'
            text={drug.agentName}
          />
          <ListDescription
            title='Company'
            text={drug.companyName}
          />
        </div>
        <div className='ml-auto flex flex-col'>
          <ListDescription
            title='Pack size'
            text={drug.packSize}
          />
          <ListDescription
            title='Country'
            text={drug.countryOfOrigin}
          />
        </div>
      </CardContent>
    </Card>
  );
});
