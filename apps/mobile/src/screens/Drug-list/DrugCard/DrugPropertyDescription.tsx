import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import type { DrugProperty } from "@sudan-codex/types";
import { useRouter, type Href } from "expo-router";
import { Info } from "lucide-react-native";
import { Pressable, View, type GestureResponderEvent } from "react-native";

type Props = {
  title: string;
  property: DrugProperty;
  className?: string;
  href?: Href;
};

const DrugPropertyDescription = ({
  title,
  property,
  className = "",
  href,
}: Props) => {
  const descriptionComponent = (
    <View
      className={cn("flex flex-col border-b-2 border-l-2 p-2 pt-0", className)}>
      <Text className='text-xs font-bold text-black/20 dark:text-white/30'>
        {String(title)}
      </Text>
      <View className='flex-row items-center gap-2'>
        <Text className='text-bold dark:text-white'>
          {String(property || "No Available Data")}
        </Text>
        {href && <Icon as={Info} />}
      </View>
    </View>
  );
  if (href) {
    return WithPressable({ descriptionComponent, href });
  }
  return descriptionComponent;
};
const WithPressable = ({
  href,
  descriptionComponent,
}: {
  href: Href;
  descriptionComponent: React.ReactElement;
}) => {
  const router = useRouter();

  const onPress = (e: GestureResponderEvent) => {
    router.push(href);
  };
  return <Pressable onPress={onPress}>{descriptionComponent}</Pressable>;
};

export default DrugPropertyDescription;
