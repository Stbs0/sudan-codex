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
import { useTranslation } from "react-i18next";
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
      className={`active:bg-muted/50 border-r p-3 ${
        index === headerGroup.headers.length - 1
          ? "border-border/50 border-r-0"
          : ""
      }`}
      style={{
        width: header.getSize(),
      }}>
      <View className='flex-row items-center gap-1.5'>
        <Text className='text-foreground/90 text-xs font-extrabold tracking-wide uppercase'>
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
        </Text>

        {header.column.getIsSorted() ? (
          <View className='bg-primary/10 rounded-full'>
            <Text className='text-primary text-xs font-bold'>
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
    | AgentApiResponseType["agent"]["stats"]["total_brands"]
    | CompanyApiResponseType["company"]["stats"]["total_brands"]
    | GenericApiResponseType["generic"]["stats"]["total_brands"];
  firstStats:
    | AgentApiResponseType["agent"]["stats"]["related_generics"]
    | CompanyApiResponseType["company"]["stats"]["related_generics"]
    | GenericApiResponseType["generic"]["stats"]["related_agents"];
  secondStats:
    | AgentApiResponseType["agent"]["stats"]["related_companies"]
    | CompanyApiResponseType["company"]["stats"]["related_agents"]
    | GenericApiResponseType["generic"]["stats"]["related_companies"];
  firstAssociation: "Generics" | "Companies" | "Agents";
  secondAssociation: "Generics" | "Companies" | "Agents";
};
export const StatsSummaryCard = ({
  totalBrands,
  firstStats,
  secondStats,
  firstAssociation,
  secondAssociation,
}: StatsCardProp) => {
  const { t } = useTranslation();

  const getAssociationLabel = (
    association: "Generics" | "Companies" | "Agents"
  ) => {
    switch (association) {
      case "Generics":
        return t("stats.associations.generics");
      case "Companies":
        return t("stats.associations.companies");
      case "Agents":
        return t("stats.associations.agents");
      default:
        return association;
    }
  };

  return (
    <View className='p-4'>
      <Card>
        <CardHeader>
          <CardTitle>{t("stats.table.overview")}</CardTitle>
        </CardHeader>
        <CardContent>
          <View className='border-border overflow-hidden rounded-lg border'>
            {/* Table Header */}
            <View className='border-border bg-muted flex-row border-b'>
              <View className='border-border flex-1 border-r p-3'>
                <Text className='text-sm font-semibold'>
                  {t("stats.table.metric")}
                </Text>
              </View>
              <View className='w-24 p-3'>
                <Text className='text-right text-sm font-semibold'>
                  {t("stats.table.headers.count")}
                </Text>
              </View>
            </View>

            {/* Table Rows */}
            <View className='border-border bg-card flex-row border-b'>
              <View className='border-border flex-1 border-r p-3'>
                <Text className='text-sm'>
                  {t("stats.table.totalDrugsRepresented")}
                </Text>
              </View>
              <View className='w-24 p-3'>
                <Text className='text-right text-sm font-medium'>
                  {totalBrands?.toLocaleString() ?? 0}
                </Text>
              </View>
            </View>

            <View className='border-border bg-card flex-row border-b'>
              <View className='border-border flex-1 border-r p-3'>
                <Text className='text-sm'>
                  {t("stats.table.associated", {
                    association: getAssociationLabel(firstAssociation),
                  })}
                </Text>
              </View>
              <View className='w-24 p-3'>
                <Text className='text-right text-sm font-medium'>
                  {firstStats?.toLocaleString() ?? 0}
                </Text>
              </View>
            </View>

            <View className='bg-card flex-row'>
              <View className='border-border flex-1 border-r p-3'>
                <Text className='text-sm'>
                  {t("stats.table.associated", {
                    association: getAssociationLabel(secondAssociation),
                  })}
                </Text>
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
};

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
      className={`border-border/30 active:bg-accent/30 border-b ${
        rowIndex % 2 === 0 ? "bg-card" : "bg-muted/20"
      }`}>
      <View className='min-h-[70px] flex-row'>
        {row.getVisibleCells().map((cell, cellIndex) => (
          <View
            key={cell.id}
            style={{ width: cell.column.getSize() }}
            className={`border-border/30 justify-center border-r p-2 ${
              cellIndex === row.getVisibleCells().length - 1 ? "border-r-0" : ""
            }`}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};
