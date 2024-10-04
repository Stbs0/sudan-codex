import {
  SubmitHandler,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { Button } from "@/components/ui/button";

import DrugField from "@/components/form/DrugInput";

import { FormSchema } from "@/lib/schemas/newDrugSchema";
import { Label } from "@/components/ui/label";

import { Generics } from "@/types/types";
import GenericInput from "@/components/form/GenericInput";
import DosageFormInput from "@/components/form/DosageFormInput";
import InputField from "@/components/form/InputField";
import { Separator } from "@/components/ui/separator";
import Strength from "@/components/form/Strength";
import AutoComplete from "@/components/ui/autocomplete";
import { DRUG_PACKAGE_TYPES } from "@/constants";
import { createDrug } from "@/services/createDrug";

const DrugForm = () => {
  const { handleSubmit } = useFormContext<FormSchema>();

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

  const watchGenerics = useWatch({ name: "generics" });

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    await createDrug(data);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-5 shadow-lg p-5 bg-white dark:bg-c_light_cyan-900 my-4 rounded-md dark:text-black w-100 md:w-[600px]'>
        {/* Brand input */}
        <InputField>
          <Label htmlFor='brand'>
            Brand <span className='text-red-500'>*</span>
          </Label>
          <DrugField
            placeholder='Amocaln'
            name='brand'
          />
        </InputField>

        <Separator className='w-[80%] mx-auto' />

        {/* Generic input */}
        <InputField>
          <Label htmlFor='generic'>
            Generic<span className='text-red-500'>*</span>
          </Label>
          <GenericInput
            genericsFields={genericsFields}
            genericsFieldsAppend={genericsFieldsAppend}
            genericsFieldsRemove={genericsFieldsRemove}
            strengthFieldsAppend={strengthFieldsAppend}
            strengthFieldsRemove={strengthFieldsRemove}
          />
        </InputField>

        <Separator className='w-[80%] mx-auto' />

        {/* Dosage form input */}
        <InputField>
          <Label htmlFor='dosageForm'>
            Dosage Form<span className='text-red-500'>*</span>
          </Label>
          <DosageFormInput />
        </InputField>

        <Separator className='w-[80%] mx-auto' />

        {/* Strength input */}
        <InputField>
          <Label htmlFor='strength'>
            Strength<span className='text-red-500'>*</span>
          </Label>

          <Strength
            watchGenerics={watchGenerics}
            genericsFields={genericsFields}
          />
        </InputField>

        <Separator className='w-[80%] mx-auto' />

        {/* Manufacturer input */}
        <InputField>
          <Label htmlFor='manufacturer'>
            Manufacturer<span className='text-red-500'>*</span>
          </Label>
          <DrugField
            placeholder='Hikma'
            name='manufacturer'
          />
        </InputField>

        <Separator className='w-[80%] mx-auto' />

        <InputField>
          <Label htmlFor='packaging'>Packaging</Label>
          <AutoComplete
            name='packaging'
            options={DRUG_PACKAGE_TYPES}
          />
        </InputField>

        <Separator className='w-[80%] mx-auto' />

        {/* Agency input */}
        <InputField>
          <Label htmlFor='agency'>Agency</Label>
          <DrugField
            placeholder='Hikma'
            name='agency'
          />
        </InputField>

        <Separator className='w-[80%] mx-auto' />

        <InputField>
          <Label>Price</Label>
          <DrugField
            name='price'
            type='number'
            placeholder='5000'
          />
        </InputField>

        {/* Submit button */}
        <Button type='submit'>Submit</Button>
      </form>
    </>
  );
};
export default DrugForm;
