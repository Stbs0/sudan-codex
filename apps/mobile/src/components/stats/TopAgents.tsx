import { View } from "react-native";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Text } from "../ui/text";

interface Agent {
  name: string;
  count: number;
}

function AgentItem({
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
      <Badge variant="default">
        <Text>{count}</Text>
      </Badge>
    </Card>
  );
}

export default function TopAgents({ agents }: { agents: Agent[] }) {
  return (
    <View className="space-y-3">
      {agents.map((agent, index) => (
        <AgentItem
          key={index}
          name={agent.name}
          count={agent.count}
          index={index}
        />
      ))}
    </View>
  );
}
