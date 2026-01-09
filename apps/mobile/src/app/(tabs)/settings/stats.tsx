import Header from "@/components/stats/Header";
import { data } from "@/components/stats/pharmaceuticalData";
import { StatTable } from "@/components/stats/StatTable";
import SummaryStats from "@/components/stats/SummaryStats";
import { Text } from "@/components/ui/text";
import React from "react";
import { ScrollView, View } from "react-native";

export default function App() {
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
            Distribution & Rankings
          </Text>
          <Text className='text-sm text-muted-foreground'>
            Detailed breakdown of market leaders across categories
          </Text>
        </View>

        <StatTable
          title='Top Companies'
          data={data.topCompanies}
          labelHeader='Company Name'
          countHeader='Drugs'
        />

        <StatTable
          title='Top Agents'
          data={data.topAgents}
          labelHeader='Agent Name'
          countHeader='Represented'
        />

        <StatTable
          title='Top Generic Medications'
          data={data.topGenerics}
          labelHeader='Generic Name'
          countHeader='Variations'
        />
      </View>

      <View style={{ height: 60 }} />
    </ScrollView>
  );
}
