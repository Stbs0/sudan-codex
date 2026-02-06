import {
  Building2,
  FlaskConical,
  Pill,
  Tag,
  UserCheck,
} from "lucide-react-native";
import type { LucideIcon } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";

import { Card, CardContent } from "../ui/card";

interface SummaryData {
  totalDrugs: number;
  totalCompanies: number;
  totalBrandNames: number;
  totalGenerics: number;
  totalAgents: number;
}

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

function StatCard({ label, value, icon, color, bgColor }: StatCardProps) {
  return (
    <Card className='bg-card flex-1 overflow-hidden border-none shadow-xs'>
      <CardContent className='p-4'>
        <View className='flex-row items-center justify-between'>
          <View className={`rounded-xl p-2 ${bgColor}`}>
            <Icon
              as={icon}
              size={24}
              className={color}
            />
          </View>
          <Text className='text-foreground text-2xl font-bold'>
            {value.toLocaleString()}
          </Text>
        </View>
        <Text className='text-muted-foreground mt-3 text-xs font-medium tracking-wider uppercase'>
          {label}
        </Text>
      </CardContent>
    </Card>
  );
}

export default function SummaryStats({ data }: { data: SummaryData }) {
  const { t } = useTranslation();
  const stats = [
    {
      label: t("stats.summary.totalDrugs"),
      value: data.totalDrugs,
      icon: Pill,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      label: t("stats.summary.companies"),
      value: data.totalCompanies,
      icon: Building2,
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
    },
    {
      label: t("stats.summary.brandNames"),
      value: data.totalBrandNames,
      icon: Tag,
      color: "text-indigo-600 dark:text-indigo-400",
      bgColor: "bg-indigo-100 dark:bg-indigo-900/30",
    },
    {
      label: t("stats.summary.generics"),
      value: data.totalGenerics,
      icon: FlaskConical,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      label: t("stats.summary.agents"),
      value: data.totalAgents,
      icon: UserCheck,
      color: "text-rose-600 dark:text-rose-400",
      bgColor: "bg-rose-100 dark:bg-rose-900/30",
    },
  ];

  return (
    <View className='mb-8 px-6'>
      <View className='flex-row flex-wrap gap-4'>
        {stats.map((stat, index) => (
          <View
            key={index}
            className={index === 0 ? "w-full" : "w-[47%]"}>
            <StatCard {...stat} />
          </View>
        ))}
      </View>
    </View>
  );
}
