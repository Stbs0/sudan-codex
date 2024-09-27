import React from "react";
import { Input } from "./ui/input";
import { useFormContext } from "react-hook-form";

const Strength = () => {
  const { register } = useFormContext();
  return (
    <div className='flex items-center'>
      <Input
        placeholder='mg'
        className='w-16  min-w-[60px] max-w-fit '
        {...register("strength.nominator")}
      />
      <span className='text-xl mx-2'>/</span>
      <Input
        className='w-16 min-w-[60px] max-w-fit '
        placeholder='ml'
        {...register("strength.denominator")}
      />
    </div>
  );
};

export default Strength;
