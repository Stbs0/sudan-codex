import React from "react";

import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

type Props = {
  setIsDenominator: React.Dispatch<React.SetStateAction<boolean>>;
  IsDenominator: boolean;
};

const StrengthCheckBox = ({ setIsDenominator, IsDenominator }: Props) => {
  return (
    <div className='flex space-x-2 items-center'>
      <Checkbox
        onClick={() => setIsDenominator(!IsDenominator)}
        id='denominator'
      />

      <Label
        htmlFor='denominator'
        className='text-xs '>
        Have One Unit
      </Label>
    </div>
  );
};

export default StrengthCheckBox;
