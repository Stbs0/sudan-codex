import { Text } from "@/components/ui/text";
import { View } from "react-native";

export default function Header() {
  return (
    <View className='px-6 py-6 text-center'>
      <Text className='mb-3 text-4xl font-bold'>Drug Index Statistics</Text>
      <Text className='text-base'>Sudan Codex Stats</Text>
    </View>
  );
}
