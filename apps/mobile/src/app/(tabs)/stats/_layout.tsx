import { Stack } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";

export default function TabLayout() {
  const { t } = useTranslation();
  return (
    <Stack screenOptions={{ title: t("stats.status.loadingGeneric") }}>
      <Stack.Screen name='agents/[slug]' />

      <Stack.Screen
        name='companies/[slug]'
        options={{}}
      />

      <Stack.Screen name='generics/[slug]' />
    </Stack>
  );
}
