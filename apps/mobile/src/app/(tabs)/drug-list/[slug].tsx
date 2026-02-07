import RenderHtml, { type MixedStyleDeclaration } from "@native-html/render";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { ExternalLink, FileX, Info } from "lucide-react-native";
import React, { Suspense } from "react";
import { Trans, useTranslation } from "react-i18next";
import { ActivityIndicator, useWindowDimensions, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useUniwind } from "uniwind";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ViewCount from "@/components/view-count";
import { api } from "@/lib/api-client";
import DrugPropertyDescription from "@/screens/Drug-list/DrugCard/DrugPropertyDescription";

const DrugInfo = () => {
  const { t } = useTranslation();
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const {
    data: drug,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["drugInfo", slug],
    queryFn: async () => {
      const res = await api(`/api/v1/drugs/:slug`, {
        params: { slug },
      });
      if (res.error) {
        throw new Error(`Failed to fetch drug: ${res.error.message}`);
      }

      return res.data;
    },
  });
  if (isError) {
    console.error(error);
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text className='text-destructive'>{t("drugInfo.errorLoading")}</Text>
      </View>
    );
  }
  if (!drug)
    return (
      <ActivityIndicator
        size='large'
        style={{ marginTop: 16 }}
      />
    );
  return (
    <>
      <Stack.Screen options={{ title: drug.brand_name, headerShown: true }} />
      <ScrollView
        // style={{ flex: 1, gap: 2 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        // showsVerticalScrollIndicator={true}
        className='flex-1 gap-4 p-4'>
        <Card className='w-full py-4'>
          <CardTitle className='text-center'>{drug.brand_name}</CardTitle>
          <CardContent className='w-full gap-2'>
            <View className='gap-2'>
              <DrugPropertyDescription
                title={t("drugInfo.genericName")}
                className='border-green-700 dark:border-green-400'
                property={drug.generic_name}
                href={{
                  pathname: "/stats/generics/[slug]",
                  params: { slug: drug.generic?.slug ?? "" },
                }}
              />
              <DrugPropertyDescription
                title={t("drugInfo.strength")}
                className='border-yellow-400'
                property={drug.strength}
              />
              <DrugPropertyDescription
                title={t("drugInfo.packSize")}
                className='border-rose-700 dark:border-rose-400'
                property={drug.pack_size}
              />
              <DrugPropertyDescription
                title={t("drugInfo.dosageForm")}
                className='border-blue-700 dark:border-blue-400'
                property={drug.dosage_form}
              />
              <DrugPropertyDescription
                title={t("drugInfo.companyName")}
                className='border-pink-700 dark:border-pink-400'
                property={drug.company_name}
                href={{
                  pathname: "/stats/companies/[slug]",
                  params: { slug: drug.company?.slug ?? "" },
                }}
              />
              <DrugPropertyDescription
                title={t("drugInfo.agent")}
                property={drug.agent_name}
                className='border-orange-700 dark:border-orange-400'
                href={{
                  // FIXME: remove the ?? "" bc some drugs dosnt have a slug
                  pathname: "/stats/agents/[slug]",
                  params: { slug: drug.agent?.slug ?? "" },
                }}
              />
              <DrugPropertyDescription
                title={t("drugInfo.countryOfOrigin")}
                className='border-violet-700 dark:border-violet-400'
                property={drug.country_name}
              />
            </View>
          </CardContent>
        </Card>
        <ViewCount
          createdAt={drug.createdAt}
          updatedAt={drug.updatedAt}
          url='/api/v1/drugs/:slug/:id/view'
          id={drug.id}
          slug={drug.slug}
        />
        {isError ? (
          <Text className='text-red-500'>{t("drugInfo.errorLoading")}</Text>
        ) : isLoading ? (
          <ActivityIndicator
            size='large'
            style={{ marginTop: 16 }}
          />
        ) : drug ? (
          <Suspense fallback={<ActivityIndicator size='large' />}>
            <DrugAccordionGroup
              generic_name={drug.generic_name || ""}
              slug={drug.slug}
              id={String(drug.drug_info_id)}
            />
          </Suspense>
        ) : (
          <Alert icon={FileX}>
            <AlertTitle className='font-semibold'>
              {t("drugInfo.noDataAvailable")}
            </AlertTitle>
            <AlertDescription className='text-sm leading-5'>
              {t("drugInfo.noDetailsFound", { genericName: drug })}
            </AlertDescription>
          </Alert>
        )}
      </ScrollView>
    </>
  );
};
export default DrugInfo;

const tagsStyles: Readonly<Record<string, MixedStyleDeclaration>> = {
  b: {
    fontStyle: "normal",
    fontWeight: "bold",
  },
  ul: { marginVertical: 8, paddingLeft: 20 },
  li: { marginBottom: 4 },
} as const;

const DrugAccordion = ({
  trigger,
  content,
  width,
  colorSchema,
}: {
  trigger: string;
  content: string | null;
  width: number;
  colorSchema: "light" | "dark" | undefined;
}) => {
  const { t } = useTranslation();
  const html = content || `<p><i>${t("drugInfo.noDataAvailable")}</i></p>`;
  return (
    <AccordionItem
      key={trigger}
      value={trigger}>
      <AccordionTrigger>
        <Text>{trigger.toUpperCase()}</Text>
      </AccordionTrigger>
      <AccordionContent className=''>
        <RenderHtml
          tagsStyles={tagsStyles}
          enableExperimentalBRCollapsing={true}
          contentWidth={width}
          source={{ html }}
          defaultTextProps={{
            style: { color: "white" },
          }}
          baseStyle={{ color: colorSchema === "dark" ? "white" : "black" }}
        />
      </AccordionContent>
    </AccordionItem>
  );
};

const DrugAccordionGroup = ({
  slug,
  id,
  generic_name,
}: {
  generic_name: string;
  slug: string;
  id: string | null;
}) => {
  const { t } = useTranslation();
  const { theme } = useUniwind();
  const width = useWindowDimensions().width;
  const { data } = useSuspenseQuery({
    queryKey: ["drug-info", slug],
    queryFn: () => {
      if (!id) return null;
      return api(`/api/v1/drugs/:slug/:id/info`, { params: { slug, id } });
    },
  });

  if (!data || data.error) {
    return (
      <Alert icon={FileX}>
        <AlertTitle className='font-semibold'>
          {t("drugInfo.noDataAvailable")}
        </AlertTitle>
        <AlertDescription className='text-sm leading-5'>
          {t("drugInfo.noDetailsFound", { genericName: generic_name })}
        </AlertDescription>
      </Alert>
    );
  }
  const info = data.data;
  return (
    <View className='mt-4 gap-4'>
      <View>
        <Tooltip>
          <TooltipTrigger className='flex-row items-center justify-center gap-1 opacity-80 active:opacity-100'>
            <Icon
              as={Info}
              size={18}
            />
            <Text className='text-lg font-bold'>
              {generic_name} = {info.title}
            </Text>
          </TooltipTrigger>
          <TooltipContent>
            <Text>{t("drugInfo.sudanDrugIndexNote")}</Text>
          </TooltipContent>
        </Tooltip>
      </View>
      <View className='mt-4'>
        <Accordion type='multiple'>
          <DrugAccordion
            colorSchema={theme}
            width={width}
            trigger={t("drugInfo.accordion.indications")}
            content={info.ind}
          />
          <DrugAccordion
            colorSchema={theme}
            width={width}
            trigger={t("drugInfo.accordion.classification")}
            content={info.clas}
          />
          <DrugAccordion
            colorSchema={theme}
            width={width}
            trigger={t("drugInfo.accordion.mechanismOfAction")}
            content={info.mode}
          />
          <DrugAccordion
            colorSchema={theme}
            width={width}
            trigger={t("drugInfo.accordion.clinicalUse")}
            content={info.clinical}
          />
          <DrugAccordion
            colorSchema={theme}
            width={width}
            trigger={t("drugInfo.accordion.adultDose")}
            content={info.adult}
          />
          <DrugAccordion
            colorSchema={theme}
            width={width}
            trigger={t("drugInfo.accordion.pediatricDose")}
            content={info.ped}
          />
          <DrugAccordion
            colorSchema={theme}
            width={width}
            trigger={t("drugInfo.accordion.administration")}
            content={info.admin}
          />
          <DrugAccordion
            colorSchema={theme}
            width={width}
            trigger={t("drugInfo.accordion.contraindications")}
            content={info.contra}
          />
          <DrugAccordion
            colorSchema={theme}
            width={width}
            trigger={t("drugInfo.accordion.sideEffects")}
            content={info.side}
          />
          <DrugAccordion
            colorSchema={theme}
            width={width}
            trigger={t("drugInfo.accordion.pregnancy")}
            content={info.prgnancy}
          />
          <DrugAccordion
            colorSchema={theme}
            width={width}
            trigger={t("drugInfo.accordion.majorInteractions")}
            content={info.intermajer}
          />
          <DrugAccordion
            colorSchema={theme}
            width={width}
            trigger={t("drugInfo.accordion.minorInteractions")}
            content={info.interminor}
          />
        </Accordion>
      </View>
      <Alert
        icon={ExternalLink}
        className='border-yellow-500/50'
        iconClassName='text-yellow-500'>
        <AlertTitle className='font-semibold'>
          {t("drugInfo.disclaimer")}
        </AlertTitle>
        <AlertDescription className='text-sm leading-5'>
          <Trans i18nKey='drugInfo.disclaimerDescription'>
            This app provides drug information for
            <Text className='font-semibold'> reference only</Text>. It is not a
            substitute for professional judgment or official product literature.
            Always verify details before prescribing or dispensing.
          </Trans>
        </AlertDescription>
      </Alert>
    </View>
  );
};
