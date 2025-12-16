"use client";

import Header from "@/components/stats/Header";
import { data } from "@/components/stats/pharmaceuticalData";
import SummaryStats from "@/components/stats/SummaryStats";
import TopAgents from "@/components/stats/TopAgents";
import TopCompanies from "@/components/stats/TopCompanies";
import TopGenerics from "@/components/stats/TopGenerics";
import { Text } from "@/components/ui/text"; // Import Text component for titles
import React from "react";
import { ScrollView, View } from "react-native";

export default function App() {
  return (
    <ScrollView>
      <Header />
      <SummaryStats data={data.summaryData} />
      <View className="space-y-8 px-6">
        {/* Added padding and spacing */}
        {/* TODO: remove the cards and add a proper table */}
        <Text className="text-2xl font-semibold">Top Companies</Text>
        <TopCompanies companies={data.topCompanies} />
        <Text className="text-2xl font-semibold">Top Agents</Text>
        <TopAgents agents={data.topAgents} />
        <Text className="text-2xl font-semibold">Top Generic Medications</Text>
        <TopGenerics generics={data.topGenerics} />
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}
