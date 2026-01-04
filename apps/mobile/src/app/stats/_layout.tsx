import { Stack } from "expo-router";
import React from "react";

export default function TabLayout() {
  // const { t } = useTranslation();
  return (
    <Stack>
      <Stack.Screen name='agents/[slug]' />

      <Stack.Screen
        name='companies/[slug]'
        options={{}}
      />

      <Stack.Screen name='generics/[slug]' />
    </Stack>
  );
}
