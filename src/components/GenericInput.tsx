import Strength from "./Strength";
import {
  FieldValues,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from "react-hook-form";
import { Button } from "./ui/button";

interface Props {
  fields: Record<"id", string>[];
  append: UseFieldArrayAppend<FieldValues, "moreGenerics">;
  prepend: UseFieldArrayAppend<FieldValues, "moreGenerics">;
  remove: UseFieldArrayRemove;
}

const GenericInput = ({ fields, append,  remove }: Props) => {
  console.log(fields);
  return (
    <>
      {fields.map((field, index) => (
        <div
          className='flex items-center'
          key={field.id}>
          <div className='flex space-x-2 justify-start space-y-2'>
            <Strength index={index} />
            <Button
              onClick={() =>
                append({ number: 100, nominator: "", denominator: "" })
              }
              className='bg-blue-600 hover:bg-blue-700'>
              Add active ingredient
            </Button>

            {index !== 0 && (
              <Button
                variant={"destructive"}
                onClick={() => remove(index)}>
                Delete
              </Button>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default GenericInput;
