"use client";
import SelectWithOther from "@/components/SelectWithOther";
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
import { useAuth } from "@/hooks/useAuth";
import { tellUsMoreSchema, tellUsMoreSchemaType } from "@/lib/schemas";
import { completeProfile } from "@/services/usersServices";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Separator } from "../ui/separator";

const UserInfoForm = () => {
  const { user, refetch } = useAuth();
  const { control, ...methods } = useForm<tellUsMoreSchemaType>({
    defaultValues: {
      age: "",
      university: "",
      occupation: undefined,
      phoneNumber: "",
    },
    mode: "all",
    resolver: zodResolver(tellUsMoreSchema),
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: tellUsMoreSchemaType) => {
      await completeProfile({ ...data, profileComplete: true });
    },
    onSuccess: async () => {
      if (user?.uid) {
        await queryClient.invalidateQueries({ queryKey: ["user", user.uid] });
      }
      refetch();
      toast.success("Profile completed successfully!", {
        description: "Your profile has been updated.",
      });
    },
    onError: (error) => {
      toast.error("Error completing profile. Please try again.");
      console.error("Error completing profile:", error);
    },
  });

  const onSubmit = (data: tellUsMoreSchemaType) => {
    mutation.mutate(data);
  };

  return (
    <div className='mx-auto grid max-w-2xl items-center gap-4 px-3 py-4 dark:text-gray-100'>
      <Form
        control={control}
        {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className='mb-2 space-y-1'>
            <h1 className='text-center text-3xl font-bold'>
              Complete Your Profile
            </h1>
            <p className='text-center text-lg'>Tell Us More About Yourself</p>
          </div>
          <Card>
            <CardContent>
              <FormField
                control={control}
                name='age'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='eg 20'
                        type='number'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>Write your age</FormDescription>
                  </FormItem>
                )}
              />
              <Separator className='my-4' />
              <FormField
                control={control}
                name='phoneNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete='tel-country-code'
                        placeholder='eg. +249123456789'
                        type='tel'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>Write your phone number</FormDescription>
                  </FormItem>
                )}
              />{" "}
              <Separator className='my-4' />
              <FormField
                control={control}
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
                    <FormMessage />
                    <FormDescription>Your university</FormDescription>
                  </FormItem>
                )}
              />{" "}
              <Separator className='my-4' />
              <SelectWithOther
                name='occupation'
                label='Occupation'
                placeholder='Select your occupation'
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
      {process.env.NODE_ENV === "development" && <DevTool control={control} />}
    </div>
  );
};

export default UserInfoForm;
