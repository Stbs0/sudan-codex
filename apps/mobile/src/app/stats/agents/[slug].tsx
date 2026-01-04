import StatsDrugCard from "@/components/stats-drug-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { api } from "@/lib/api-client";
import { LegendList } from "@legendapp/list";
import type { AgentApiResponseType } from "@sudan-codex/db";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";

const AgentScreen = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { data, error, isFetching } = useQuery({
    queryKey: ["drugInfo", slug],

    queryFn: async () => {
      const res = await api(`/api/agents/:slug`, {
        params: {
          slug,
        },
      });
      if (res.error) {
        throw new Error("Failed to fetch drug info");
      }
      return res.data;
    },
  });
  if (isFetching) return <ActivityIndicator size={"large"} />;
  if (error) return <Text>{error.message}</Text>;
  if (!data) return <Text>No data found</Text>;
  const stats = data.stats;
  return (
    <>
      <Stack.Screen options={{ title: data.name }} />
      <ScrollView className='p-4'>
        <View className='mb-8 gap-4'>
          <Card className=''>
            <CardHeader>
              <CardTitle>Total Drugs Represented</CardTitle>
            </CardHeader>
            <CardContent>
              <Text className='text-2xl font-bold'>
                {stats?.total_brands?.toLocaleString() ?? 0}
              </Text>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Associated Companies</CardTitle>
            </CardHeader>
            <CardContent>
              <Text className='text-2xl font-bold'>
                {stats?.related_companies?.toLocaleString() ?? 0}
              </Text>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Associated Generics Name</CardTitle>
            </CardHeader>
            <CardContent>
              <Text className='text-2xl font-bold'>
                {stats?.related_generics?.toLocaleString() ?? 0}
              </Text>
            </CardContent>
          </Card>
        </View>
        <LegendList
          data={data.drugs}
          recycleItems
          ItemSeparatorComponent={() => (
            <View
              collapsable
              className='my-2'
            />
          )}
          className='gap-4'
          renderItem={({ item }) => <AgentAccordion drug={item} />}
          keyExtractor={(drug) => drug.slug}
        />
      </ScrollView>
    </>
  );
};
type Props = {
  drug: AgentApiResponseType["drugs"][0];
};
const AgentAccordion = ({ drug }: Props) => {
  return <StatsDrugCard {...drug} />;
};

export default AgentScreen;
