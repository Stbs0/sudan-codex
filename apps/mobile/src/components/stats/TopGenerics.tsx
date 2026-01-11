import { View } from "react-native";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Text } from "../ui/text";

interface Generic {
  name: string;
  count: number;
}

function GenericItem({
  name,
  count,
  index,
}: {
  name: string;
  count: number;
  index: number;
}) {
  return (
    <Card className='flex-row items-center p-4'>
      <Text className='w-8 text-lg font-bold'>{index + 1}</Text>
      <View className='flex-1'>
        <Text className='text-base font-semibold'>{name}</Text>
      </View>
      <Badge variant='default'>
        <Text>{count}</Text>
      </Badge>
    </Card>
  );
}

export default function TopGenerics({ generics }: { generics: Generic[] }) {
  return (
    <View className='space-y-3'>
      {generics.map((generic, index) => (
        <GenericItem
          key={index}
          name={generic.name}
          count={generic.count}
          index={index}
        />
      ))}
    </View>
  );
}
