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
import { useAuth } from "@/hooks/useAuth";
import useSignIn from "@/hooks/useSignIn";
import { Ionicons } from "@expo/vector-icons";
import { openURL } from "expo-linking";
import { coolDownAsync, warmUpAsync } from "expo-web-browser";
import { Loader2, Pill } from "lucide-react-native";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export function SignUpForm() {
  const { loading, signIn } = useSignIn();
  const { isPending } = useAuth();
  const { t } = useTranslation();
  console.log("auth", isPending);
  React.useEffect(() => {
    warmUpAsync();
    return () => {
      coolDownAsync();
    };
  }, []);

  return (
    <View className='flex-1 justify-center gap-8 p-4'>
      <View className='items-center gap-2'>
        <View className='bg-primary/10 mb-2 h-16 w-16 items-center justify-center rounded-2xl'>
          <Icon
            as={Pill}
            className='text-primary'
            size={32}
          />
        </View>
        <Text className='text-center text-2xl font-bold tracking-tight'>
          Sudan Codex
        </Text>
        <Text className='text-muted-foreground max-w-[280px] text-center text-sm'>
          {t(
            "auth.subtitle",
            "The comprehensive drug index for healthcare professionals"
          )}
        </Text>
      </View>
      <Card className='border-0 bg-transparent shadow-sm'>
        <CardHeader className='gap-1.5'>
          <CardTitle className='text-center text-xl'>
            {t("auth.title")}
          </CardTitle>
          <CardDescription className='text-center'>
            {t("auth.welcome")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            size='lg'
            className='w-full'
            disabled={loading || isPending}
            onPress={async () => await signIn()}>
            {loading || isPending ? (
              <View className='mr-2 animate-spin'>
                <Icon
                  as={Loader2}
                  className='text-primary-foreground'
                />
              </View>
            ) : null}
            <Text>Continue with Google</Text>
            <Ionicons
              name='logo-google'
              size={24}
              color='black'
            />
          </Button>
        </CardContent>
      </Card>

      <Text className='text-muted-foreground px-8 text-center text-xs leading-5'>
        By clicking continue, you agree to our{" "}
        <Button
          variant='link'
          onPress={() => openURL("https://www.sudancodex.app/privacy-policy")}>
          <Text className='font-medium underline'>Privacy Policy</Text>
        </Button>
      </Text>
    </View>
  );
}
