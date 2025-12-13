import { View } from "react-native";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
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
    <Card className="flex-row items-center p-4">
      <Text className="w-8 text-lg font-bold">{index + 1}</Text>
      <View className="flex-1">
        <Text className="text-base font-semibold">{name}</Text>
      </View>
      <Badge>
        <Text>{count}</Text>
      </Badge>
    </Card>
  );
}

export default function TopCompanies({ companies }: { companies: Company[] }) {
  return (
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
  );
}
