import React from "react";
import { Image, Pressable, View } from "react-native";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { Text } from "../ui/text";

export interface DirectAdData {
  headline: string;
  body: string;
  advertiser: string;
  iconUrl: string;
  callToAction: string;
  onPress?: () => void;
}

interface MedicalAdProps {
  directData: DirectAdData;
  className?: string;
}

export const MedicalAd = ({ directData, className }: MedicalAdProps) => {
  return (
    <DirectAdComponent
      data={directData}
      className={className}
    />
  );
};

/**
 * Component for Direct (User) Ads
 */
function DirectAdComponent({
  data,
  className,
}: {
  data: DirectAdData;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "overflow-hidden border-2 py-0 shadow-md shadow-black",
        className
      )}>
      <Pressable
        onPress={data.onPress}
        className='p-4'>
        <View className='flex-row items-center gap-4'>
          <Image
            source={{ uri: data.iconUrl }}
            className='h-12 w-12 rounded-xl bg-neutral-100 dark:bg-neutral-800'
          />
          <View className='flex-1 gap-0.5'>
            <View className='flex-row items-center justify-between'>
              <Text className='text-lg font-extrabold text-neutral-700 dark:text-blue-200'>
                {data.headline}
              </Text>
              <View className='rounded bg-blue-100 px-1.5 py-0.5 dark:bg-blue-900/40'>
                <Text className='text-[10px] font-bold text-blue-600 dark:text-blue-400'>
                  SPONSORED
                </Text>
              </View>
            </View>
            <Text className='text-xs font-bold text-pink-700 dark:text-pink-400'>
              {data.advertiser}
            </Text>
          </View>
        </View>

        <Text
          className='mt-3 text-sm font-medium text-neutral-600 dark:text-neutral-400'
          numberOfLines={2}>
          {data.body}
        </Text>

        <View className='mt-4 items-center justify-center rounded-xl bg-blue-600 py-3 active:bg-blue-700'>
          <Text className='font-bold text-white'>{data.callToAction}</Text>
        </View>
      </Pressable>
    </Card>
  );
}

/**
 * Component for Google Native Ads
 */
