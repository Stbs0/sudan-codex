import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import useSignIn from "@/hooks/useSignIn";
import { coolDownAsync, warmUpAsync } from "expo-web-browser";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
export function SignUpForm() {
  const { loading, signIn } = useSignIn();
  const { t } = useTranslation();
  React.useEffect(() => {
    warmUpAsync();
    return () => {
      coolDownAsync();
    };
  }, []);
  return (
    <View className='gap-6'>
      <Card className='border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5'>
        <CardHeader>
          <CardTitle className='text-center text-xl sm:text-left'>
            {t("auth.title")}
          </CardTitle>
          <CardDescription className='text-center sm:text-left'>
            {t("auth.welcome")}
          </CardDescription>
        </CardHeader>
        <CardContent className='gap-6'>
          <Button onPress={async () => await signIn()}>
            <Text>Google</Text>
          </Button>
        </CardContent>
      </Card>
    </View>
  );
}
