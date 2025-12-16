import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import DrugCard from "@/screens/Drug-list/DrugCard/DrugCard";
import type { AgentsDrugs, AgentTypes } from "@/types";
import { LegendList } from "@legendapp/list";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";

const AgentScreen = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { data, isError } = useQuery<AgentTypes>({
    queryKey: ["drugInfo", slug],

    queryFn: async () => {
      const res = await fetch(
        process.env.EXPO_PUBLIC_BACKEND_URI + `/api/agents/${slug}`,
      );
      if (!res.ok) {
        throw new Error(`Failed to fetch drug info: ${res.status}`);
      }
      return await res.json();
    },
  });
  if (!data) return <ActivityIndicator size={"large"} />;

  const stats = data.stats;
  return (
    <>
      <Stack.Screen options={{ title: data.name }} />
      <ScrollView className="p-4">
        <View className="mb-8 gap-4">
          <Card className="">
            <CardHeader>
              <CardTitle>Total Drugs Represented</CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="text-2xl font-bold">
                {stats?.total_brands?.toLocaleString() ?? 0}
              </Text>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Associated Companies</CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="text-2xl font-bold">
                {stats?.related_companies?.toLocaleString() ?? 0}
              </Text>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Associated Generics Name</CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="text-2xl font-bold">
                {stats?.related_generics?.toLocaleString() ?? 0}
              </Text>
            </CardContent>
          </Card>
        </View>
        <LegendList
          data={data.drugs}
          recycleItems
          ItemSeparatorComponent={() => <View collapsable className="my-2" />}
          className="gap-4"
          renderItem={({ item }) => <AgentAccordion drug={item} />}
          keyExtractor={(drug) => drug.slug}
        />
      </ScrollView>
    </>
  );
};
type Prop = {
  drug: AgentsDrugs;
};
const AgentAccordion = ({ drug }: Prop) => {
  return <DrugCard {...drug} />;
};

export default AgentScreen;
