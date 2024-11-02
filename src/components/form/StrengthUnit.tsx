import AutoComplete from "../ui/autocomplete";
import { drugConcentrationUnits } from "@/constants";
import { Separator } from "../ui/separator";

type Props = {
  index: number;
  isDenominator: boolean;
};

const StrengthUnit = ({ index, isDenominator }: Props) => {
  return (
    <div className='space-y-2 w-20'>
      <AutoComplete
        options={drugConcentrationUnits}
        
      />
      {isDenominator && (
        <>
          <Separator className='bg-neutral-600' />
          <AutoComplete
            options={drugConcentrationUnits}
            name={`strength.${index}.denominatorUnit`}
          />
        </>
      )}
    </div>
  );
};

export default StrengthUnit;
