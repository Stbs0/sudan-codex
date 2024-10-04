import {
  FieldArrayWithId,
  FieldValues,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  useFormContext,
} from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Generics } from "@/types/types";
import { FormSchema } from "@/lib/schemas/newDrugSchema";

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
  const {
    register,
    formState: { errors },
  } = useFormContext<FormSchema>();

  return (
    <>
      {genericsFields.map((field, index) => (
        <div
          className=' px-2  '
          key={field.id}>
          <div className='flex justify-around  '>
            <div>
              <Input
                placeholder='Amocaln'
                className='border-slate-500 w-40 mr-8'
                {...register(`generics.${index}.generic` as const)}
              />
              {errors.generics?.[index]?.generic && (
                <span className='text-sm text-red-600'>
                  {errors.generics?.[index]?.generic?.message?.toString()}
                </span>
              )}
            </div>
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
                Add more
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
