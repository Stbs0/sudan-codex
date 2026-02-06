import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import {
  NativeAd,
  NativeAdChoicesPlacement,
  NativeAdView,
  NativeAsset,
  NativeAssetType,
  TestIds,
} from "react-native-google-mobile-ads";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { Text } from "../ui/text";

const adUnitId = __DEV__
  ? TestIds.NATIVE
  : process.env.EXPO_PUBLIC_NATIVE_AD_UNIT_ID!;

export const NativeComponent = ({ className }: { className?: string }) => {
  const [nativeAd, setNativeAd] = useState<NativeAd>();

  useEffect(() => {
    NativeAd.createForAdRequest(adUnitId, {
      adChoicesPlacement: NativeAdChoicesPlacement.TOP_LEFT,
    })
      .then(setNativeAd)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!nativeAd) return;
    return () => {
      nativeAd.destroy();
    };
  }, [nativeAd]);

  if (!nativeAd) {
    return null;
  }

  return (
    <Card
      className={cn(
        "overflow-hidden border-2 py-0 shadow-md shadow-black",
        className
      )}>
      <NativeAdView
        nativeAd={nativeAd}
        className='p-4'>
        <View className='flex-row items-center gap-4'>
          {nativeAd.icon && (
            <NativeAsset assetType={NativeAssetType.ICON}>
              <Image
                source={{ uri: nativeAd.icon.url }}
                className='h-12 w-12 rounded-xl'
              />
            </NativeAsset>
          )}
          <View className='flex-1 gap-0.5'>
            <View className='flex-row items-center justify-between'>
              <NativeAsset assetType={NativeAssetType.HEADLINE}>
                <Text className='text-lg font-extrabold text-neutral-700 dark:text-blue-200'>
                  {nativeAd.headline}
                </Text>
              </NativeAsset>
              <View className='rounded bg-blue-100 px-1.5 py-0.5 dark:bg-blue-900/40'>
                <Text className='text-[10px] font-bold text-blue-600 dark:text-blue-400'>
                  AD
                </Text>
              </View>
            </View>
            {nativeAd.advertiser && (
              <NativeAsset assetType={NativeAssetType.ADVERTISER}>
                <Text className='text-xs font-bold text-pink-700 dark:text-pink-400'>
                  {nativeAd.advertiser}
                </Text>
              </NativeAsset>
            )}
          </View>
        </View>

        <NativeAsset assetType={NativeAssetType.BODY}>
          <Text
            className='mt-3 text-sm font-medium text-neutral-600 dark:text-neutral-400'
            numberOfLines={2}>
            {nativeAd.body}
          </Text>
        </NativeAsset>

        <NativeAsset assetType={NativeAssetType.CALL_TO_ACTION}>
          <View className='mt-4 items-center justify-center rounded-xl bg-blue-600 py-3 active:bg-blue-700'>
            <Text className='font-bold text-white'>
              {nativeAd.callToAction}
            </Text>
          </View>
        </NativeAsset>
      </NativeAdView>
    </Card>
  );
};
