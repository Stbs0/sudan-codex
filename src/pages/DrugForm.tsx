import { SubmitHandler, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { FormSchema } from "@/lib/schemas/newDrugSchema";

import GenericInput from "@/components/form/GenericInput";
import DosageFormInput from "@/components/form/DosageFormInput";
import { Separator } from "@/components/ui/separator";
import Strength from "@/components/form/Strength";

import { saveDrug } from "@/services/drugServices";

import SpinnerOverlay from "@/components/SpinnerOverlay";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import SHADFormField from "@/components/form/SHADFormField";
import Packaging from "@/components/form/Packaging";
import { useEffect } from "react";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";

const DrugForm = () => {
  const { user } = useAuth();
  const methods = useFormContext<FormSchema>();
  useEffect(() => {
    if (methods.formState.isSubmitSuccessful) {
      methods.reset();
      toast.success("Drug Submitted");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [methods.reset, methods.formState]);
  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    try {
      console.log(data);
      if (!user) return toast.error("Must be signed in to submit a drug");
      await saveDrug(data, user.uid);
    } catch (error) {
      console.log(error);
      toast.error(`there was an error ${error} `);
    }
  };
  console.log(methods.formState.errors);
  // TODO: add a buttun and space after the label of Each one

  return (
    <div className='container mx-auto  '>
      {methods.formState.isSubmitting && <SpinnerOverlay />}
      <Card className=' mx-auto shadow-lg bg-accent/10'>
        <CardHeader>
          <CardTitle>Drug Form</CardTitle>
          <CardDescription>Add a new drug to the database.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...methods}>
            <form
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              onSubmit={methods.handleSubmit(onSubmit)}
              className='space-y-4'>
              {/* Brand input */}
              <SHADFormField
                name='brand'
                label='Brand'
                placeholder='Divido'
                description='Add a brand (trade) name for the drug.'
              />

              <Separator className='w-[80%] mx-auto bg-primary' />

              {/* Generic input */}
              <GenericInput />

              <Separator className='w-[80%] mx-auto bg-primary' />

              {/* Dosage form input */}

              <DosageFormInput />

              <Separator className='w-[80%] mx-auto bg-primary' />

              {/* Strength input */}

              <Strength />

              <Separator className='w-[80%] mx-auto bg-primary' />

              <Packaging />
              <Separator className='w-[80%] mx-auto bg-primary' />
              {/* Manufacturer input */}
              <SHADFormField
                name='manufacturer'
                label='manufacturer'
                placeholder='Tabuk'
                description='Add the manufacturer of the drug.'
              />

              <Separator className='w-[80%] mx-auto bg-primary' />

              {/* Agency input */}
              <SHADFormField
                name='agency'
                label='agency'
                placeholder='???'
                description='The agency can be the manufacturer, distributor, etc.'
              />

              <Separator className='w-[80%] mx-auto bg-primary' />

              <SHADFormField
                type='number'
                name='price'
                label='Price'
                placeholder='1000'
                description='Write the price of the drug.'
              />

              {/* Submit button */}
              <Button
                disabled={methods.formState.isSubmitting}
                className='bg-primary'>
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
export default DrugForm;
