import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

type Props = {
  setIsDenominator: React.Dispatch<React.SetStateAction<boolean>>;
  IsDenominator: boolean;
};

const StrengthRadio = ({ setIsDenominator, IsDenominator }: Props) => {
  return (
    <RadioGroup
      defaultValue='Have One Unit'
      onValueChange={(_value) => setIsDenominator(!IsDenominator)}>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem
          value='Have One Unit'
          id='Have One Unit'
        />
        <Label htmlFor='Have One Unit'>Have One Unit</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem
          value='Have Two Unit'
          id='have-two-unit'
        />
        <Label htmlFor='have-two-unit'>Have Two Unit</Label>
      </div>
    </RadioGroup>
  );
};

export default StrengthRadio;
