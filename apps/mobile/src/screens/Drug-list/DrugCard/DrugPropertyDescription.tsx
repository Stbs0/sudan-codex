import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import type { DrugProperty } from "@sudan-codex/types";
import { View } from "react-native";

type Props = { title: string; property: DrugProperty; className?: string };

const DrugPropertyDescription = ({
  title,
  property,
  className = "",
}: Props) => {
  return (
    <View
      className={cn("flex flex-col border-b-2 border-l-2 p-2 pt-0", className)}>
      <Text className='text-xs font-bold text-black/20 dark:text-white/30'>
        {String(title)}
      </Text>
      <Text className='text-bold dark:text-white'>
        {String(property || "No Available Data")}
      </Text>
    </View>
  );
};

export default DrugPropertyDescription;
