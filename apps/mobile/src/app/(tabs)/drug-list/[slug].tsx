import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, useWindowDimensions } from "react-native";
import RenderHtml, {
  type MixedStyleDeclaration,
} from "react-native-render-html";
const DrugInfo = () => {
  const { t } = useTranslation();
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { width } = useWindowDimensions();
  const { colorScheme } = useColorScheme();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ title: drug.brandName });
  }, [navigation, drug.brandName]);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["drugInfo", drug.drugInfoRef],

    queryFn: async () => {
      return [];
    },
  });

  return (
    <ScrollView
      // style={{ flex: 1, gap: 2 }}
      contentContainerStyle={{ padding: 16 }}
      showsVerticalScrollIndicator={true}
      className='flex-1 gap-4'>
      <Button>
        <Text>Back</Text>
      </Button>
      {/* <Card className='mb-4 w-full py-4'>
        <CardTitle className='text-center'>{drug.brandName}</CardTitle>
        <CardContent className='w-full gap-2'>
          <View className='gap-2'>
            <DrugPropertyDescription
              title={t("drugInfo.genericName")}
              className='border-green-700 dark:border-green-400'
              property={drug.genericName}
            />
            <DrugPropertyDescription
              title={t("drugInfo.strength")}
              className='border-yellow-400'
              property={drug.strength}
            />
            <DrugPropertyDescription
              title={t("drugInfo.packSize")}
              className='border-rose-700 dark:border-rose-400'
              property={drug.packSize}
            />
            <DrugPropertyDescription
              title={t("drugInfo.dosageForm")}
              className='border-blue-700 dark:border-blue-400'
              property={drug.dosageFormName}
            />
            <DrugPropertyDescription
              title={t("drugInfo.companyName")}
              className='border-pink-700 dark:border-pink-400'
              property={drug.companyName}
            />
            <DrugPropertyDescription
              title={t("drugInfo.agent")}
              property={drug.agentName}
              className='border-orange-700 dark:border-orange-400'
            />
            <DrugPropertyDescription
              title={t("drugInfo.countryOfOrigin")}
              className='border-violet-700 dark:border-violet-400'
              property={drug.countryOfOrigin}
            />
          </View>
        </CardContent>
      </Card>
      {isError ? (
        <Text className='text-red-500'>{t("drugInfo.errorLoading")}</Text>
      ) : isLoading ? (
        <ActivityIndicator
          size='large'
          style={{ marginTop: 16 }}
        />
      ) : data ? (
        <View className='mt-4 gap-4'>
          <View>
            <Tooltip>
              <TooltipTrigger className='flex-row items-center justify-center gap-1 opacity-80 active:opacity-100'>
                <Icon
                  as={Info}
                  size={18}
                />
                <Text className='text-lg font-bold'>
                  {drug.genericName} = {data.title}
                </Text>
              </TooltipTrigger>

              <TooltipContent>
                <Text>{t("drugInfo.sudanDrugIndexNote")}</Text>
              </TooltipContent>
            </Tooltip>
          </View>
          <View className='mt-4'>
            <Accordion
              type='multiple'
              collapsible>
              <DrugAccordion
                colorSchema={colorScheme}
                width={width}
                trigger={t("drugInfo.accordion.indications")}
                content={data.ind}
              />
              <DrugAccordion
                colorSchema={colorScheme}
                width={width}
                trigger={t("drugInfo.accordion.classification")}
                content={data.clas}
              />
              <DrugAccordion
                colorSchema={colorScheme}
                width={width}
                trigger={t("drugInfo.accordion.mechanismOfAction")}
                content={data.mode}
              />
              <DrugAccordion
                colorSchema={colorScheme}
                width={width}
                trigger={t("drugInfo.accordion.clinicalUse")}
                content={data.clinical}
              />
              <DrugAccordion
                colorSchema={colorScheme}
                width={width}
                trigger={t("drugInfo.accordion.adultDose")}
                content={data.adult}
              />
              <DrugAccordion
                colorSchema={colorScheme}
                width={width}
                trigger={t("drugInfo.accordion.pediatricDose")}
                content={data.ped}
              />
              <DrugAccordion
                colorSchema={colorScheme}
                width={width}
                trigger={t("drugInfo.accordion.administration")}
                content={data.admin}
              />
              <DrugAccordion
                colorSchema={colorScheme}
                width={width}
                trigger={t("drugInfo.accordion.contraindications")}
                content={data.contra}
              />
              <DrugAccordion
                colorSchema={colorScheme}
                width={width}
                trigger={t("drugInfo.accordion.sideEffects")}
                content={data.side}
              />
              <DrugAccordion
                colorSchema={colorScheme}
                width={width}
                trigger={t("drugInfo.accordion.pregnancy")}
                content={data.prgnancy}
              />
              <DrugAccordion
                colorSchema={colorScheme}
                width={width}
                trigger={t("drugInfo.accordion.majorInteractions")}
                content={data.intermajer}
              />
              <DrugAccordion
                colorSchema={colorScheme}
                width={width}
                trigger={t("drugInfo.accordion.minorInteractions")}
                content={data.interminor}
              />
            </Accordion>
          </View>
          <Alert
            icon={AlertCircle}
            className='border-yellow-500/50'
            iconClassName='text-yellow-500'>
            <AlertTitle className='font-semibold'>
              {t("drugInfo.disclaimer")}
            </AlertTitle>
            <AlertDescription className='text-sm leading-5'>
              <Trans i18nKey='drugInfo.disclaimerDescription'>
                This app provides drug information for
                <Text className='font-semibold'> reference only</Text>. It is
                not a substitute for professional judgment or official product
                literature. Always verify details before prescribing or
                dispensing.
              </Trans>
            </AlertDescription>
          </Alert>
        </View>
      ) : (
        <Alert icon={FileX}>
          <AlertTitle className='font-semibold'>
            {t("drugInfo.noDataAvailable")}
          </AlertTitle>
          <AlertDescription className='text-sm leading-5'>
            {t("drugInfo.noDetailsFound", { genericName: drug.genericName })}
          </AlertDescription>
        </Alert>
      )} */}
    </ScrollView>
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
  content: string;
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
          // defaultTextProps={{
          //   style: { color: "white" },
          // }}
          baseStyle={{ color: colorSchema === "dark" ? "white" : "black" }}
        />
      </AccordionContent>
    </AccordionItem>
  );
};
