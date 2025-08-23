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
import { useAuth } from "@/hooks/useAuth";
import { tellUsMoreSchema, tellUsMoreSchemaType } from "@/lib/schemas";

import { completeProfile } from "@/services/usersServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { lazy } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const DevTool = import.meta.env.DEV
  ? lazy(() =>
      import("@hookform/devtools").then((m) => ({ default: m.DevTool }))
    )
  : () => null;

const UserPersonalInfo = () => {
  const { user, refetch } = useAuth();
  const { control, ...methods } = useForm({
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
  const location = useLocation();
  const userDesiredPage = location.state?.userDesiredPage || "/";

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data: tellUsMoreSchemaType) => {
      await completeProfile({ ...data, profileComplete: true });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user", user?.uid] });
      refetch();
      navigate(userDesiredPage, { replace: true });
      toast.success("Profile completed successfully!", {
        description: "Your profile has been updated.",
      });
    },
    onError: (error) => {
      toast.error("Error completing profile. Please try again.");
      console.error("Error completing profile:", error);
    },
  });

  const onSubmit = async (data: tellUsMoreSchemaType) => {
    try {
      mutation.mutate(data);
    } catch (error) {
      console.error("Error saving user info:", error);
    }
  };

  return (
    <div className='mx-auto grid max-w-2xl items-center gap-4 px-3 py-4 dark:text-gray-100'>
      <FormProvider
        control={control}
        {...methods}>
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
      </FormProvider>

      {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        /* @ts-expect-error */
        import.meta.env.DEV && DevTool && <DevTool control={control} />
      }
    </div>
  );
};

export default UserPersonalInfo;
