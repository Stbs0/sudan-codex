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
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  tellUsMoreSchema,
  tellUsMoreSchemaType,
} from "@sudan-codex/types/schemas";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Separator } from "../ui/separator";

const UserInfoForm = () => {
  const posthog = usePostHog();
  const router = useRouter();

  const { control, ...methods } = useForm<tellUsMoreSchemaType>({
    defaultValues: {
      age: 0,
      university: "",
      occupation: undefined,
      phoneNumber: "",
    },
    mode: "all",
    resolver: zodResolver(tellUsMoreSchema),
  });

  const onSubmit = async (data: tellUsMoreSchemaType) => {
    const res = await authClient.updateUser(data, {
      onSuccess: (ctx) => {
        router.replace("/drug-list");
        toast.success("Profile updated successfully!");
      },
    });
    if (res.error) {
      posthog.captureException(res.error, { place: "user info form" });
      toast.error("Failed to update profile. Please try again.");
    }
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
                render={({ field: { value, ...otherProps } }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='eg 20'
                        type='number'
                        value={value === 0 ? "" : value}
                        {...otherProps}
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
                disabled={methods.formState.isSubmitting}
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
