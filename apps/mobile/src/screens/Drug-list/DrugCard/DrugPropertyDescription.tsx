import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import type { DrugWithRelations } from "@sudan-codex/db";
import { useRouter, type Href } from "expo-router";
import { Info } from "lucide-react-native";
import { Pressable, View } from "react-native";

type Props = {
  title: string;
  property: DrugWithRelations[keyof DrugWithRelations];
  className?: string;
  href?: Href;
};

const DrugPropertyDescription = ({
  title,
  property,
  className = "",
  href,
}: Props) => {
  const router = useRouter();
  const onPress =
    typeof href === "object" && "params" in href && href.params
      ? () => {
          router.push(href);
        }
      : undefined;

  const descriptionComponent = (
    <View
      className={cn("flex flex-col border-b-2 border-l-2 p-2 pt-0", className)}>
      <Text className='text-xs font-bold text-black/20 dark:text-white/30'>
        {String(title)}
      </Text>
      <Text className='text-bold flex-row items-center dark:text-white'>
        {String(property || "No Available Data")}
        {href && (
          <Icon
            as={Info}
            className='px-3'
          />
        )}
      </Text>
    </View>
  );

  if (onPress) {
    return <Pressable onPress={onPress}>{descriptionComponent}</Pressable>;
  }
  return descriptionComponent;
};

export default DrugPropertyDescription;
