import { Stack } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";

export default function TabLayout() {
  const { t } = useTranslation();
  return (
    <Stack>
      <Stack.Screen
        name='agents/[slug]'
        options={{ title: t("stats.status.loadingAgent") }}
      />

      <Stack.Screen
        name='companies/[slug]'
        options={{ title: t("stats.status.loadingCompany") }}
      />

      <Stack.Screen
        name='generics/[slug]'
        options={{ title: t("stats.status.loadingGeneric") }}
      />
    </Stack>
  );
}
