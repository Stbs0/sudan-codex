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
import { DevTool } from "@hookform/devtools";

import { completeProfile } from "@/services/usersServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

const UserPersonalInfo = () => {
  const { user, refetch } = useAuth();
  const methods = useForm({
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
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (data: tellUsMoreSchemaType) => {
      await completeProfile({ ...data, profileComplete: true });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user", user?.uid] });
      refetch();
      navigate(from, { replace: true });
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
    <div className='mx-auto grid max-w-2xl items-center gap-4 px-3 dark:text-gray-100'>
      <FormProvider {...methods}>
        <Form {...methods}>
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
                  control={methods.control}
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
                  control={methods.control}
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
                      <FormMessage />
                      <FormDescription>Write your phone number</FormDescription>
                    </FormItem>
                  )}
                />{" "}
                <Separator className='my-4' />
                <FormField
                  control={methods.control}
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
      <DevTool control={methods.control} />
    </div>
  );
};

export default UserPersonalInfo;
