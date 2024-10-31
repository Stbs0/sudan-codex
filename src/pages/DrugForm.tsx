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
import { packagingTypes } from "@/constants";
import { saveDrug } from "@/services/drugServices";
import { useState } from "react";
import SpinnerOverlay from "@/components/SpinnerOverlay";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import SpinnerIcon from "@/assets/icons/SpinnerIcon";
// import Loading from "@/components/Loading";

const DrugForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,

    reset,
  } = useFormContext<FormSchema>();

  const {
    fields: genericsFields,
    append: genericsFieldsAppend,

    remove: genericsFieldsRemove,
  } = useFieldArray<Generics>({
    name: "generics",
  });
  const { append: strengthFieldsAppend, remove: strengthFieldsRemove } =
    useFieldArray({
      name: "strength",
    });

  const watchGenerics = useWatch({ name: "generics" });

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    setIsLoading(true);
    console.log(JSON.stringify(data, null, 2));
    try {
      await saveDrug(data);
      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="grid">
      <Card className=' mx-auto'>
        {isLoading && <SpinnerOverlay />}
        <CardHeader>
          <CardTitle>Drug Form</CardTitle>
          <CardDescription>Add a new drug to the database.</CardDescription>
        </CardHeader>{" "}
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-5 shadow-lg p-5 bg-white dark:bg-c_light_cyan-900  rounded-md dark:text-black w-100 md:w-[600px]'>
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

            <InputField>
              <Label htmlFor='packaging'>Packaging</Label>
              <div className='flex gap-4'>
                <DrugField
                  placeholder='30'
                  // ddddd
                  name='manufacturer'
                />
                <AutoComplete
                  name='packaging'
                  options={packagingTypes}
                />
              </div>
            </InputField>
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
        </CardContent>
      </Card>
    </div>
  );
};
export default DrugForm;
