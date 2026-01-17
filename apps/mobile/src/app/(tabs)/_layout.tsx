import { Icon } from "@/components/ui/icon";
import { Tabs } from "expo-router";
import { List, Settings } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
export const unstable_settings = {
  initial: "drug-list",
};
export default function TabLayout() {
  const { t } = useTranslation();
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: (props) => {
          if (route.name === "drug-list") {
            return (
              <Icon
                as={List}
                {...props}
              />
            );
          }

          if (route.name === "settings") {
            return (
              <Icon
                as={Settings}
                {...props}
              />
            );
          }
        },
      })}>
      <Tabs.Screen
        name='drug-list'
        options={{
          tabBarLabel: t("tabs.drugList"),
          headerShown: false,
          title: "loading...",
        }}
      />
      <Tabs.Screen
        name='stats'
        options={{
          href: null,
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name='settings'
        options={{
          headerShown: false,
          title: t("tabs.settings"),
          tabBarLabel: t("tabs.settings"),
        }}
      />

      <Tabs.Screen
        name='index'
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
