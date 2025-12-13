import { View } from "react-native";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Text } from "../ui/text";

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
  color: string;
}

function StatCard({ label, value, color }: StatCardProps) {
  return (
    <Card className={`rounded-lg border-l-4 p-6 ${color}`}>
      <CardTitle className="">{label}</CardTitle>
      <CardContent className="pl-0">
        <Text className="text-3xl font-bold">{value.toLocaleString()}</Text>
      </CardContent>
    </Card>
  );
}

export default function SummaryStats({ data }: { data: SummaryData }) {
  const stats = [
    { label: "Total Drugs", value: data.totalDrugs, color: "border-cyan-500" },
    {
      label: "Companies",
      value: data.totalCompanies,
      color: "border-blue-500",
    },
    {
      label: "Brand Names",
      value: data.totalBrandNames,
      color: "border-indigo-500",
    },
    {
      label: "Generics",
      value: data.totalGenerics,
      color: "border-purple-500",
    },
    { label: "Agents", value: data.totalAgents, color: "border-fuchsia-500" },
  ];

  return (
    <View className="mb-12 px-6">
      <View className="gap-4">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            label={stat.label}
            value={stat.value}
            color={stat.color}
          />
        ))}
      </View>
    </View>
  );
}
