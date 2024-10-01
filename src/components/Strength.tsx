import React from "react";
import { Input } from "./ui/input";
import { useFormContext } from "react-hook-form";

const Strength = ({ index }: { index: number }) => {
  const { register } = useFormContext();
  return (
    <div className='flex items-center'>
      <Input
        type='number'
        className=' border-slate-500 w-16 min-w-[60px] max-w-fit px-2 mr-3 '
        placeholder='100'
        {...register(`moreGenerics.${index}.number`, {
          valueAsNumber: true,
        })}
      />
      {/* <GroupSelect /> */}
      <span className='text-xl mx-2'>/</span>
      <Input
        className='w-16 min-w-[60px] max-w-fit border-slate-500  '
        placeholder='ml'
        {...register(`strength.${index}.denominator`)}
      />
    </div>
  );
};

export default Strength;
