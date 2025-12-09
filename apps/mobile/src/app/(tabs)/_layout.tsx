import { Icon } from "@/components/ui/icon";
import { Tabs } from "expo-router";
import { List, Settings } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";

export default function TabLayout() {
  const { t } = useTranslation();
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="drug-list"
        options={{
          tabBarLabel: t("tabs.drugList"),

          tabBarIcon: (props) => <Icon as={List} {...props} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t("tabs.settings"),
          tabBarLabel: t("tabs.settings"),
          tabBarIcon: (props) => <Icon as={Settings} {...props} />,
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
