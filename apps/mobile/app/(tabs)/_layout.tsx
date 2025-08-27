import { Tabs } from "expo-router";
import React from "react";

const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name='home'
        options={{ title: "Home" }}
      />
      <Tabs.Screen
        name='drug list'
        options={{ title: "Drug List" }}
      />
    </Tabs>
  );
};

export default TabLayout;
