import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { Link } from "expo-router";
import { ChevronRightIcon } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import MobileAds from "react-native-google-mobile-ads";

const SettingsScreen = () => {
  const { t } = useTranslation();

  return (
    <View className='flex-1 gap-4 p-4'>
      <Link
        href={"/settings/account"}
        asChild>
        <Button
          variant={"ghost"}
          className='justify-between border-none px-6'>
          <Text className='text-lg'>{t("settings.screens.account")}</Text>
          <Icon as={ChevronRightIcon} />
        </Button>
      </Link>
      <Separator />
      <Link
        href={"/settings/appearance"}
        asChild>
        <Button
          variant={"ghost"}
          className='justify-between border-none px-6'>
          <Text className='text-lg'>
            {t("settings.screens.appearanceAndLang")}
          </Text>
          <Icon as={ChevronRightIcon} />
        </Button>
      </Link>
      <Separator />
      <Link
        href={"/(tabs)/settings/stats"}
        asChild>
        <Button
          variant={"ghost"}
          className='justify-between border-none px-6'>
          <Text className='text-lg'>{t("settings.screens.statistics")}</Text>
          <Icon as={ChevronRightIcon} />
        </Button>
      </Link>
      <Separator />
      <Link
        href={"/settings/help"}
        asChild>
        <Button
          variant={"ghost"}
          className='justify-between border-none px-6'>
          <Text className='text-lg'>{t("settings.screens.help")}</Text>
          <Icon as={ChevronRightIcon} />
        </Button>
      </Link>
      <Separator />

      <Link
        href={"/settings/advertise"}
        asChild>
        <Button
          variant={"ghost"}
          className='justify-between border-none px-6'>
          <Text className='text-lg'>{t("settings.screens.advertise")}</Text>
          <Icon as={ChevronRightIcon} />
        </Button>
      </Link>
      <Separator />

      <Link
        href={"/about"}
        asChild>
        <Button
          variant={"ghost"}
          className='justify-between border-none px-6'>
          <Text className='text-lg'>{t("settings.screens.about")}</Text>
          <Icon as={ChevronRightIcon} />
        </Button>
      </Link>
      {__DEV__ && (
        <Button
          variant={"ghost"}
          onPress={() => {
            MobileAds().openDebugMenu(process.env.EXPO_PUBLIC_ADMOB_APP_ID!);
          }}
          className='justify-between border-none px-6'>
          <Text className='text-lg'>test ads</Text>
          <Icon as={ChevronRightIcon} />
        </Button>
      )}
      <Separator />
    </View>
  );
};

export default SettingsScreen;
