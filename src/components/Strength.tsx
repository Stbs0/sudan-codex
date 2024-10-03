import { FormSchema } from "@/lib/formSchema";
import { Input } from "./ui/input";
import { FieldArrayWithId, useFormContext } from "react-hook-form";
import AutoComplete from "./ui/autocomplete";
import { drugConcentrationUnits } from "@/constants";
import { Generics, WatchGenerics } from "@/types/types";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import StrengthRadio from "./StrengthRadio";
import { useState } from "react";

type StrengthProps = {
  genericsFields: FieldArrayWithId<FormSchema, "generics", "id">[];
  watchGenerics: WatchGenerics;
};
const Strength = ({ genericsFields, watchGenerics }: StrengthProps) => {
  const {
    formState: { errors },
  } = useFormContext<FormSchema>();

  const [isDenominator, setIsDenominator] = useState(true);
  return (
    <>
      {genericsFields.map((field, index) => (
        <div
          key={field.id}
          className='flex  px-2 my-2 '>
          <h1>{watchGenerics[index]?.generic}</h1>
          <StrengthRadio
            setIsDenominator={setIsDenominator}
            IsDenominator={isDenominator}
          />

          <AutoComplete
            options={drugConcentrationUnits}
            name={`strength.${index}.nominatorUnit`}
          />
          {isDenominator && (
            <div className="flex">
              <span>/</span>
              <AutoComplete
                options={drugConcentrationUnits}
                name={`strength.${index}.denominatorUnit`}
              />
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default Strength;
