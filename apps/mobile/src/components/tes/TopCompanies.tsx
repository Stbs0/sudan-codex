import { View } from "react-native";
import { Text } from "../ui/text";

interface Company {
  name: string;
  count: number;
}

function CompanyItem({
  name,
  count,
  index,
}: {
  name: string;
  count: number;
  index: number;
}) {
  return (
    <View className="hover:bg-slate-750 flex items-center gap-4 rounded-lg bg-slate-800 p-4 transition-colors">
      <View className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-cyan-500">
        <Text className="font-bold text-slate-950">{index + 1}</Text>
      </View>
      <View className="min-w-0 flex-1">
        <Text className="truncate text-sm text-white">{name}</Text>
      </View>
      <View className="flex-shrink-0 rounded-md bg-blue-500 px-3 py-1">
        <Text className="text-xs font-bold text-white">{count}</Text>
      </View>
    </View>
  );
}

export default function TopCompanies({ companies }: { companies: Company[] }) {
  return (
    <View className="mb-12 px-6">
      <Text className="mb-6 text-2xl font-semibold text-white">
        Top Companies
      </Text>
      <View className="space-y-3">
        {companies.map((company, index) => (
          <CompanyItem
            key={index}
            name={company.name}
            count={company.count}
            index={index}
          />
        ))}
      </View>
    </View>
  );
}
