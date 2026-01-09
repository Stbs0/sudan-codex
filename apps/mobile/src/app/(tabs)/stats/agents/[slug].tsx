import {
  StatsSummaryCard,
  TableBody,
  TableHeader,
  type DrugResponseType,
} from "@/components/stats-table";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useStatsTable } from "@/hooks/useStatsTable";
import type { AgentApiResponseType } from "@sudan-codex/db";
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";

const columnHelper =
  createColumnHelper<DrugResponseType<AgentApiResponseType>>();

const AgentScreen = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { data, error, isFetching, sorting, setSorting } = useStatsTable({
    url: "/api/agents/:slug",
    qKey: "agents",
    slug,
  });

  const columns = useMemo(
    () => [
      columnHelper.accessor("brand_name", {
        header: "Brand",
        sortingFn: "alphanumeric",
        size: 150,
        cell: (info) => (
          <View className='gap-0.5'>
            <Text
              className='text-xs font-bold text-neutral-700 dark:text-blue-200'
              numberOfLines={2}
              ellipsizeMode='tail'>
              {info.getValue() || "NAD"}
            </Text>
            <Text
              className='text-[10px] text-neutral-500 dark:text-neutral-400'
              numberOfLines={1}
              ellipsizeMode='tail'>
              {info.row.original.strength || "NAD"}
            </Text>
          </View>
        ),
      }),
      columnHelper.accessor("generic_name", {
        header: "Generic",
        sortingFn: "alphanumeric",
        size: 180,
        cell: (info) => (
          <Text
            className='text-xs font-semibold text-green-600 dark:text-green-400'
            numberOfLines={3}
            ellipsizeMode='tail'>
            {info.getValue() || "NAD"}
          </Text>
        ),
      }),
      columnHelper.accessor("pack_size", {
        header: "Pack",
        sortingFn: "alphanumeric",
        size: 100,
        cell: (info) => (
          <Text
            className='text-[10px] text-rose-700 dark:text-rose-400'
            numberOfLines={3}
            ellipsizeMode='tail'>
            {info.getValue() || "NAD"}
          </Text>
        ),
      }),
      columnHelper.accessor("company_name", {
        header: "Company",
        sortingFn: "alphanumeric",
        size: 150,
        cell: (info) => (
          <Text
            className='text-[10px] font-medium text-pink-700 dark:text-pink-400'
            numberOfLines={3}
            ellipsizeMode='tail'>
            {info.getValue() || "NAD"}
          </Text>
        ),
      }),
    ],
    []
  );
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: data?.drugs ?? [],
    columns,
    state: {
      sorting,
    },
    // initialState: {
    //   sorting: [{ id: "brand_name", desc: false }],
    // },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isFetching) {
    return (
      <View className='flex-1 items-center justify-center'>
        <ActivityIndicator size='large' />
        <Text className='mt-4 text-muted-foreground'>
          Loading agent details...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className='flex-1 items-center justify-center p-4'>
        <Text className='text-center text-destructive'>
          Failed to load agent information. Please try again.
        </Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View className='flex-1 items-center justify-center p-4'>
        <Text className='text-center text-muted-foreground'>
          No agent data available for this entry.
        </Text>
      </View>
    );
  }
  const stats = data.stats;

  return (
    <>
      <Stack.Screen options={{ title: data.name }} />
      <ScrollView className='flex-1 bg-background'>
        {/* Stats Cards */}
        <StatsSummaryCard
          totalBrands={stats.total_brands}
          firstStats={stats.related_generics}
          secondStats={stats.related_companies}
          firstAssociation='Generics'
          secondAssociation='Companies'
        />
        {/* Table */}
        <View className='px-4 pb-4'>
          <Card className='overflow-hidden border-t-0 pt-0'>
            <CardContent className='p-0'>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={true}
                className='border-t border-border pt-0'>
                <View className='min-w-full'>
                  {/* Table Header */}
                  <View className='flex-row bg-accent bg-gradient-to-r from-muted to-muted/80 shadow-sm'>
                    {table.getHeaderGroups().map((headerGroup) =>
                      headerGroup.headers.map((header, index) => (
                        <TableHeader<AgentApiResponseType>
                          key={header.id}
                          header={header}
                          index={index}
                          headerGroup={headerGroup}
                        />
                      ))
                    )}
                  </View>

                  {/* Table Body */}
                  {table.getRowModel().rows.map((row, rowIndex) => (
                    <TableBody<AgentApiResponseType>
                      row={row}
                      key={row.id}
                      rowIndex={rowIndex}
                    />
                  ))}
                </View>
              </ScrollView>
            </CardContent>
          </Card>
        </View>
      </ScrollView>
    </>
  );
};

export default AgentScreen;
