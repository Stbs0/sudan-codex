import { FormSchema } from "@/lib/formSchema";
import { FieldArrayWithId, useFormContext } from "react-hook-form";

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
  const { register } = useFormContext<FormSchema>();

  const [isDenominator, setIsDenominator] = useState(true);
  return (
    <>
      {genericsFields.map((field, index) => (
        <div
          key={field.id}
          className='flex flex-col  px-2 my-2 '>
          <div className='flex space-x-2'>
            <p className='min-w-[100px] min-h-6'>
              {watchGenerics[index]?.generic}
            </p>
            <StrengthCheckBox
              setIsDenominator={setIsDenominator}
              IsDenominator={isDenominator}
            />
          </div>
          <div className='flex space-x-2'>
            <StrengthNumber
              index={index}
              isDenominator={isDenominator}
            />
            <StrengthUnit index={index} isDenominator={isDenominator} />
          </div>
        </div>
      ))}
    </>
  );
};

export default Strength;
