"use client";
import { updateUser, type UpdateUserType } from "@sudan-codex/types";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";

const defaultValues: UpdateUserType = {
  age: 0,
  university: "",
  phoneNumber: "",
  specialty: "" as UpdateUserType["specialty"],
  occupation: undefined,
  workPlace: "",
};
const UserInfoForm = () => {
  const posthog = usePostHog();
  const router = useRouter();

  const form = useForm({
    defaultValues,
    // validationLogic: revalidateLogic(),
    validators: {
      // onBlur: updateUser,
      onChange: updateUser,
    },
    onSubmit: async ({ value }) => {
      const res = await authClient.updateUser(value, {
        onSuccess: () => {
          router.replace("/drug-list");
          toast.success("Profile updated successfully!");
        },
      });
      if (res.error) {
        posthog.captureException(res.error, { place: "user info form" });
        toast.error("Failed to update profile. Please try again.");
      }
    },
  });

  return (
    <div className='mx-auto grid max-w-2xl items-center gap-4 px-3 py-4 dark:text-gray-100'>
      <Card>
        <CardHeader className=''>
          <CardTitle className='text-center text-3xl font-bold'>
            Complete Your Profile
          </CardTitle>
          <CardDescription className='text-center text-lg'>
            Tell Us More About Yourself
          </CardDescription>
        </CardHeader>
        <CardContent className=''>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            id='user-info-form'>
            <FieldSet>
              <FieldGroup>
                <form.Field name='age'>
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Age</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={
                            field.state.value === 0 ? "" : field.state.value
                          }
                          onBlur={field.handleBlur}
                          onChange={(e) =>
                            field.handleChange(Number(e.target.value))
                          }
                          type='number'
                          placeholder='eg 20'
                          aria-invalid={isInvalid}
                        />
                        <FieldDescription>Write your age</FieldDescription>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>

                <Separator className='my-1' />

                <form.Field name='phoneNumber'>
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Phone Number
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          type='tel'
                          autoComplete='tel-country-code'
                          placeholder='eg. +249123456789'
                          aria-invalid={isInvalid}
                        />
                        <FieldDescription>
                          Write your phone number
                        </FieldDescription>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>

                <Separator className='my-1' />

                <form.Field name='university'>
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>University</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder='eg. University of Gezira'
                          aria-invalid={isInvalid}
                        />
                        <FieldDescription>Your university</FieldDescription>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>
              </FieldGroup>
              <Separator className='my-1' />

              <form.Field name={"specialty"}>
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Specialty</FieldLabel>

                      <Select
                        name={field.name}
                        value={
                          field.state.meta.isTouched ? field.state.value : ""
                        }
                        onValueChange={(value) =>
                          field.handleChange(
                            value as UpdateUserType["specialty"]
                          )
                        }>
                        <SelectTrigger id={field.name}>
                          <SelectValue placeholder='Select your specialty' />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value='auto'>Select</SelectItem>
                          <SelectSeparator />
                          {updateUser.shape[field.name].options.map(
                            (option) => (
                              <SelectItem
                                key={option}
                                value={option}>
                                {option}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Subscribe selector={(state) => state.values.specialty}>
                {(specialty) =>
                  specialty === "Pharmacist" && (
                    <form.Field name={"occupation"}>
                      {(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;

                        return (
                          <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>
                              Occupation
                            </FieldLabel>

                            <Select
                              name={field.name}
                              value={
                                (field.state.meta.isTouched
                                  ? field.state.value
                                  : "") as string
                              }
                              onValueChange={(value) =>
                                field.handleChange(
                                  value as UpdateUserType["occupation"]
                                )
                              }>
                              <SelectTrigger id={field.name}>
                                <SelectValue placeholder='Select your specialty' />
                              </SelectTrigger>

                              <SelectContent>
                                {updateUser.shape[field.name]
                                  .unwrap()
                                  .options.map((option) => (
                                    <SelectItem
                                      key={option}
                                      value={option}>
                                      {option}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>

                            {isInvalid && (
                              <FieldError
                                errors={field.state.meta.errors.map((err) => ({
                                  message: err?.toString(),
                                }))}
                              />
                            )}
                          </Field>
                        );
                      }}
                    </form.Field>
                  )
                }
              </form.Subscribe>

              <form.Subscribe selector={(state) => state.values.occupation}>
                {(occupation) =>
                  occupation !== "Student" && (
                    <form.Field name='workPlace'>
                      {(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>
                              Work Place
                            </FieldLabel>
                            <Input
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              placeholder='eg. Hikma Pharmacy'
                              aria-invalid={isInvalid}
                            />
                            <FieldDescription>Your work place</FieldDescription>
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    </form.Field>
                  )
                }
              </form.Subscribe>

              <form.Subscribe
                selector={(state) => state.canSubmit && !state.isSubmitting}>
                {(canSubmit) => (
                  <Button
                    form='user-info-form'
                    disabled={!canSubmit}
                    className='mt-4 w-full'
                    type='submit'>
                    {form.state.isSubmitting ? "Saving..." : "Save"}
                  </Button>
                )}
              </form.Subscribe>
            </FieldSet>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserInfoForm;
