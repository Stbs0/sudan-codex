import SelectWithOther from "@/components/tellUsMore/SelectWithOther";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Separator } from "@/components/ui/separator";
import {
  tellUsMoreSchema,
  tellUsMoreSchemaType,
} from "@/lib/schemas/tellUsMoreSchema";
import { getTokenId, updateUser } from "@/services/usersServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const UserPersonalInfo: React.FC = () => {
  const methods = useForm({
    defaultValues: {
      age: "",
      university: "",
      occupation: "",
      phoneNumber: "",
    },
    mode: "all",
    resolver: zodResolver(tellUsMoreSchema),
  });

  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (data: tellUsMoreSchemaType) => {
      const token = await getTokenId();
      return await updateUser(token!, { ...data, profileComplete: true });
    },
    onSuccess: () => {
      navigate("/");
    },
  });

  const onSubmit = async (data: tellUsMoreSchemaType) => {
    try {
      mutation.mutate(data);
      navigate("/");
    } catch (error) {
      console.error("Error saving user info:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className='space-y-1 mb-2'>
            <h1 className='text-3xl font-bold text-center'>
              Complete Your Profile
            </h1>
            <p className='text-lg text-center'>Tell Us More About Yourself</p>
          </div>
          <Card>
            <CardContent>
              <FormField
                name='age'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='eg 20'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Write your age</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator className='my-4' />
              <FormField
                name='phoneNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='eg. +249123456789'
                        type='tel'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Write your phone number</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
              <Separator className='my-4' />
              <FormField
                name='university'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>University</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='eg. University of Gezira'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Your university</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
              <Separator className='my-4' />
              <SelectWithOther
                name='occupation'
                label='Occupation'
                placeholder='Select your occupation'
                options={[
                  {
                    value: "student",
                    label: "Student",
                  },
                  {
                    value: "pharmacist",
                    label: "Pharmacist",
                  },
                  {
                    value: "administrator",
                    label: "Administrator",
                  },
                ]}
              />
              <Button
                className='mt-4'
                type='submit'>
                Save
              </Button>
            </CardContent>
          </Card>
        </form>
      </Form>
    </FormProvider>
  );
};

export default UserPersonalInfo;
