import { Drug } from "@/types/types";
import { ChevronRight } from "lucide-react";
import { memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import ListDescription from "./ListDescription";

type Props = {
  drug: Drug;
};
export const ListItem = memo(({ drug }: Props) => {
  const MemoizedChevronRight = useMemo(() => <ChevronRight />, []);
  const navigate = useNavigate();
  return (
    <Card
      className='rounded-none border-4 border-transparent border-l-indigo-700 bg-purple-100/50 hover:bg-purple-100/90 dark:bg-purple-800/50 dark:hover:bg-purple-800/90'
      onClick={() => {
        navigate(`/drug-list/${drug.no}`);
      }}>
      <CardHeader>
        <CardTitle className='uppercase'>
          <span className='font-bold'>{drug.brandName}</span>
          <span className='ml-2 text-sm font-normal'>{drug.strength}</span>
          <span className='ml-1 text-sm font-normal'>
            {drug.dosageFormName}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className='flex'>
        <div className='flex-1'>
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
        <div className='flex items-center'>
          <Button>{MemoizedChevronRight}</Button>
        </div>
      </CardContent>
    </Card>
  );
});
