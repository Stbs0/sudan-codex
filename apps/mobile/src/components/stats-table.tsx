import type {
  AgentApiResponseType,
  CompanyApiResponseType,
  GenericApiResponseType,
} from "@sudan-codex/db/schema";
import {
  flexRender,
  type Header,
  type HeaderGroup,
  type Row,
} from "@tanstack/react-table";
import { useRouter } from "expo-router";
import {
  ArrowDownNarrowWide,
  ArrowUpDown,
  ArrowUpNarrowWide,
} from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Icon } from "./ui/icon";
import { Text } from "./ui/text";
export type DrugResponseType<T> = T extends
  | AgentApiResponseType
  | CompanyApiResponseType
  | GenericApiResponseType
  ? T["drugs"][number]
  : never;
type TableHeaderProps<T> = {
  header: Header<DrugResponseType<T>, unknown>;

  index: number;
  headerGroup: HeaderGroup<DrugResponseType<T>>;
};
export const TableHeader = <T,>({
  header,
  index,
  headerGroup,
}: TableHeaderProps<T>) => {
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

type StatsCardProp = {
  totalBrands:
    | AgentApiResponseType["stats"]["total_brands"]
    | CompanyApiResponseType["stats"]["total_brands"]
    | GenericApiResponseType["stats"]["total_brands"];
  firstStats:
    | AgentApiResponseType["stats"]["related_generics"]
    | CompanyApiResponseType["stats"]["related_generics"]
    | GenericApiResponseType["stats"]["related_agents"];
  secondStats:
    | AgentApiResponseType["stats"]["related_companies"]
    | CompanyApiResponseType["stats"]["related_agents"]
    | GenericApiResponseType["stats"]["related_companies"];
  firstAssociation: "Generics" | "Companies" | "Agents";
  secondAssociation: "Generics" | "Companies" | "Agents";
};
export const StatsSummaryCard = ({
  totalBrands,
  firstStats,
  secondStats,
  firstAssociation,
  secondAssociation,
}: StatsCardProp) => (
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
                {totalBrands?.toLocaleString() ?? 0}
              </Text>
            </View>
          </View>

          <View className='flex-row border-b border-border bg-card'>
            <View className='flex-1 border-r border-border p-3'>
              <Text className='text-sm'>Associated {firstAssociation}</Text>
            </View>
            <View className='w-24 p-3'>
              <Text className='text-right text-sm font-medium'>
                {firstStats?.toLocaleString() ?? 0}
              </Text>
            </View>
          </View>

          <View className='flex-row bg-card'>
            <View className='flex-1 border-r border-border p-3'>
              <Text className='text-sm'>Associated {secondAssociation}</Text>
            </View>
            <View className='w-24 p-3'>
              <Text className='text-right text-sm font-medium'>
                {secondStats?.toLocaleString() ?? 0}
              </Text>
            </View>
          </View>
        </View>
      </CardContent>
    </Card>
  </View>
);

export type TableBodyProps<T> = {
  row: Row<DrugResponseType<T>>;
  rowIndex: number;
};
export const TableBody = <T,>({ row, rowIndex }: TableBodyProps<T>) => {
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
