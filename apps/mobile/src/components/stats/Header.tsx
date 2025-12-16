import { View } from "react-native";
import { Text } from "../ui/text";

export default function Header() {
  return (
    <View className="px-6 py-12 text-center">
      <Text className="mb-3 text-4xl font-bold">Drug Index Statistics</Text>
      <Text className="text-base">Sudan Codex Stats</Text>
    </View>
  );
}
