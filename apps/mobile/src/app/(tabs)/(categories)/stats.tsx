"use client";

import Header from "@/components/tes/Header";
import { data } from "@/components/tes/pharmaceuticalData";
import SummaryStats from "@/components/tes/SummaryStats";
import TopAgents from "@/components/tes/TopAgents";
import TopCompanies from "@/components/tes/TopCompanies";
import TopGenerics from "@/components/tes/TopGenerics";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function App() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header />
      <SummaryStats data={data.summaryData} />
      <TopCompanies companies={data.topCompanies} />
      <TopAgents agents={data.topAgents} />
      <TopGenerics generics={data.topGenerics} />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0f1419",
  },
  container: {
    flex: 1,
    backgroundColor: "#0f1419",
  },
});
