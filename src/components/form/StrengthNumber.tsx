import { Input } from "../ui/input";

import { FormControl, FormField } from "../ui/form";
import AutoComplete from "../ui/autocomplete";

type Props = {
  index: number;
  isDenominator: boolean;
};

const StrengthNumber = ({ index, isDenominator }: Props) => {
  return (
    <div className='space-y-2 '>
      <FormField
        name={`strength.${index}.nominator`}
        render={({ field }) => (
          <FormControl>
            <Input
              type='number'
              {...field}
            />
            <AutoComplete onChange={} />
          </FormControl>
        )}
      />
      {/* <Input
        type='number'
        className=' [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  min-w-6 max-w-20'
        {...register(`strength.${index}.nominator`, {
          valueAsNumber: true,
        })}
      /> */}
      {isDenominator && (
        <FormField
          name={`strength.${index}.denominator`}
          render={({ field }) => (
            <Input
              type='number'
              {...field}
            />
          )}
        />
      )}
    </div>
  );
};

export default StrengthNumber;
