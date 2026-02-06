import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { Text } from "@/components/ui/text";

export default function Header() {
  const { t } = useTranslation();
  return (
    <View className='px-6 py-6 text-center'>
      <Text className='mb-3 text-4xl font-bold'>{t("stats.header.title")}</Text>
      <Text className='text-base'>{t("stats.header.subtitle")}</Text>
    </View>
  );
}
