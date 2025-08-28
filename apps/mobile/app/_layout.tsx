import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "./../global.css";
import { useColorScheme } from "react-native";
export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='(tabs)' />
      </Stack>
    </>
  );
}
