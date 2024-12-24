import { Card, CardContent, CardTitle } from "../ui/card";
import { Drug } from "@/types/types";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

type Props = {
  drug: Drug;
};
export const ListItem = ({ drug }: Props) => {
  const navigate = useNavigate();
  return (
    <Card
      className=' bg-purple-100/50  hover:bg-purple-100/90 dark:bg-purple-800/50 dark:hover:bg-purple-800/90 border-4 rounded-none border-transparent border-l-indigo-700  '
      // TODO waiting to get an api for drug information

      onClick={() => {
        navigate(`/drug-list/${drug.no}`, {
          state: drug,
        });
      }}>
      <CardTitle className='pt-4 py-2  pl-6 uppercase'>
        <span className='font-bold '>{drug.brandName}</span>
        <span className='ml-2 font-normal text-sm'>{drug.strength}</span>

        <span className='ml-1 font-normal text-sm'>{drug.dosageFormName}</span>
      </CardTitle>

      <CardContent className=' pb-2  flex'>
        <div className='flex-1'>
          <div className='text-xs'>
            <span className='font-semibold '>Generic: </span>
            <span className='text-gray-600'> {drug.genericName}</span>
          </div>
          <div className='text-xs'>
            <span className='font-semibold'>Company: </span>
            <span className='text-gray-600'>{drug.companyName}</span>
          </div>
          <div className='text-xs'>
            <span className='font-semibold'>Agency: </span>
            <span className='text-gray-600'>{drug.agentName}</span>
          </div>
        </div>
        <div className='flex items-center'>
          <Button>
            <ChevronRight />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
