import DrugList from "@/screens/Drug-list/DrugList";
import * as schema from "@sudan-codex/db/schema";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect } from "react";
import { KeyboardAvoidingView, View } from "react-native";
import Svg, { Defs, Pattern, Rect } from "react-native-svg";
import { useUniwind } from "uniwind";
const DrugListScreen = () => {
  const db = useSQLiteContext();
  useDrizzleStudio(db);
  const mainDb = drizzle(db, { schema: schema });
  useEffect(() => {
    const fn = async () => {
      return await mainDb.query.drugsTable.findMany();
    };
    console.log(fn());
  }, []);
  return (
    <View
      style={{ flex: 1 }}
      className='bg-background'>
      <KeyboardAvoidingView
        className='relative flex-1'
        keyboardVerticalOffset={100}
        behavior='padding'>
        <GridBackground />
        <DrugList />
      </KeyboardAvoidingView>
    </View>
  );
};

export default DrugListScreen;

function GridBackground() {
  const { theme } = useUniwind(); // "light" | "dark"

  // Change grid color depending on theme
  const strokeColor = theme === "dark" ? "#262626" : "#e0e0e0"; // gray-800 vs gray-200

  return (
    <>
      {/* SVG Grid */}
      <View className='absolute inset-0 flex-1'>
        <Svg
          height='100%'
          width='100%'
          style={{ position: "absolute" }}>
          <Defs>
            <Pattern
              id='smallGrid'
              width='20'
              height='20'
              patternUnits='userSpaceOnUse'>
              <Rect
                x='0'
                y='0'
                width='20'
                height='20'
                stroke={strokeColor}
                strokeWidth='1'
                fill='none'
              />
            </Pattern>
          </Defs>
          <Rect
            width='100%'
            height='100%'
            fill='url(#smallGrid)'
          />
        </Svg>
      </View>

      {/* Foreground content */}
    </>
  );
}
