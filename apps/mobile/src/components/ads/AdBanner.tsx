import React from "react";
import { View } from "react-native";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : (process.env.EXPO_PUBLIC_BANNER_UNIT_ID as string);

export default function AdBanner() {
  return (
    <View>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        onAdFailedToLoad={(error) => {
          // No-fill is normal and expected - don't treat it as an error
          if (error.message.includes("no-fill")) {
            console.log("No ad inventory available (this is normal)");
          } else {
            console.error("Banner ad error:", error);
          }
        }}
      />
    </View>
  );
}
