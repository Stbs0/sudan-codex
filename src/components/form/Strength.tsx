import { FormSchema } from "@/lib/schemas/newDrugSchema";
import { FieldArrayWithId } from "react-hook-form";

import { WatchGenerics } from "@/types/types";

import { useState } from "react";
import StrengthCheckBox from "./StrengthCheckBox";
import StrengthNumber from "./StrengthNumber";
import StrengthUnit from "./StrengthUnit";

type StrengthProps = {
  genericsFields: FieldArrayWithId<FormSchema, "generics", "id">[];
  watchGenerics: WatchGenerics;
};
const Strength = ({ genericsFields, watchGenerics }: StrengthProps) => {
  const [isDenominator, setIsDenominator] = useState(true);
  return (
    <>
      {genericsFields.map((field, index) => (
        <div
          key={field.id}
          className='flex flex-col space-y-2 px-2 my-2 '>
          <div className='flex space-x-3 '>
            <div className='min-w-10 flex flex-col justify-center '>
              <p className=''>{watchGenerics[index]?.generic}</p>
              <StrengthCheckBox
                setIsDenominator={setIsDenominator}
                IsDenominator={isDenominator}
              />
            </div>
            <div className='flex space-x-3'>
              <StrengthNumber
                index={index}
                isDenominator={isDenominator}
              />
              <StrengthUnit
                index={index}
                isDenominator={isDenominator}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Strength;
