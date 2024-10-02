import {
  FieldArrayWithId,
  FieldValues,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  useFormContext,
} from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Generics } from "@/types/types";

interface Props {
  genericsFieldsAppend: UseFieldArrayAppend<Generics, "generics">;
  genericsFieldsRemove: UseFieldArrayRemove;
  strengthFieldsAppend: UseFieldArrayAppend<FieldValues, "strength">;
  strengthFieldsRemove: UseFieldArrayRemove;
  genericsFields: FieldArrayWithId<Generics, "generics", "id">[];
}

const GenericInput = ({
  genericsFieldsAppend,
  strengthFieldsAppend,
  genericsFieldsRemove,
  strengthFieldsRemove,
  genericsFields,
}: Props) => {
  const { register } = useFormContext();

  return (
    <>
      {genericsFields.map((field, index) => (
        <div
          className=' px-2 my-2 '
          key={field.id}>
          <div className='flex space-x-8 '>
            <Input
              placeholder='Amocaln'
              className='border-slate-500 w-40 mr-8'
              {...register(`generics.${index}.generic` as const)}
            />
            <div className='space-x-2'>
              <Button
                className='max-w-fit bg-blue-600 hover:bg-blue-700'
                onClick={() => {
                  genericsFieldsAppend({ generic: "" });
                  strengthFieldsAppend({
                    nominator: 0,
                    denominator: 0,
                    nominatorUnit: "mg",
                    denominatorUnit: "ml",
                  });
                }}>
                Add active ingredient
              </Button>
              {index !== 0 && (
                <Button
                  variant={"destructive"}
                  onClick={() => {
                    genericsFieldsRemove(index);
                    strengthFieldsRemove(index);
                  }}>
                  remove
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default GenericInput;
