import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import useSignIn from "@/hooks/useSignIn";
import { coolDownAsync, warmUpAsync } from "expo-web-browser";
import { Loader2 } from "lucide-react-native";
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
    <View className="gap-6">
      <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">
            {t("auth.title")}
          </CardTitle>
          <CardDescription className="text-center sm:text-left">
            {t("auth.welcome")}
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <Button disabled={loading} onPress={async () => await signIn()}>
            {loading && (
              <View className="pointer-events-none animate-spin">
                <Icon as={Loader2} className="text-primary-foreground" />
              </View>
            )}
            <Text>Google</Text>
          </Button>
        </CardContent>
      </Card>
    </View>
  );
}
