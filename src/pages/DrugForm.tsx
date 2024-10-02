import {
  SubmitHandler,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { Button } from "@/components/ui/button";

import DrugField from "@/components/DrugInput";
import { DevTool } from "@hookform/devtools";

import { FormSchema } from "@/lib/formSchema";
import { Label } from "@/components/ui/label";
import AutoComplete from "@/components/ui/autocomplete";
import { drugConcentrationUnits } from "@/constants";
import { Generics } from "@/types/types";
import GenericInput from "@/components/GenericInput";
import DosageFormInput from "@/components/DosageFormInput";
import InputField from "@/components/InputField";
import { Separator } from "@/components/ui/separator";

const DrugForm = () => {
  const { handleSubmit, control } = useFormContext<FormSchema>();

  const {
    fields: genericsFields,
    append: genericsFieldsAppend,

    remove: genericsFieldsRemove,
  } = useFieldArray<Generics>({
    name: "generics",
  });

  const {
    // fields: strengthsFields,
    append: strengthFieldsAppend,
    remove: strengthFieldsRemove,
  } = useFieldArray({
    name: "strength",
  });

  const v = useWatch({ name: "generics" });

  const onSubmit: SubmitHandler<FormSchema> = (data) => console.log(data);
  console.log("ddd", v);
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-5 shadow-lg p-5 bg-white dark:bg-c_light_cyan-900 my-4 rounded-md dark:text-black w-100 md:w-[600px]'>
        <InputField>
          <Label htmlFor='brand'>Brand</Label>
          <DrugField
            placeholder='Amocaln'
            name='brand'
          />
        </InputField>
        <Separator className='w-[80%] mx-auto' />
        <InputField>
          <Label htmlFor='generic'>Generic</Label>
          <GenericInput
            genericsFields={genericsFields}
            genericsFieldsAppend={genericsFieldsAppend}
            genericsFieldsRemove={genericsFieldsRemove}
            strengthFieldsAppend={strengthFieldsAppend}
            strengthFieldsRemove={strengthFieldsRemove}
          />
        </InputField>
        <Separator className='w-[80%] mx-auto' />
        <InputField>
          <Label htmlFor='dosageForm'>Dosage Form</Label>
          <DosageFormInput />
        </InputField>
        <Separator className='w-[80%] mx-auto' />
        <InputField>
          <Label htmlFor='strength'>Strength</Label>
          {genericsFields.map((field, index) => (
            <div
              key={field.id}
              className='flex  px-2 my-2 '>
              <h1>{v[index]?.generic}</h1>
              <AutoComplete
                options={drugConcentrationUnits}
                name={`strength.${index}.nominatorUnit`}
              />
            </div>
          ))}
        </InputField>
        <Separator className='w-[80%] mx-auto' />

        <InputField>
          <Label htmlFor='manufacturer'>Manufacturer</Label>
          <DrugField
            placeholder='Hikma'
            name='manufacturer'
          />
        </InputField>

        <Button type='submit'>Submit</Button>
      </form>
      <DevTool control={control} />
    </>
  );
};
export default DrugForm;
