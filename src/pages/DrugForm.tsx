import { SubmitHandler, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";

import DrugField from "@/components/DrugInput";

import { Input } from "@/components/ui/input";
import { FormSchema } from "@/lib/formSchema";
import Strength from "@/components/Strength";

const DrugForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useFormContext<FormSchema>();

  const onSubmit: SubmitHandler<FormSchema> = (data) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-5 shadow-lg p-5 bg-white dark:bg-c_light_cyan-900 my-4 rounded-md dark:text-black w-100 md:w-[600px]'>
      <DrugField
        register={register}
        label='Brand'
        placeholder='Amocaln'
        name='brand'
        errors={errors}
      />
      <div className='flex items-center'>
        <DrugField
          register={register}
          errors={errors}
          label='Generic name'
          placeholder='Co-amoxaclav'
          name='generic'
        />

        <div className='flex space-x-2 justify-start'>
          <Input
            className='w-16 min-w-[60px] max-w-fit px-2 mr-3'
            placeholder='100'
            {...register("strength.number")}
          />
          <Strength />
        </div>
      </div>
      <DrugField
        register={register}
        errors={errors}
        label='Manufacturer'
        placeholder='Hikma'
        name='manufacturer'
      />
      <div className=' '>
        <div className='flex space-x-2 justify-start'>
          <Input
            className='w-16 min-w-[60px] max-w-fit px-2 mr-3'
            placeholder='100'
            {...register("strength.number")}
          />
          <Strength />
        </div>
      </div>
      {/*
        <DrugSelect
          register={register}
          errors={errors}
          label='Dosage Form'
          name='dosageForm'
        />
        <DrugSelect
          register={register}
          errors={errors}
          label='Type of Dosage Form'
          name='typeOfDosageForm'
          second
        />
        <div className='flex '>
          <DrugField
            register={register}
          errors={errors}
            label='Strength'
            placeholder='10'
            name='strength'
          />
          <DrugSelect
            register={register}
          errors={errors}
            label='Type of Dosage Form'
            name='typeOfDosageForm'
            second
          />
          <DrugSelect
            register={register}
          errors={errors}
            label='Type of Dosage Form'
            name='typeOfDosageForm'
            second
          />
        </div>
        <DrugField
          register={register}
          errors={errors}
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
