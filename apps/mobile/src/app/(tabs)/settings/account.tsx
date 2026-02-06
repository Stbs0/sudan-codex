import * as Haptics from "expo-haptics";
import { usePostHog } from "posthog-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Alert, ScrollView, View } from "react-native";

import AccountInfoForm from "@/components/auth/AccountInfoForm";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { authClient } from "@/lib/auth-client";

const Account = () => {
  const { t } = useTranslation();
  const posthog = usePostHog();

  const onDeletePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert(
      t("settings.account.alertTitle"),
      t("settings.account.alertMessage"),
      [
        {
          text: t("settings.account.cancelBtn"),
          onPress: () => {},
          style: "cancel",
        },
        {
          text: t("settings.account.deleteBtn"),
          onPress: async () => {
            try {
              await authClient.deleteUser();
              posthog.capture("account deleted");
              posthog.reset();
            } catch (error) {
              posthog.captureException(error, {
                label: "failed to delete account",
              });
              Alert.alert("Error", "Failed to delete user data.");
            }
          },
          style: "destructive",
        },
      ]
    );
  };
  const onSignOut = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    try {
      await authClient.signOut();
      posthog.capture("signed out");
      posthog.reset();
    } catch {
      Alert.alert("Error", "Failed to sign out.");
    }
  };
  return (
    <ScrollView className='flex-1'>
      <AccountInfoForm />
      <View className='gap-4 p-4'>
        <Button
          variant={"outline"}
          onPress={onSignOut}>
          <Text className='text-center font-bold'>
            {t("settings.account.signOut")}
          </Text>
        </Button>
        <Button
          variant={"destructive"}
          onPress={onDeletePress}>
          <Text className='text-center font-bold text-white'>
            {t("settings.account.delete")}
          </Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default Account;
