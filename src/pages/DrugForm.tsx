import { SubmitHandler, useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";

import DrugField from "@/components/DrugInput";
import { DevTool } from "@hookform/devtools";

import { FormSchema } from "@/lib/formSchema";
import { Label } from "@/components/ui/label";
import GenericInput from "@/components/GenericInput";
import { Input } from "@/components/ui/input";
import UnitSelect from "@/components/UnitSelect";
import AutoComplete from "@/components/ui/autocomplete";
import { dosageForms } from "@/constants";

const DrugForm = () => {
  const { handleSubmit, control } = useFormContext<FormSchema>();

  const {
    fields: genericsFields,
    append: genericsFieldsAppend,

    remove: genericsFieldsRemove,
  } = useFieldArray({
    name: "generics",
  });

  const {
    fields: strengthsFields,
    append: strengthFieldsAppend,
    remove: strengthFieldsRemove,
  } = useFieldArray({
    name: "strength",
  });
  console.log(genericsFields);
  const onSubmit: SubmitHandler<FormSchema> = (data) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-5 shadow-lg p-5 bg-white dark:bg-c_light_cyan-900 my-4 rounded-md dark:text-black w-100 md:w-[600px]'>
      <div className='border-l-2 border-neutral-500 px-2'>
        <Label htmlFor='brand'>Brand</Label>
        <DrugField
          placeholder='Amocaln'
          name='brand'
        />
      </div>

      <div className='border-l-2 border-neutral-500 px-2 flex flex-col'>
        <Label htmlFor='generic'>Generic</Label>
        {genericsFields.map((field, index) => (
          <div
            className='space-x-2 justify-start border border-neutral-500 px-2'
            key={field.id}>
            <div className='flex'>
              <Input
                placeholder='Amocaln'
                name='generics'
              />
              <Button
                onClick={() => {
                  genericsFieldsAppend({ generic: "" });
                  strengthFieldsAppend({
                    nominator: 0,
                    denominator: 0,
                    nominatorUnit: "mg",
                    denominatorUnit: "ml",
                  });
                }}
                className='bg-blue-600 hover:bg-blue-700'>
                Add active ingredient
              </Button>
              {index !== 0 && (
                <Button
                  variant={"destructive"}
                  onClick={() => {
                    genericsFieldsRemove(index);
                    strengthFieldsRemove(index);
                  }}
                  className='bg-blue-600 hover:bg-blue-700'>
                  remove
                </Button>
              )}
            </div>
            <div className=''>{/* <UnitSelect /> */}</div>
          </div>
        ))}
      </div>

      <div className=''>
        <Label htmlFor='manufacturer'>Manufacturer</Label>
        <DrugField
          placeholder='Hikma'
          name='manufacturer'
        />
      </div>
      <div>
        <Label htmlFor='dosageForm'>Dosage Form</Label>
       <AutoComplete options={dosageForms} />
      </div>

      <DevTool control={control} />
      {/* <div className=' '>
        <div className='flex space-x-2 justify-start'>
          <Input
            className='w-16 min-w-[60px] max-w-fit px-2 mr-3'
            placeholder='100'
            {...register("strength.number")}
          />
          <Strength />
        </div>
      </div> */}
      {/*
        <DrugSelect
          name='dosageForm'
        />
        <DrugSelect
          label='Type of Dosage Form'
          name='typeOfDosageForm'
          second
        />
        <div className='flex '>
          <DrugField
              label='Strength'
            placeholder='10'
            name='strength'
          />
          <DrugSelect
              label='Type of Dosage Form'
            name='typeOfDosageForm'
            second
          />
          <DrugSelect
            register={register}
            label='Type of Dosage Form'
            name='typeOfDosageForm'
            second
          />
        </div>
        <DrugField
          register={register}
          label='Brand'
          placeholder='exp: Amocaln'
          name='packaging'
        />
            */}
      <Button type='submit'>Submit</Button>
    </form>
  );
};
export default DrugForm;
