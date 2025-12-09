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
    <ScrollView className="flex-1   px-5 mb-safe mt-2">
      {/* Header */}
      <Text className="text-2xl font-bold mb-4  ">{t("about.title")}</Text>

      {/* Purpose */}
      <Text className="text-lg font-semibold mt-3  ">
        {t("about.purposeTitle")}
      </Text>
      <Text className="text-base   mt-2">{t("about.purposeDescription")}</Text>

      {/* Developer */}
      <Text className="text-lg font-semibold mt-6  ">
        {t("about.developerTitle")}
      </Text>
      <Text className="text-base   mt-2">
        {t("about.developerDescription")}
      </Text>

      {/* Version */}
      <Text className="text-lg font-semibold mt-6  ">
        {t("about.versionTitle")}
      </Text>
      <Text className="text-base   mt-2">{appVersion}</Text>

      {/* Data Sources */}
      <Text className="text-lg font-semibold mt-6  ">
        {t("about.dataSourceTitle")}
      </Text>
      <Text className="text-base   mt-2">
        {t("about.dataSourceDescription")}{" "}
        <Text
          className=" text-blue-600 dark:text-blue-400 underline"
          onPress={() =>
            Linking.openURL("https://www.nmpb.gov.sd/detailreport.php?id=7")
          }
        >
          {t("about.dataSourceLinkText")}
        </Text>{" "}
        {t("about.dataSourceYear")}
      </Text>

      {/* Contact */}
      <Text className="text-lg font-semibold mt-6 ">
        {t("about.contactTitle")}
      </Text>

      <Button
        variant="ghost"
        className="justify-start pl-0 "
        onPress={() =>
          Linking.openURL("mailto:mohammedjrt+sudancodexsupport@gmail.com")
        }
      >
        <Text className="  text-blue-600 dark:text-blue-400 underline">
          Mohammedjrt+sudancodexsupport@gmail.com
        </Text>
      </Button>

      <Button
        variant="ghost"
        className="justify-start pl-0 "
        onPress={() => Linking.openURL("https://sudancodex.app/privacy-policy")}
      >
        <Text className=" text-blue-600 dark:text-blue-400 underline">
          {t("about.privacyPolicy")}
        </Text>
      </Button>
      <View>
        <Text className="text-lg font-semibold mt-6">Social</Text>
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
      <Text className="text-center text-xs text-gray-400 dark:text-gray-500 mt-8 mb-4">
        © {new Date().getFullYear()} Mohammed Mahmoud.{" "}
        {t("about.rightsReserved")}
      </Text>
    </ScrollView>
  );
};

export default About;
