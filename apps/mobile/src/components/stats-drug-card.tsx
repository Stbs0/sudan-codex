import type { AgentApiResponseType } from "@sudan-codex/db";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableHighlight, View } from "react-native";

import { Text } from "@/components/ui/text";

type Props = AgentApiResponseType["drugs"][number];

const StatsDrugCard = ({
  brand_name,
  generic_name,
  company_name,
  slug,
  pack_size,
  strength,
}: Props) => {
  const router = useRouter();

  const onPress = () => {
    router.push({
      pathname: "/drug-list/[slug]",
      params: {
        slug,
      },
    });
  };

  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor='rgba(0,0,0,0.05)'
      className='rounded-lg'>
      <View className='border-border bg-card min-h-[60px] flex-row overflow-hidden rounded-lg border'>
        {/* Brand Name & Strength Column */}
        <View className='border-border w-[28%] justify-center border-r p-2'>
          <Text className='text-xs font-bold text-neutral-700 dark:text-blue-200'>
            {brand_name || "NAD"}
          </Text>
          <Text className='mt-0.5 text-[10px] text-neutral-500 dark:text-neutral-400'>
            {strength || "NAD"}
          </Text>
        </View>

        {/* Generic Name Column */}
        <View className='border-border w-[28%] justify-center border-r p-2'>
          <Text className='text-xs font-semibold text-green-600 dark:text-green-400'>
            {generic_name || "NAD"}
          </Text>
        </View>

        {/* Pack Size Column */}
        <View className='border-border w-[16%] justify-center border-r p-2'>
          <Text
            className='text-[10px] text-rose-700 dark:text-rose-400'
            numberOfLines={3}
            ellipsizeMode='tail'>
            {pack_size || "NAD"}
          </Text>
        </View>

        {/* Company Column */}
        <View className='w-[28%] justify-center p-2'>
          <Text
            className='text-[10px] font-medium text-pink-700 dark:text-pink-400'
            numberOfLines={3}
            ellipsizeMode='tail'>
            {company_name || "NAD"}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default StatsDrugCard;
