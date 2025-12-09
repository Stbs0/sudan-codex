import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import type { DrugProperty } from "@/types";
import { View } from "react-native";

type Props = { title: string; property: DrugProperty; className?: string };

const DrugPropertyDescription = ({
  title,
  property,
  className = "",
}: Props) => {
  return (
    <View
      className={cn(
        "flex flex-col  border-l-2 border-b-2  p-2 pt-0",
        className,
      )}
    >
      <Text className="dark:text-white/30 font-bold text-xs text-black/20">
        {String(title)}
      </Text>
      <Text className="text-bold dark:text-white ">
        {String(property || "No Available Data")}
      </Text>
    </View>
  );
};

export default DrugPropertyDescription;
