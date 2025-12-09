import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

export default function SettingsLayout() {
  const { t } = useTranslation();
  return (
    <Stack screenOptions={{ headerBackTitle: "Back" }}>
      <Stack.Screen name="index" options={{ title: t("settings.header") }} />
      <Stack.Screen
        name="appearance"
        options={{
          title: t("settings.screens.appearanceAndLang"),
        }}
      />
      <Stack.Screen
        name="help"
        options={{
          title: t("settings.screens.help"),
        }}
      />
      <Stack.Screen
        name="account"
        options={{
          title: t("settings.screens.account"),
        }}
      />
    </Stack>
  );
}
