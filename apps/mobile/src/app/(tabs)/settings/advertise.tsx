import { FontAwesome6 } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { Stack } from "expo-router";
import { usePostHog } from "posthog-react-native";
import React from "react";
import { Alert, ScrollView, View } from "react-native";

import { type DirectAdData, MedicalAd } from "@/components/ads/MedicalAd";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
export default function AdvertiseScreen() {
  const brandAd: DirectAdData = {
    headline: "[OTC Product] (Natural Supplements)",
    body: "Discover our range of natural supplements designed to support your health and well-being.",
    advertiser: "[Your Brand Name]",
    iconUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_xV9_m1_Yx_-9_-_-_-_-_-_-_-_-_-_-_-_-_-_-_&s", // Mock GSK logo or drug icon
    callToAction: "Prescription Guide",
  };

  const pharmacyAd: DirectAdData = {
    headline: "Universal Community Pharmacy",
    body: "24/7 Availability of all chronic disease medications. Fast delivery across Khartoum.",
    advertiser: "Universal Pharmacy Group",
    iconUrl: "../../../../assets/images/logo.png", // Mock Pharmacy logo
    callToAction: "Find Branch",
  };

  return (
    <View className='bg-background flex-1'>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Advertise with Us",
        }}
      />
      <ScrollView className='flex-1'>
        <View className='gap-6 p-4'>
          {/* Header */}
          <View className='gap-2'>
            <Text className='text-3xl font-extrabold text-blue-600 dark:text-blue-400'>
              Empower Your Reach
            </Text>
            <Text className='text-muted-foreground text-lg leading-6 font-medium'>
              Sudan Codex connects medical brands and pharmacies directly with
              physicians and pharmacists across the nation.
            </Text>
          </View>

          {/* Examples Section */}
          <View className='gap-4'>
            <Text className='text-xl font-bold'>Ad Layout Examples</Text>

            <View className='gap-6'>
              <View className='gap-2'>
                <Text className='text-muted-foreground text-sm font-bold tracking-wider uppercase'>
                  Brand Advertisement
                </Text>
                <MedicalAd
                  type='direct'
                  directData={brandAd}
                />
              </View>

              <View className='gap-2'>
                <Text className='text-muted-foreground text-sm font-bold tracking-wider uppercase'>
                  Pharmacy / Service Ad
                </Text>
                <MedicalAd
                  type='direct'
                  directData={pharmacyAd}
                />
              </View>
            </View>
          </View>

          {/* Benefits Card */}
          <Card className='mt-2'>
            <CardHeader>
              <CardTitle>Why Advertise Directly?</CardTitle>
            </CardHeader>
            <CardContent className='gap-4 pb-6'>
              <View className='gap-1'>
                <Text className='text-lg font-bold'>Hyper-Targeted</Text>
                <Text className='text-muted-foreground'>
                  Place your brand directly in front of the medical
                  professionals prescribing your medications.
                </Text>
              </View>
              <View className='gap-1'>
                <Text className='text-lg font-bold'>Rich Media Support</Text>
                <Text className='text-muted-foreground'>
                  Use custom icons, compelling taglines, and clear calls to
                  action to drive engagement.
                </Text>
              </View>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <View className='mb-10 items-center justify-center gap-4 rounded-2xl bg-blue-50 p-8 dark:bg-blue-900/20'>
            <Text className='text-center text-xl font-bold text-blue-800 dark:text-blue-200'>
              Ready to showcase your brand?
            </Text>
            <Text className='text-center text-blue-700/70 dark:text-blue-300/60'>
              Join the Sudanese medical network today.
            </Text>
            <WhatsAppBtn />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const WhatsAppBtn = () => {
  const posthog = usePostHog();
  const phoneNumber = "+966565621620"; // Replace with your desired phone number
  const message = "Hello, I am interested in advertising on Sudan Codex";
  const whatsappUrl = `https://wa.me/${phoneNumber.replace("+", "")}?text=${encodeURIComponent(message)}`;
  const openWhatsApp = async () => {
    try {
      await Linking.openURL(whatsappUrl);
      posthog.capture("whatsApp_btn_clicked");
    } catch (error) {
      console.error("Error opening WhatsApp:", error);
      Alert.alert("Error", "Failed to open WhatsApp.");
    }
  };
  return (
    <Button
      className='items-center justify-center bg-green-400'
      onPress={openWhatsApp}>
      <Text className='text-white dark:text-white'>Contact Now</Text>
      <FontAwesome6
        name='whatsapp'
        size={24}
        color='#fff'
      />
    </Button>
  );
};
