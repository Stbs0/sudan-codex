import { View } from "react-native";
import { Text } from "../ui/text";

export default function Header() {
  return (
    <View className="px-6 py-12 text-center">
      <Text className="mb-3 text-4xl font-bold text-white">
        Pharmaceutical Statistics
      </Text>
      <Text className="text-base text-slate-400">
        Global Drug Database Overview
      </Text>
    </View>
  );
}
