import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { updateUser } from "@sudan-codex/types";
import { useForm } from "@tanstack/react-form";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, TextInput, View } from "react-native";
import { toast } from "sonner-native";
import { z } from "zod";

// Extend the schema to include name
const accountSchema = updateUser.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

type AccountFormValues = z.infer<typeof accountSchema>;
const defaultValues: AccountFormValues = {
  age: 0,
  university: "",
  name: "",
  phoneNumber: "",
  specialty: "" as AccountFormValues["specialty"],
  occupation: undefined,
  workPlace: "",
};
interface AccountInfoFormProps {
  onSuccess?: () => void;
}

export default function AccountInfoForm({ onSuccess }: AccountInfoFormProps) {
  const { t } = useTranslation();
  const session = authClient.useSession();
  const user = session.data?.user;

  // Manual focus management for React Native
  const fields = useRef<{ input: TextInput | null; name: string }[]>([]);

  const form = useForm({
    defaultValues: user
      ? {
          name: user.name ?? undefined,
          age: user.age ?? undefined,
          university: user.university ?? undefined,
          phoneNumber: user.phoneNumber ?? undefined,
          specialty: user.specialty ?? undefined,
          occupation: user.occupation ?? undefined,
          workPlace: user.workPlace ?? undefined,
        }
      : defaultValues,
    validators: {
      onBlurAsync: accountSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await authClient.updateUser(value);
        if (res.error) {
          toast.error(t("common.error", "Failed to update profile"));
        } else {
          toast.success(t("common.success", "Profile updated successfully"));
          onSuccess?.();
        }
      } catch (error) {
        toast.error(t("common.error", "An unexpected error occurred"));
      }
    },
    asyncAlways: true,
    onSubmitInvalid: ({ formApi }) => {
      const errorMap = formApi.state.errorMap;
      const inputs = fields.current;

      let firstInput: TextInput | null = null;
      for (const input of inputs) {
        if (!input || !input.input) continue;
        // Check if this field has an error in any of the potential maps
        const hasError =
          errorMap.onChange?.[input.name] ||
          errorMap.onBlur?.[input.name] ||
          errorMap.onSubmit?.[input.name];

        if (hasError) {
          firstInput = input.input;
          break;
        }
      }
      firstInput?.focus();
    },
  });

  if (session.isPending) {
    return (
      <View className='items-center p-8'>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View className='gap-6 p-4'>
      <View className='gap-2'>
        <Text className='font-medium'>
          {t("completeProfile.title", "Account Information")}
        </Text>
        <Text className='text-muted-foreground text-sm'>
          {t(
            "completeProfile.description",
            "Update your profile details below"
          )}
        </Text>
      </View>

      <View className='gap-4'>
        <form.Field name='name'>
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && field.state.meta.errors.length > 0;
            console.log(field.state.meta.errors);
            return (
              <View className='gap-1.5'>
                <Text className='text-sm font-medium'>
                  {t("completeProfile.name.title", "Name")}
                </Text>
                <Input
                  ref={(input) => {
                    fields.current[0] = { input, name: field.name };
                  }}
                  placeholder={t(
                    "completeProfile.name.placeholder",
                    "Enter your name"
                  )}
                  onBlur={field.handleBlur}
                  onChangeText={field.handleChange}
                  value={field.state.value}
                  className={isInvalid ? "border-destructive" : ""}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </View>
            );
          }}
        </form.Field>

        {/* Age Field */}
        <form.Field name='age'>
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && field.state.meta.errors.length > 0;

            return (
              <View className='gap-1.5'>
                <Text className='text-sm font-medium'>
                  {t("completeProfile.age.title")}
                </Text>
                <Input
                  ref={(input) => {
                    fields.current[1] = { input, name: field.name };
                  }}
                  placeholder={t("completeProfile.age.placeholder")}
                  onBlur={field.handleBlur}
                  onChangeText={(text) =>
                    field.handleChange(text ? parseInt(text) : 0)
                  }
                  value={field.state.value ? field.state.value.toString() : ""}
                  keyboardType='numeric'
                  className={isInvalid ? "border-destructive" : ""}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </View>
            );
          }}
        </form.Field>

        {/* Phone Number Field */}
        <form.Field name='phoneNumber'>
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && field.state.meta.errors.length > 0;
            return (
              <View className='gap-1.5'>
                <Text className='text-sm font-medium'>
                  {t("completeProfile.phoneNumber.title")}
                </Text>
                <Input
                  ref={(input) => {
                    fields.current[2] = { input, name: field.name };
                  }}
                  placeholder={t("completeProfile.phoneNumber.placeholder")}
                  onBlur={field.handleBlur}
                  onChangeText={field.handleChange}
                  value={field.state.value}
                  keyboardType='phone-pad'
                  className={isInvalid ? "border-destructive" : ""}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </View>
            );
          }}
        </form.Field>

        {/* University Field */}
        <form.Field name='university'>
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && field.state.meta.errors.length > 0;
            return (
              <View className='gap-1.5'>
                <Text className='text-sm font-medium'>
                  {t("completeProfile.university.title")}
                </Text>
                <Input
                  ref={(input) => {
                    fields.current[3] = { input, name: field.name };
                  }}
                  placeholder={t("completeProfile.university.placeholder")}
                  onBlur={field.handleBlur}
                  onChangeText={field.handleChange}
                  value={field.state.value}
                  className={isInvalid ? "border-destructive" : ""}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </View>
            );
          }}
        </form.Field>

        <form.Field name='specialty'>
          {(field) => {
            const specialties = [
              {
                label: t("completeProfile.specialty.options.pharmacist"),
                value: "Pharmacist",
              },
              {
                label: t("completeProfile.specialty.options.doctor"),
                value: "Doctor",
              },
              {
                label: t("completeProfile.specialty.options.nurse"),
                value: "Nurse",
              },
              {
                label: t("completeProfile.specialty.options.alliedHealth"),
                value: "Allied health professionals",
              },
              {
                label: t("completeProfile.specialty.options.other"),
                value: "Other",
              },
            ];
            const selectedValue = specialties.find(
              (s) => s.value === field.state.value
            );
            const isInvalid =
              field.state.meta.isTouched && field.state.meta.errors.length > 0;
            return (
              <View className='gap-1.5'>
                <Text className='text-sm font-medium'>
                  {t("completeProfile.specialty.title")}
                </Text>
                <Select
                  onValueChange={(option) =>
                    field.handleChange(option?.value as any)
                  }
                  value={selectedValue}>
                  <SelectTrigger
                    className={cn("w-full", isInvalid && "border-destructive")}>
                    <SelectValue
                      placeholder={t("completeProfile.specialty.placeholder")}
                    />
                  </SelectTrigger>
                  <SelectContent side='top'>
                    <SelectGroup>
                      <SelectLabel>
                        {t("completeProfile.specialty.selectLabel")}
                      </SelectLabel>
                      {specialties.map((item) => (
                        <SelectItem
                          key={item.value}
                          label={item.label}
                          value={item.value}>
                          <Text>{item.label}</Text>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </View>
            );
          }}
        </form.Field>

        {/* Subscribe to specialty to show occupation conditionally */}
        <form.Subscribe selector={(state) => state.values.specialty}>
          {(specialty) => (
            <>
              {specialty === "Pharmacist" && (
                <form.Field name='occupation'>
                  {(field) => {
                    const occupations = [
                      {
                        label: t("completeProfile.occupation.options.student"),
                        value: "Student",
                      },
                      {
                        label: t(
                          "completeProfile.occupation.options.pharmacist"
                        ),
                        value: "Pharmacist",
                      },
                      {
                        label: t(
                          "completeProfile.occupation.options.administrator"
                        ),
                        value: "Administrator",
                      },
                      {
                        label: t(
                          "completeProfile.occupation.options.medicalRep",
                          "Medical Representative"
                        ),
                        value: "Medical Representative",
                      },
                      {
                        label: t("completeProfile.occupation.options.other"),
                        value: "Other",
                      },
                    ];
                    const selectedValue = occupations.find(
                      (o) => o.value === field.state.value
                    );
                    const isInvalid =
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0;
                    return (
                      <View className='gap-1.5'>
                        <Text className='text-sm font-medium'>
                          {t("completeProfile.occupation.title")}
                        </Text>
                        <Select
                          onValueChange={(option) =>
                            field.handleChange(option?.value as any)
                          }
                          value={selectedValue}>
                          <SelectTrigger
                            className={cn(isInvalid && "border-destructive")}>
                            <SelectValue
                              placeholder={t(
                                "completeProfile.occupation.placeholder"
                              )}
                            />
                          </SelectTrigger>
                          <SelectContent side='top'>
                            <SelectGroup>
                              <SelectLabel>
                                {t("completeProfile.occupation.selectLabel")}
                              </SelectLabel>
                              {occupations.map((item) => (
                                <SelectItem
                                  key={item.value}
                                  label={item.label}
                                  value={item.value}>
                                  <Text>{item.label}</Text>
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </View>
                    );
                  }}
                </form.Field>
              )}
            </>
          )}
        </form.Subscribe>

        {/* Subscribe to specialty and occupation to show workplace conditionally */}
        <form.Subscribe
          selector={(state) => [
            state.values.specialty,
            state.values.occupation,
          ]}>
          {([specialty, occupation]) => {
            const showWorkPlace = !(
              specialty === "Pharmacist" && occupation === "Student"
            );
            if (!showWorkPlace) return null;
            return (
              <form.Field name='workPlace'>
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0;
                  return (
                    <View className='gap-1.5'>
                      <Text className='text-sm font-medium'>
                        {t("completeProfile.workPlace.title")}
                      </Text>
                      <Input
                        ref={(input) => {
                          fields.current[4] = { input, name: field.name };
                        }}
                        placeholder={t("completeProfile.workPlace.placeholder")}
                        onBlur={field.handleBlur}
                        onChangeText={field.handleChange}
                        value={field.state.value}
                        className={isInvalid ? "border-destructive" : ""}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </View>
                  );
                }}
              </form.Field>
            );
          }}
        </form.Subscribe>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button
              onPress={form.handleSubmit}
              disabled={!canSubmit}
              className='mt-2'>
              {isSubmitting ? (
                <ActivityIndicator color='white' />
              ) : (
                <Text className='text-primary-foreground font-bold'>
                  {t("completeProfile.submit")}
                </Text>
              )}
            </Button>
          )}
        </form.Subscribe>
      </View>
    </View>
  );
}

function FieldError({ errors }: { errors: any[] }) {
  return (
    <Text className='text-destructive text-xs'>
      {errors.map((error) => error.message).join(".\n")}
    </Text>
  );
}
