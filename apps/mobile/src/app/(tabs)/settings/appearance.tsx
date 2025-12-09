import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import i18n from "@/lib/i18next";
import * as Haptics from "expo-haptics";
import { Moon, Sun } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { usePostHog } from "posthog-react-native";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Alert, View } from "react-native";
import { useMMKVString } from "react-native-mmkv";

const Appearance = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const { t } = useTranslation();
  const isDark = colorScheme === "dark";
  const switchTheme = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    toggleColorScheme();
  };
  return (
    <View className="p-4 gap-4 flex-1">
      <Card className="">
        <CardHeader>
          <CardTitle className="text-lg">{t("settings.changeTheme")}</CardTitle>
        </CardHeader>
        <CardContent className="flex-row items-center justify-center gap-4">
          <Icon as={Sun} size={20} />
          <Switch
            nativeID="theme-switch"
            className="scale-150"
            checked={isDark}
            onCheckedChange={switchTheme}
          />
          <Icon as={Moon} size={20} />
        </CardContent>
      </Card>
      <LanguageChangeCard />
    </View>
  );
};

export default Appearance;

/** Centralized language definitions */
const LANGUAGE_OPTIONS = [
  { label: "English", lang: "en" },
  {
    lang: "ar",
    label: "العربية",
  },
];
const LanguageChangeCard = () => {
  const [lang, setLang] = useMMKVString("user.settings.language.code");
  const { t } = useTranslation();
  const posthog = usePostHog();
  const switchLanguage = useCallback(
    async (newLang: string) => {
      const currentLang = i18n.language;
      if (newLang === currentLang) return;

      // Find language definition
      const langDef = LANGUAGE_OPTIONS.find((l) => l.lang === newLang);
      if (!langDef) return;

      // Store user language

      // Change language in i18n
      try {
        await i18n.changeLanguage(langDef.lang);
        posthog.capture("language_change");
      } catch (error) {
        console.error("Error changing language:", error);
        Alert.alert("Error", "Failed to change language.");
        posthog.captureException(error, { label: "language_change_error" });
        return;
      }
      setLang(langDef.lang);

      // setRtl(!rtl);

      // Alert.alert(
      //   t("settings.languageChange", { lang: langDef.label }),
      //   t("settings.restartRequired"),
      //   [
      //     {
      //       text: t("settings.restartNow"),
      //       onPress: () => Updates.reloadAsync(),
      //     },
      //   ],
      // );
    },
    [setLang, posthog],
  );
  function onLabelPress(lang: string) {
    return () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      switchLanguage(lang);
    };
  }
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-lg">
          {t("settings.changeLanguage")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={lang} onValueChange={switchLanguage}>
          {LANGUAGE_OPTIONS.map(({ lang, label }) => (
            <View key={lang} className="flex flex-row items-center gap-3">
              <RadioGroupItem value={lang} id={lang} />
              <Label onPress={onLabelPress(lang)}>{label}</Label>
            </View>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};
