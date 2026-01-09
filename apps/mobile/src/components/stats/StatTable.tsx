import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

interface StatItem {
  name: string;
  count: number;
  slug?: string;
}

interface StatTableProps {
  title: string;
  data: StatItem[];
  labelHeader?: string;
  countHeader?: string;
}

const columnHelper = createColumnHelper<StatItem>();

export function StatTable({
  title,
  data,
  labelHeader,
  countHeader,
}: StatTableProps) {
  const { t } = useTranslation();

  const activeLabelHeader = labelHeader ?? t("stats.table.headers.name");
  const activeCountHeader = countHeader ?? t("stats.table.headers.count");

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: activeLabelHeader,
        cell: (info) => (
          <Text
            className='text-sm'
            numberOfLines={2}>
            {info.getValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("count", {
        header: activeCountHeader,
        cell: (info) => (
          <Text className='text-right text-sm font-medium'>
            {info.getValue().toLocaleString()}
          </Text>
        ),
      }),
    ],
    [activeLabelHeader, activeCountHeader]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <View className='mb-6'>
      <Card className=''>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className='px-2'>
          <View className='overflow-hidden rounded-lg border border-border'>
            {/* Table Header */}
            {table.getHeaderGroups().map((headerGroup) => (
              <View
                key={headerGroup.id}
                className='flex-row border-b border-border bg-muted'>
                {headerGroup.headers.map((header) => (
                  <View
                    key={header.id}
                    className={`flex-row items-center p-2 ${
                      header.id === "name"
                        ? "flex-1 border-r border-border"
                        : "w-24"
                    }`}>
                    <Text className='text-sm font-semibold'>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </Text>
                  </View>
                ))}
              </View>
            ))}

            {/* Table Body */}
            {table.getRowModel().rows.map((row, index) => (
              <View
                key={row.id}
                className={`flex-row border-border bg-card ${
                  index !== table.getRowModel().rows.length - 1
                    ? "border-b"
                    : ""
                }`}>
                {row.getVisibleCells().map((cell) => (
                  <View
                    key={cell.id}
                    className={`p-3 ${
                      cell.column.id === "name"
                        ? "flex-1 border-r border-border"
                        : "w-24"
                    }`}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </View>
                ))}
              </View>
            ))}
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
