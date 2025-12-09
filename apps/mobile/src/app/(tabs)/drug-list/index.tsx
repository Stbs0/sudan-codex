import DrugList from "@/screens/Drug-list/DrugList";
import { useColorScheme } from "nativewind";
import React from "react";
import { KeyboardAvoidingView, View } from "react-native";
import Svg, { Defs, Pattern, Rect } from "react-native-svg";

const DrugListScreen = () => {
  return (
    <View style={{ flex: 1 }} className="bg-background pt-2">
      <KeyboardAvoidingView
        className="flex-1 relative"
        keyboardVerticalOffset={100}
        behavior="padding"
      >
        <GridBackground>
          <DrugList />
        </GridBackground>
      </KeyboardAvoidingView>
    </View>
  );
};

export default DrugListScreen;

function GridBackground({ children }: { children: React.ReactNode }) {
  const { colorScheme } = useColorScheme(); // "light" | "dark"

  // Change grid color depending on theme
  const strokeColor = colorScheme === "dark" ? "#262626" : "#e0e0e0"; // gray-800 vs gray-200

  return (
    <View style={{ flex: 1 }}>
      {/* SVG Grid */}
      <Svg height="100%" width="100%" style={{ position: "absolute" }}>
        <Defs>
          <Pattern
            id="smallGrid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <Rect
              x="0"
              y="0"
              width="20"
              height="20"
              stroke={strokeColor}
              strokeWidth="1"
              fill="none"
            />
          </Pattern>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#smallGrid)" />
      </Svg>

      {/* Foreground content */}
      {children}
    </View>
  );
}
