import { Icon } from "@/components/ui/icon";
import { Tabs } from "expo-router";
import {
  Building2,
  ChartNoAxesColumn,
  Factory,
  Pill,
} from "lucide-react-native";
import React from "react";
export default function TabLayout() {
  return (
    <Tabs
      // safeAreaInsets={{ ...safeAreaInsets, bottom: bottom / 4 }}
      screenOptions={{
        // tabBarPosition: "top",
        headerShown: true,
        headerSearchBarOptions: {},
      }}>
      <Tabs.Screen
        name='stats'
        options={{
          title: "Statistics",
          tabBarLabel: "Statistics",
          tabBarIcon: (props) => (
            <Icon
              as={ChartNoAxesColumn}
              {...props}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='companies/index'
        options={{
          tabBarLabel: "Companies",
          title: "Companies",

          tabBarIcon: (props) => (
            <Icon
              as={Factory}
              {...props}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='generics/index'
        options={{
          title: "Generics",
          tabBarLabel: "Generics",
          tabBarIcon: (props) => (
            <Icon
              as={Pill}
              {...props}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='agents/index'
        options={{
          title: "Agents",
          tabBarLabel: "Agents",
          tabBarIcon: (props) => (
            <Icon
              as={Building2}
              {...props}
            />
          ),
        }}
      />
    </Tabs>
  );
}
