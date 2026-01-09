import Header from "@/components/stats/Header";
import { data } from "@/components/stats/pharmaceuticalData";
import { StatTable } from "@/components/stats/StatTable";
import SummaryStats from "@/components/stats/SummaryStats";
import { Text } from "@/components/ui/text";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";

export default function App() {
  const { t } = useTranslation();

  return (
    <ScrollView
      className='flex-1 bg-background'
      showsVerticalScrollIndicator={false}>
      <Header />
      <View className=''>
        <SummaryStats data={data.summaryData} />
      </View>

      <View className='space-y-2 px-6'>
        <View className='mb-4'>
          <Text className='text-xl font-bold text-foreground'>
            {t("stats.sections.distributionTitle")}
          </Text>
          <Text className='text-sm text-muted-foreground'>
            {t("stats.sections.distributionSubtitle")}
          </Text>
        </View>

        <StatTable
          title={t("stats.sections.topCompanies")}
          data={data.topCompanies}
          labelHeader={t("stats.table.headers.company")}
          countHeader={t("stats.table.headers.drugs")}
        />

        <StatTable
          title={t("stats.sections.topAgents")}
          data={data.topAgents}
          labelHeader={t("stats.table.headers.agent")}
          countHeader={t("stats.table.headers.represented")}
        />

        <StatTable
          title={t("stats.sections.topGenerics")}
          data={data.topGenerics}
          labelHeader={t("stats.table.headers.generic")}
          countHeader={t("stats.table.headers.variations")}
        />
      </View>

      <View style={{ height: 60 }} />
    </ScrollView>
  );
}
