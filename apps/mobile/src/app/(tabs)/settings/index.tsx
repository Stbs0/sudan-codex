import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { Link } from "expo-router";
import { ChevronRightIcon } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

const SettingsScreen = () => {
  const { t } = useTranslation();

  return (
    <View className="flex-1 p-4 gap-4">
      <Link href={"/settings/account"} asChild>
        <Button
          variant={"ghost"}
          className="border-none   justify-between px-6"
        >
          <Text className="text-lg">{t("settings.screens.account")}</Text>
          <Icon as={ChevronRightIcon} />
        </Button>
      </Link>
      <Separator />
      <Link href={"/settings/appearance"} asChild>
        <Button
          variant={"ghost"}
          className="border-none   justify-between px-6"
        >
          <Text className="text-lg">
            {t("settings.screens.appearanceAndLang")}
          </Text>
          <Icon as={ChevronRightIcon} />
        </Button>
      </Link>

      <Separator />
      <Link href={"/settings/help"} asChild>
        <Button
          variant={"ghost"}
          className="border-none   justify-between px-6"
        >
          <Text className="text-lg">{t("settings.screens.help")}</Text>
          <Icon as={ChevronRightIcon} />
        </Button>
      </Link>
      <Separator />

      <Link href={"/about"} asChild>
        <Button
          variant={"ghost"}
          className="border-none   justify-between px-6"
        >
          <Text className="text-lg">{t("settings.screens.about")}</Text>
          <Icon as={ChevronRightIcon} />
        </Button>
      </Link>
      <Separator />
    </View>
  );
};

export default SettingsScreen;
