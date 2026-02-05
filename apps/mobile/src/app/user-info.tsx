import AccountInfoForm from "@/components/auth/AccountInfoForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Redirect, useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function CompleteProfileScreen() {
  const { data } = useAuth();
  const { t } = useTranslation();
  const router = useRouter();

  if (data?.user?.isProfileComplete) {
    return <Redirect href='/drug-list' />;
  }

  const handleSuccess = () => {
    router.replace("/drug-list");
  };

  return (
    <KeyboardAwareScrollView
      className='m-safe bg-background flex-1'
      bottomOffset={20}>
      <Card className='m-4 border-none bg-transparent shadow-none'>
        <CardHeader>
          <CardTitle>{t("completeProfile.title")}</CardTitle>
          <CardDescription>{t("completeProfile.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <AccountInfoForm onSuccess={handleSuccess} />
        </CardContent>
      </Card>
    </KeyboardAwareScrollView>
  );
}
