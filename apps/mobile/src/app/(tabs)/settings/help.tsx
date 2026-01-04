import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import type { Drug } from "@sudan-codex/db";
import * as Linking from "expo-linking";
import { usePostHog } from "posthog-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Alert, Text, View, type TextProps } from "react-native";

const Help = () => {
  const { t } = useTranslation();

  return (
    <View className='flex-1 gap-4 p-4'>
      <Card className=''>
        <CardHeader>
          <CardTitle className='text-lg'>
            {t("settings.cardInformation")}
          </CardTitle>
          <CardDescription>
            {t("settings.cardInformationDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DrugCardSettings
            {...{
              agent_name: "Raheeg Medical Co.Ltd",
              brand_name: "Glucar",
              company_name: "Glenmark Pharmaceuticals Ltd",
              country_name: "India",
              dosage_form: "Tablet",
              generic_name: "Acarbose",
              no: "1974",
              pack_size: "100 Tablets",
              strength: "50 mg",
            }}
          />
        </CardContent>
      </Card>
      <WhatsAppBtn />
    </View>
  );
};
const WhatsAppBtn = () => {
  const { t } = useTranslation();
  const posthog = usePostHog();
  const phoneNumber = "+966565621620"; // Replace with your desired phone number
  const message = t("settings.help.whatsApp.message");
  const whatsappUrl = `https://wa.me/${phoneNumber.replace("+", "")}?text=${encodeURIComponent(message)}`;
  const openWhatsApp = async () => {
    try {
      await Linking.openURL(whatsappUrl);
      posthog.capture("whatsApp_btn_clicked");
    } catch (error) {
      posthog.captureException(error, { label: "whatsApp_btn_error" });
      console.error("Error opening WhatsApp:", error);
      Alert.alert("Error", "Failed to open WhatsApp.");
    }
  };
  return (
    <Button
      className='items-center justify-center bg-green-400'
      onPress={openWhatsApp}>
      <Text className='text-white dark:text-white'>
        {t("settings.help.whatsApp.btn")}
      </Text>
      <FontAwesome6
        name='whatsapp'
        size={24}
        color='#fff'
      />
    </Button>
  );
};
export default Help;

type TooltipTextProps = TextProps & {
  tooltip: string;
  children: React.ReactNode;
};

export const TooltipText = ({
  tooltip,
  children,
  ...props
}: TooltipTextProps) => (
  <Tooltip>
    <TooltipTrigger>
      <Text {...props}>{children}</Text>
    </TooltipTrigger>
    <TooltipContent>
      <Text>{tooltip}</Text>
    </TooltipContent>
  </Tooltip>
);

const DrugCardSettings = ({
  brand_name,
  generic_name,
  dosage_form,
  strength,
  pack_size,
  company_name,
  country_name,
  agent_name,
}: Pick<
  Drug,
  | "brand_name"
  | "generic_name"
  | "dosage_form"
  | "strength"
  | "pack_size"
  | "company_name"
  | "country_name"
  | "agent_name"
>) => {
  const { t } = useTranslation();
  return (
    <Card className='rounded-none border-2 py-2 shadow-md shadow-black'>
      <CardContent className='gap-1'>
        <View className='gap-1'>
          <View className='flex-row flex-nowrap'>
            <TooltipText tooltip={t("settings.tooltips.brandAndStrength")}>
              <Text className='font-extrabold text-neutral-700 underline decoration-rose-500 dark:text-blue-200'>
                {(brand_name || "NAD") + " " + (strength || "NAD")}
              </Text>
            </TooltipText>

            <Text className='font-bold'> — </Text>

            <TooltipText tooltip={t("settings.tooltips.packSize")}>
              <Text
                className='text-rose-500 underline decoration-rose-500 dark:text-rose-400'
                numberOfLines={1}
                ellipsizeMode='tail'>
                {pack_size || "NAD"}
              </Text>
            </TooltipText>
          </View>

          <View className='flex-row gap-1'>
            <TooltipText tooltip={t("settings.tooltips.genericName")}>
              <Text className='font-extrabold text-green-500 underline decoration-rose-500 dark:text-green-400'>
                {generic_name || "NAD"}
              </Text>
            </TooltipText>

            <Text className='font-bold'> — </Text>

            <TooltipText tooltip={t("settings.tooltips.dosageForm")}>
              <Text className='font-bold text-blue-700 underline decoration-rose-500 dark:text-blue-400'>
                {dosage_form || "NAD"}
              </Text>
            </TooltipText>
          </View>
        </View>

        <View className='items-start gap-1'>
          <TooltipText tooltip={t("settings.tooltips.manufacturer")}>
            <Text className='text-sm font-bold text-pink-700 underline decoration-rose-500 dark:text-pink-400'>
              {company_name || "NAD"}
            </Text>
          </TooltipText>

          <TooltipText tooltip={t("settings.tooltips.distributor")}>
            <Text className='text-sm font-bold text-orange-700 underline decoration-rose-500 dark:text-orange-400'>
              {agent_name || "NAD"}
            </Text>
          </TooltipText>

          <TooltipText tooltip={t("settings.tooltips.origin")}>
            <Text className='text-sm font-bold text-violet-500 underline decoration-rose-500 dark:text-violet-400'>
              {country_name || "NAD"}
            </Text>
          </TooltipText>
        </View>
      </CardContent>
    </Card>
  );
};
