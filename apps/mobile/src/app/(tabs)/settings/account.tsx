import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { deleteUserData, signOutUser } from "@/services/usersServices";
import * as Haptics from "expo-haptics";
import { usePostHog } from "posthog-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Alert, View } from "react-native";

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
          // isPreferred: true,
          text: t("settings.account.cancelBtn"),
          onPress: () => {},
          style: "cancel",
        },
        {
          text: t("settings.account.deleteBtn"),
          onPress: async () => {
            try {
              await deleteUserData();
              posthog.capture("account deleted");
            } catch (error) {
              posthog.captureException(error, {
                label: "failed to delete account",
              });
              Alert.alert("Error", "Failed to delete user data.");
            }
          },
          style: "destructive",
        },
      ],
    );
  };
  const onSignOut = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    try {
      await signOutUser();
      posthog.capture("signed out");
    } catch (error) {
      posthog.captureException(error, { label: "failed to sign out" });

      Alert.alert("Error", "Failed to sign out.");
    }
  };
  return (
    <View className="p-4 gap-4">
      <Button variant={"outline"} onPress={onSignOut}>
        <Text className="text-center  font-bold">
          {t("settings.account.signOut")}
        </Text>
      </Button>
      <Button variant={"destructive"} onPress={onDeletePress}>
        <Text className="text-center text-white font-bold">
          {t("settings.account.delete")}
        </Text>
      </Button>
    </View>
  );
};

export default Account;
