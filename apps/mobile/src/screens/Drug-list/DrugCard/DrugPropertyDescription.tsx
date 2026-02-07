import type { Drug } from "@sudan-codex/db/schema";
import { useRouter, type Href } from "expo-router";
import { Info } from "lucide-react-native";
import { Pressable, View } from "react-native";

import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  property: Drug[keyof Drug];
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
      <View className='flex-row items-center gap-1'>
        <Text className='text-bold shrink dark:text-white'>
          {String(property || "No Available Data")}
        </Text>
        {href && (
          <Icon
            as={Info}
            className='inline-block'
            size={16}
          />
        )}
      </View>
    </View>
  );

  if (onPress) {
    return <Pressable onPress={onPress}>{descriptionComponent}</Pressable>;
  }
  return descriptionComponent;
};

export default DrugPropertyDescription;
