import { Concentration } from "./Concentration";

import { useWatch } from "react-hook-form";

import { FormDescription, FormLabel } from "../ui/form";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Generics } from "@/types/types";

const Strength = () => {
  const [hasDenominator, setHasDenominator] = useState(false);

  const generics = useWatch<Generics>({ name: "generics" });
  const strengths = useWatch({ name: "strength" });

  return (
    <div className='border-l-2 border-neutral-500 px-2'>
      <div className='flex justify-between'>
        <FormLabel>Strength</FormLabel>
        <span className='text-sm italic font-thin'>
          <Checkbox
            onCheckedChange={(checked) =>
              setHasDenominator(checked ? true : false)
            }
          />
          <span>Have a Denominator</span>
        </span>
      </div>
      {Array.isArray(generics) &&
        generics?.map((_item, index) => (
          <div
            key={index}
            className='flex space-x-3'>
            <div className='flex justify-center items-center'>
              <FormLabel>
                {generics[index]?.generic} {strengths?.[index]?.nominator}{" "}
                {strengths?.[index]?.nominatorUnit}{" "}
                {!hasDenominator && (
                  <>
                    / {strengths?.[index]?.denominator}{" "}
                    {strengths?.[index]?.denominatorUnit}
                  </>
                )}
              </FormLabel>
            </div>

            <div className='flex flex-col'>
              <Concentration
                hasDenominator={hasDenominator}
                placeholder='50'
                name={`strength.${index}.nominator`}
                unitName={`strength.${index}.nominatorUnit`}
              />
              {!hasDenominator && (
                <Concentration
                  denominator
                  placeholder='5'
                  name={`strength.${index}.denominator`}
                  unitName={`strength.${index}.denominatorUnit`}
                />
              )}
            </div>
          </div>
        ))}
      <FormDescription>Add the amount of drug</FormDescription>
    </div>
  );
};

export default Strength;
