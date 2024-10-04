import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

import { useFormContext } from "react-hook-form";
import { FormSchema } from "@/lib/schemas/newDrugSchema";

type Props = {
  index: number;
  isDenominator: boolean;
};

const StrengthNumber = ({ index, isDenominator }: Props) => {
  const { register } = useFormContext<FormSchema>();
  return (
    <div className='space-y-2 '>
      <Input
        type='number'
        className=' [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  min-w-6 max-w-20'
        {...register(`strength.${index}.nominator`, {
          valueAsNumber: true,
        })}
      />
      {isDenominator && (
        <>
          <Separator className='bg-neutral-600' />
          <Input
            type='number'
            className=' [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none min-w-6 max-w-20'
            {...register(`strength.${index}.denominator`, {
              valueAsNumber: true,
            })}
          />
        </>
      )}
    </div>
  );
};

export default StrengthNumber;
