import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useSignIn from "@/hooks/useSignIn";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
export function SignUpForm() {
  const { loading, signIn } = useSignIn();
  const { t } = useTranslation();
  return (
    <View className="gap-6">
      <Card className="border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">
            {t("auth.title")}
          </CardTitle>
          <CardDescription className="text-center sm:text-left">
            {t("auth.welcome")}
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
            disabled={loading}
          />
        </CardContent>
      </Card>
    </View>
  );
}
