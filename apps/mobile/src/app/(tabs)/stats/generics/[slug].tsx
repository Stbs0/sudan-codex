import {
  StatsSummaryCard,
  TableBody,
  TableHeader,
} from "@/components/stats-table";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useStatsTable } from "@/hooks/useStatsTable";
import type { GenericApiResponseType } from "@sudan-codex/db/schema";
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, ScrollView, View } from "react-native";

const columnHelper =
  createColumnHelper<GenericApiResponseType["drugs"][number]>();

export default function GenericScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { t } = useTranslation();

  const { data, error, isFetching, sorting, setSorting } = useStatsTable({
    url: "/api/v1/generics/:slug",
    qKey: "generics",
    slug,
  });
  const columns = useMemo(
    () => [
      columnHelper.accessor("brand_name", {
        header: t("stats.table.headers.brand"),
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
      columnHelper.accessor("company_name", {
        header: t("stats.table.headers.company"),
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
        header: t("stats.table.headers.pack"),
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
      columnHelper.accessor("agent_name", {
        header: t("stats.table.headers.agent"),
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
    [t]
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
        <Text className='text-muted-foreground mt-4'>
          {t("stats.status.loadingGeneric")}
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className='flex-1 items-center justify-center p-4'>
        <Text className='text-destructive text-center'>
          {t("stats.status.errorGeneric")}
        </Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View className='flex-1 items-center justify-center p-4'>
        <Text className='text-muted-foreground text-center'>
          {t("stats.status.noDataGeneric")}
        </Text>
      </View>
    );
  }
  const stats = data.stats;

  return (
    <>
      <Stack.Screen options={{ title: data.name }} />
      <ScrollView className='bg-background flex-1'>
        {/* Stats Cards */}
        <StatsSummaryCard
          totalBrands={stats.total_brands}
          firstStats={stats.related_companies}
          secondStats={stats.related_agents}
          firstAssociation='Companies'
          secondAssociation='Agents'
        />
        {/* Table */}
        <View className='px-4 pb-4'>
          <Card className='overflow-hidden border-t-0 pt-0'>
            <CardContent className='p-0'>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={true}
                className='border-border border-t pt-0'>
                <View className='min-w-full'>
                  {/* Table Header */}
                  <View className='bg-accent from-muted to-muted/80 flex-row bg-linear-to-r shadow-xs'>
                    {table.getHeaderGroups().map((headerGroup) =>
                      headerGroup.headers.map((header, index) => (
                        <TableHeader<GenericApiResponseType>
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
                    <TableBody<GenericApiResponseType>
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
}
