import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Constants from "expo-constants";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, Linking, ScrollView, View } from "react-native";
import { useUniwind } from "uniwind";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";

const logos = [
  require("@/assets/images/f-logo/lgthj-01.png"),
  require("@/assets/images/f-logo/lgthj-02.png"),
  require("@/assets/images/f-logo/lgthj-03.png"),
  require("@/assets/images/f-logo/lgthj-04.png"),
  require("@/assets/images/f-logo/lgthj-05.png"),
  require("@/assets/images/f-logo/lgthj-06.png"),
  require("@/assets/images/f-logo/lgthj-07.png"),
  require("@/assets/images/f-logo/lgthj-08.png"),
  require("@/assets/images/f-logo/lgthj-09.png"),
  require("@/assets/images/f-logo/lgthj-10.png"),
  require("@/assets/images/f-logo/lgthj-11.png"),
  require("@/assets/images/f-logo/lgthj-12.png"),
];
const About = () => {
  const { t } = useTranslation();
  const { theme } = useUniwind();
  const appVersion = Constants.expoConfig?.version || "1.0.0";
  const isDark = theme === "dark";

  return (
    <ScrollView
      className='flex-1 bg-white dark:bg-slate-950'
      contentInsetAdjustmentBehavior='automatic'
      contentContainerStyle={{ paddingBottom: 60 }}>
      {/* Hero Section */}
      <View className='items-center justify-center border-b border-slate-100 bg-slate-50/50 py-16 dark:border-slate-900 dark:bg-slate-900/40'>
        <View className='rounded-3xl bg-slate-100 p-4 shadow-xl shadow-slate-200 dark:bg-slate-800 dark:shadow-black/50'>
          <Image
            source={
              isDark
                ? require("@/assets/images/f-logo/lgthj-02.png")
                : require("@/assets/images/f-logo/lgthj-01.png")
            }
            className='h-32 w-32'
            resizeMode='contain'
          />
        </View>
        <Text className='mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white'>
          Sudan Codex
        </Text>
        <Text className='mt-2 text-slate-500 dark:text-slate-400'>
          {t("about.versionTitle")} {appVersion}
        </Text>
      </View>

      <View className='mt-8 gap-y-6 px-5'>
        {/* Purpose */}
        <Card>
          <CardHeader className='flex-row items-center gap-x-3'>
            <View className='rounded-xl bg-blue-100 p-2.5 dark:bg-blue-900/30'>
              <FontAwesome6
                name='circle-info'
                size={18}
                color='#3b82f6'
              />
            </View>
            <CardTitle className='text-xl'>{t("about.purposeTitle")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Text className='text-base leading-relaxed text-slate-600 dark:text-slate-300'>
              {t("about.purposeDescription")}
            </Text>
          </CardContent>
        </Card>

        {/* Developer */}
        <Card>
          <CardHeader className='flex-row items-center gap-x-3'>
            <View className='rounded-xl bg-purple-100 p-2.5 dark:bg-purple-900/30'>
              <FontAwesome6
                name='code'
                size={18}
                color='#a855f7'
              />
            </View>
            <CardTitle className='text-xl'>
              {t("about.developerTitle")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Text className='text-base leading-relaxed text-slate-600 dark:text-slate-300'>
              {t("about.developerDescription")}
            </Text>
          </CardContent>
        </Card>

        {/* Logo Designer */}
        <Card>
          <CardHeader className='flex-row items-center gap-x-3'>
            <View className='rounded-xl bg-amber-100 p-2.5 dark:bg-amber-900/30'>
              <FontAwesome6
                name='palette'
                size={18}
                color='#f59e0b'
              />
            </View>
            <CardTitle className='text-xl'>
              {t("about.logoDesignerTitle")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Text className='text-base text-slate-600 dark:text-slate-300'>
              {t("about.nameofDesigner")}
            </Text>
            <Button
              variant='link'
              className='mt-2 h-auto justify-start p-0'
              onPress={() => Linking.openURL("mailto:fuad.obed@hotmail.com")}>
              <Text className='text-base font-medium text-blue-600 dark:text-blue-400'>
                fuad.obed@hotmail.com
              </Text>
            </Button>
          </CardContent>
        </Card>

        {/* Data Sources */}
        <Card>
          <CardHeader className='flex-row items-center gap-x-3'>
            <View className='rounded-xl bg-emerald-100 p-2.5 dark:bg-emerald-900/30'>
              <FontAwesome6
                name='database'
                size={18}
                color='#10b981'
              />
            </View>
            <CardTitle className='text-xl'>
              {t("about.dataSourceTitle")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Text className='text-base leading-relaxed text-slate-600 dark:text-slate-300'>
              {t("about.dataSourceDescription")}{" "}
              <Text
                className='font-medium text-blue-600 underline dark:text-blue-400'
                onPress={() =>
                  Linking.openURL(
                    "https://www.nmpb.gov.sd/detailreport.php?id=7"
                  )
                }>
                {t("about.dataSourceLinkText")}
              </Text>{" "}
              {t("about.dataSourceYear")}
            </Text>
          </CardContent>
        </Card>

        {/* Contact & Legal */}
        <Card>
          <CardHeader className='flex-row items-center gap-x-3'>
            <View className='rounded-xl bg-rose-100 p-2.5 dark:bg-rose-900/30'>
              <FontAwesome6
                name='envelope'
                size={18}
                color='#f43f5e'
              />
            </View>
            <CardTitle className='text-xl'>{t("about.contactTitle")}</CardTitle>
          </CardHeader>
          <CardContent className='gap-y-3'>
            <Button
              variant='ghost'
              className='h-auto justify-start px-0 py-2'
              onPress={() => Linking.openURL("mailto:mohammedjrt@gmail.com")}>
              <View className='flex-row items-center gap-x-3'>
                <FontAwesome6
                  name='at'
                  size={14}
                  color={isDark ? "#94a3b8" : "#64748b"}
                />
                <Text className='text-base font-medium text-slate-700 dark:text-slate-200'>
                  mohammedjrt@gmail.com
                </Text>
              </View>
            </Button>

            <Button
              variant='ghost'
              className='h-auto justify-start px-0 py-2'
              onPress={() =>
                Linking.openURL("https://sudancodex.app/privacy-policy")
              }>
              <View className='flex-row items-center gap-x-3'>
                <FontAwesome6
                  name='shield-halved'
                  size={14}
                  color={isDark ? "#94a3b8" : "#64748b"}
                />
                <Text className='text-base font-medium text-slate-700 dark:text-slate-200'>
                  {t("about.privacyPolicy")}
                </Text>
              </View>
            </Button>
          </CardContent>
        </Card>

        {/* Social */}
        <Card>
          <CardHeader className='flex-row items-center gap-x-3'>
            <View className='rounded-xl bg-sky-100 p-2.5 dark:bg-sky-900/30'>
              <FontAwesome6
                name='share-nodes'
                size={18}
                color='#0ea5e9'
              />
            </View>
            <CardTitle className='text-xl'>{t("about.socialTitle")}</CardTitle>
          </CardHeader>
          <CardContent>
            <View className='flex-row justify-between py-2'>
              <Button
                variant='ghost'
                className='h-14 w-14 rounded-2xl bg-slate-50 dark:bg-slate-900'
                onPress={() =>
                  Linking.openURL("https://www.facebook.com/stbs66/")
                }>
                <FontAwesome6
                  name='facebook'
                  size={24}
                  color={isDark ? "#fff" : "#1877F2"}
                />
              </Button>
              <Button
                variant='ghost'
                className='h-14 w-14 rounded-2xl bg-slate-50 dark:bg-slate-900'
                onPress={() => Linking.openURL("https://x.com/stbs66")}>
                <FontAwesome6
                  name='x-twitter'
                  size={24}
                  color={isDark ? "#fff" : "#0f172a"}
                />
              </Button>
              <Button
                variant='ghost'
                className='h-14 w-14 rounded-2xl bg-slate-50 dark:bg-slate-900'
                onPress={() =>
                  Linking.openURL("https://github.com/stbs0/sudan-codex")
                }>
                <FontAwesome6
                  name='github'
                  size={24}
                  color={isDark ? "#fff" : "#1e293b"}
                />
              </Button>
            </View>
          </CardContent>
        </Card>
      </View>

      {/* All Logos Carousel */}
      <View className='mt-10'>
        <Text className='mb-4 px-5 text-sm font-bold tracking-widest text-slate-400 uppercase dark:text-slate-500'>
          {t("about.logos")}
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}>
          {logos.map((source, index) => (
            <View
              key={`logo-${index}`}
              className='items-center justify-center rounded-2xl border border-slate-200 bg-slate-500 p-4 shadow-sm dark:border-slate-700'>
              <Image
                source={source}
                className='h-24 w-24'
                resizeMode='contain'
              />
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Footer */}
      <View className='mt-12 px-5'>
        <Text className='text-center text-xs leading-5 text-slate-400 dark:text-slate-500'>
          © {new Date().getFullYear()} Mohammed Mahmoud.{"\n"}
          {t("about.rightsReserved")}
        </Text>
      </View>
    </ScrollView>
  );
};

export default About;
