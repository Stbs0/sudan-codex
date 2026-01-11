import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useAuth } from "@/hooks/useAuth";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { captureException } from "@sentry/react-native";
import {
  tellUsMoreSchema,
  type tellUsMoreSchemaType,
} from "@sudan-codex/types";
import { Redirect, useRouter } from "expo-router";
import React from "react";
import { Controller, useForm, type Control } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { toast } from "sonner-native";
const SelectOccupation = ({
  control,
}: {
  control: Control<tellUsMoreSchemaType>;
}) => {
  const { t } = useTranslation();
  return (
    <Controller
      control={control}
      name='occupation'
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const Occupation = [
          {
            label: t("completeProfile.occupation.options.student"),
            value: "Student",
          },
          {
            label: t("completeProfile.occupation.options.administrator"),
            value: "Administrator",
          },
          {
            label: t("completeProfile.occupation.options.pharmacist"),
            value: "Pharmacist",
          },
          {
            label: t("completeProfile.occupation.options.other"),
            value: "Other",
          },
        ];
        const options = Occupation.find((item) => item.value === value);
        return (
          <>
            <Select
              onValueChange={(option) => onChange(option?.value)}
              value={options}>
              <SelectTrigger
                className={cn("w-[180px]", error && "border-red-500")}>
                <SelectValue
                  placeholder={t("completeProfile.occupation.placeholder")}
                />
              </SelectTrigger>
              <SelectContent className='w-[180px]'>
                <SelectGroup>
                  <SelectLabel>
                    {t("completeProfile.occupation.selectLabel")}
                  </SelectLabel>
                  {Occupation.map((item) => (
                    <SelectItem
                      label={item.label}
                      key={item.value}
                      value={item.value}>
                      <Text>{item.label}</Text>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {error && <FieldMessage message={error.message} />}
          </>
        );
      }}
    />
  );
};
const FieldMessage = ({ message }: { message: string | undefined }) => {
  return !message ? null : (
    <Text className='text-xs text-red-500'>{message}</Text>
  );
};

const CompleteProfileScreen = () => {
  const { data } = useAuth();
  const { t } = useTranslation();
  const router = useRouter();
  const form = useForm({
    mode: "onBlur",
    resolver: zodResolver(tellUsMoreSchema),
  });
  if (data?.user?.isProfileComplete) {
    return <Redirect href='/drug-list' />;
  }

  const onSubmit = async (data: tellUsMoreSchemaType) => {
    const res = await authClient.updateUser(data, {
      onSuccess: () => {
        router.replace("/drug-list");
        toast.success("Profile updated successfully!");
      },
    });
    if (res.error) {
      captureException(res.error, { tags: { screen: "user-info" } });
      toast.error("Failed to update profile. Please try again.");
    }
  };
  // TODO: fix validation messages
  return (
    <View className='pt-safe flex-1'>
      <Card className='m-4'>
        <CardHeader>
          <CardTitle>{t("completeProfile.title")}</CardTitle>
          <CardDescription>
            <Text className='text-muted-foreground'>
              {t("completeProfile.description")}
            </Text>
          </CardDescription>
        </CardHeader>
        <CardContent className='gap-4'>
          <View>
            <Text className='mb-2'>{t("completeProfile.age.title")}</Text>
            <Controller
              control={form.control}
              name='age'
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <Input
                    className={error ? "border-red-500" : ""}
                    placeholder={t("completeProfile.age.placeholder")}
                    keyboardType='numeric'
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value ? value.toString() : ""}
                  />
                  {error && <FieldMessage message={error.message} />}
                </>
              )}
            />
          </View>
          <View>
            <Text className='mb-2'>
              {t("completeProfile.phoneNumber.title")}
            </Text>
            <Controller
              control={form.control}
              name='phoneNumber'
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <Input
                    className={error ? "border-red-500" : ""}
                    placeholder={t("completeProfile.phoneNumber.placeholder")}
                    keyboardType='phone-pad'
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                  {error && <FieldMessage message={error.message} />}
                </>
              )}
            />
          </View>

          <View>
            <Text className='mb-2'>
              {t("completeProfile.university.title")}
            </Text>
            <Controller
              control={form.control}
              name='university'
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <Input
                    className={error ? "border-red-500" : ""}
                    placeholder={t("completeProfile.university.placeholder")}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                  {error && <FieldMessage message={error.message} />}
                </>
              )}
            />
          </View>
          <View>
            <Text className='mb-2'>
              {t("completeProfile.occupation.title")}
            </Text>
            <SelectOccupation control={form.control} />
          </View>
        </CardContent>
        <CardFooter>
          <Button
            className='w-full'
            onPress={form.handleSubmit(onSubmit)}>
            <Text>{t("completeProfile.submit")}</Text>
          </Button>
        </CardFooter>
      </Card>
      <Button
        onPress={async () => {
          await authClient.signOut();
        }}>
        <Text>Sign out</Text>
      </Button>
    </View>
  );
};

export default CompleteProfileScreen;
