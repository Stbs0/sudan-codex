import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useStatsTable } from "@/hooks/useStatsTable";
import type { CompanyApiResponseType } from "@sudan-codex/db/schema";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type Header,
  type HeaderGroup,
  type Row,
} from "@tanstack/react-table";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowDownNarrowWide,
  ArrowUpDown,
  ArrowUpNarrowWide,
} from "lucide-react-native";
import React, { useMemo } from "react";
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

export type DrugData = CompanyApiResponseType["drugs"][number];

const columnHelper = createColumnHelper<DrugData>();

const CompanyScreen = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { data, error, isFetching, sorting, setSorting } = useStatsTable({
    url: "/api/companies/:slug",
    qKey: "companies",
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
      columnHelper.accessor("agent_name", {
        header: "Agent",
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
          Loading company details...
        </Text>
      </View>
    );
  }
  console.log(error);
  if (error) {
    return (
      <View className='flex-1 items-center justify-center p-4'>
        <Text className='text-center text-destructive'>
          Failed to load company information. Please try again.
        </Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View className='flex-1 items-center justify-center p-4'>
        <Text className='text-center text-muted-foreground'>
          No company data available for this entry.
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
        <StatsTable stats={stats} />
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
                        <TableHeader
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
                    <TableBody
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
type TableBodyProps = {
  row: Row<DrugData>;
  rowIndex: number;
};
const TableBody = ({ row, rowIndex }: TableBodyProps) => {
  // TODO: FIXME: backe button whne navigated goes to drug list screen rather than this
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: "/drug-list/[slug]",
          params: { slug: row.original.slug },
        });
      }}
      className={`border-b border-border/30 active:bg-accent/30 ${
        rowIndex % 2 === 0 ? "bg-card" : "bg-muted/20"
      }`}>
      <View className='min-h-[70px] flex-row'>
        {row.getVisibleCells().map((cell, cellIndex) => (
          <View
            key={cell.id}
            style={{ width: cell.column.getSize() }}
            className={`justify-center border-r border-border/30 p-2 ${
              cellIndex === row.getVisibleCells().length - 1 ? "border-r-0" : ""
            }`}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};

type TableHeaderProps = {
  header: Header<DrugData, unknown>;

  index: number;
  headerGroup: HeaderGroup<DrugData>;
};
const TableHeader = ({ header, index, headerGroup }: TableHeaderProps) => {
  // the sort icon will not render when clicked on the table head

  "use no memo";

  return (
    <TouchableOpacity
      onPress={header.column.getToggleSortingHandler()}
      disabled={!header.column.getCanSort()}
      className={`border-r p-3 active:bg-muted/50 ${
        index === headerGroup.headers.length - 1
          ? "border-r-0 border-border/50"
          : ""
      }`}
      style={{
        width: header.getSize(),
      }}>
      <View className='flex-row items-center gap-1.5'>
        <Text className='text-xs font-extrabold uppercase tracking-wide text-foreground/90'>
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
        </Text>

        {header.column.getIsSorted() ? (
          <View className='rounded-full bg-primary/10'>
            <Text className='text-xs font-bold text-primary'>
              {header.column.getIsSorted() === "asc" ? (
                <Icon
                  as={ArrowUpNarrowWide}
                  size={12}
                />
              ) : (
                <Icon
                  as={ArrowDownNarrowWide}
                  size={12}
                />
              )}
            </Text>
          </View>
        ) : (
          <Icon as={ArrowUpDown} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CompanyScreen;
type StatsCardProp = {
  stats: CompanyApiResponseType["stats"];
};
const StatsTable = ({ stats }: StatsCardProp) => (
  <View className='mb-4 p-4'>
    <Card>
      <CardHeader>
        <CardTitle>Statistics Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <View className='overflow-hidden rounded-lg border border-border'>
          {/* Table Header */}
          <View className='flex-row border-b border-border bg-muted'>
            <View className='flex-1 border-r border-border p-3'>
              <Text className='text-sm font-semibold'>Metric</Text>
            </View>
            <View className='w-24 p-3'>
              <Text className='text-right text-sm font-semibold'>Count</Text>
            </View>
          </View>

          {/* Table Rows */}
          <View className='flex-row border-b border-border bg-card'>
            <View className='flex-1 border-r border-border p-3'>
              <Text className='text-sm'>Total Drugs Represented</Text>
            </View>
            <View className='w-24 p-3'>
              <Text className='text-right text-sm font-medium'>
                {stats?.total_brands?.toLocaleString() ?? 0}
              </Text>
            </View>
          </View>

          <View className='flex-row border-b border-border bg-card'>
            <View className='flex-1 border-r border-border p-3'>
              <Text className='text-sm'>Associated Agents</Text>
            </View>
            <View className='w-24 p-3'>
              <Text className='text-right text-sm font-medium'>
                {stats?.related_agents?.toLocaleString() ?? 0}
              </Text>
            </View>
          </View>

          <View className='flex-row bg-card'>
            <View className='flex-1 border-r border-border p-3'>
              <Text className='text-sm'>Associated Generics</Text>
            </View>
            <View className='w-24 p-3'>
              <Text className='text-right text-sm font-medium'>
                {stats?.related_generics?.toLocaleString() ?? 0}
              </Text>
            </View>
          </View>
        </View>
      </CardContent>
    </Card>
  </View>
);
