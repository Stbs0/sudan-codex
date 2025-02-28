import { Drug } from "@/types/types";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardTitle } from "../ui/card";
// import { useNavigate } from "react-router-dom";
const listItems = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};
type Props = {
  drug: Drug;
};
export const ListItem = memo(({ drug }: Props) => {
  const navigate = useNavigate();
  const CardMotion = motion.create(Card);
  const MemoizedChevronRight = useMemo(() => <ChevronRight />, []);
  console.count();
  return (
    <CardMotion
      variants={listItems}
      className='rounded-none border-4 border-transparent border-l-indigo-700 bg-purple-100/50 hover:bg-purple-100/90 dark:bg-purple-800/50 dark:hover:bg-purple-800/90'
      onClick={() => {
        navigate(`/drug-list/${drug.no}`);
      }}>
      <CardTitle className='py-2 pl-6 pt-4 uppercase'>
        <span className='font-bold'>{drug.brandName}</span>
        <span className='ml-2 text-sm font-normal'>{drug.strength}</span>

        <span className='ml-1 text-sm font-normal'>{drug.dosageFormName}</span>
      </CardTitle>

      <CardContent className='flex pb-2'>
        <div className='flex-1'>
          <div className='text-xs'>
            <span className='font-semibold'>Generic: </span>
            <span className='text-gray-600 dark:text-gray-300'>
              {" "}
              {drug.genericName}
            </span>
          </div>
          <div className='text-xs'>
            <span className='font-semibold'>Company: </span>
            <span className='text-gray-600 dark:text-gray-300'>
              {drug.companyName}
            </span>
          </div>
          <div className='text-xs'>
            <span className='font-semibold'>Agency: </span>
            <span className='text-gray-600 dark:text-gray-300'>
              {drug.agentName}
            </span>
          </div>
        </div>
        <div className='flex items-center'>
          <Button>{MemoizedChevronRight}</Button>
        </div>
      </CardContent>
    </CardMotion>
  );
});
