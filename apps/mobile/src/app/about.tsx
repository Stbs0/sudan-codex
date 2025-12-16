import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Constants from "expo-constants";
import { useColorScheme } from "nativewind";
import React from "react";
import { useTranslation } from "react-i18next";
import { Linking, ScrollView, View } from "react-native";

const About = () => {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const appVersion = Constants.expoConfig?.version || "1.0.0";
  const isDark = colorScheme === "dark";
  return (
    <ScrollView className="mb-safe mt-2 flex-1 px-5">
      {/* Header */}
      <Text className="mb-4 text-2xl font-bold">{t("about.title")}</Text>

      {/* Purpose */}
      <Text className="mt-3 text-lg font-semibold">
        {t("about.purposeTitle")}
      </Text>
      <Text className="mt-2 text-base">{t("about.purposeDescription")}</Text>

      {/* Developer */}
      <Text className="mt-6 text-lg font-semibold">
        {t("about.developerTitle")}
      </Text>
      <Text className="mt-2 text-base">{t("about.developerDescription")}</Text>

      {/* Version */}
      <Text className="mt-6 text-lg font-semibold">
        {t("about.versionTitle")}
      </Text>
      <Text className="mt-2 text-base">{appVersion}</Text>

      {/* Data Sources */}
      <Text className="mt-6 text-lg font-semibold">
        {t("about.dataSourceTitle")}
      </Text>
      <Text className="mt-2 text-base">
        {t("about.dataSourceDescription")}{" "}
        <Text
          className="text-blue-600 underline dark:text-blue-400"
          onPress={() =>
            Linking.openURL("https://www.nmpb.gov.sd/detailreport.php?id=7")
          }
        >
          {t("about.dataSourceLinkText")}
        </Text>{" "}
        {t("about.dataSourceYear")}
      </Text>

      {/* Contact */}
      <Text className="mt-6 text-lg font-semibold">
        {t("about.contactTitle")}
      </Text>

      <Button
        variant="ghost"
        className="justify-start pl-0"
        onPress={() =>
          Linking.openURL("mailto:mohammedjrt+sudancodexsupport@gmail.com")
        }
      >
        <Text className="text-blue-600 underline dark:text-blue-400">
          Mohammedjrt+sudancodexsupport@gmail.com
        </Text>
      </Button>

      <Button
        variant="ghost"
        className="justify-start pl-0"
        onPress={() => Linking.openURL("https://sudancodex.app/privacy-policy")}
      >
        <Text className="text-blue-600 underline dark:text-blue-400">
          {t("about.privacyPolicy")}
        </Text>
      </Button>
      <View>
        <Text className="mt-6 text-lg font-semibold">Social</Text>
        <View className="flex-row justify-around">
          <Button
            className="h-auto"
            variant="ghost"
            onPress={() => Linking.openURL("https://www.facebook.com/stbs66/")}
            accessibilityLabel="Open Facebook profile"
          >
            <FontAwesome6
              name="facebook"
              size={24}
              color={isDark ? "#fff" : "#000"}
            />
          </Button>
          <Button
            className="h-auto"
            variant="ghost"
            onPress={() => Linking.openURL("https://x.com/stbs66")}
            accessibilityLabel="Open X (Twitter) profile"
          >
            <FontAwesome6
              name="x-twitter"
              size={24}
              color={isDark ? "#fff" : "#000"}
            />
          </Button>
          <Button
            variant="ghost"
            className="h-auto"
            onPress={() =>
              Linking.openURL("https://github.com/stbs0/sudancodex-mobile")
            }
            accessibilityLabel="Open GitHub repository"
          >
            <FontAwesome6
              name="github"
              size={24}
              color={isDark ? "#fff" : "#000"}
            />
          </Button>
        </View>
      </View>

      {/* Footer */}
      <Text className="mb-4 mt-8 text-center text-xs text-gray-400 dark:text-gray-500">
        © {new Date().getFullYear()} Mohammed Mahmoud.{" "}
        {t("about.rightsReserved")}
      </Text>
    </ScrollView>
  );
};

export default About;
