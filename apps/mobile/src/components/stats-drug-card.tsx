import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import type { AgentApiResponseType } from "@sudan-codex/db";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableHighlight, View } from "react-native";
type Props = AgentApiResponseType["drugs"][number];
// FIXME: fix types here
const StatsDrugCard = ({
  brand_name,
  generic_name,
  company_name,
  slug,
  pack_size,
  strength,
}: Props) => {
  // TODO: fix the rerender
  const router = useRouter();

  const onPress = () => {
    router.push({
      pathname: "/drug-list/[slug]",
      params: {
        slug,
      },
    });
  };

  return (
    <TouchableHighlight onPress={onPress}>
      <Card className='rounded-none border-2 py-2 shadow-md shadow-black'>
        <CardContent className='gap-1'>
          <View className='gap-1'>
            <View className='flex-row'>
              <Text
                numberOfLines={1}
                ellipsizeMode='tail'>
                <Text className='font-extrabold text-neutral-700 dark:text-blue-200'>
                  {(brand_name || "NAD") + " " + (strength || "NAD")}
                </Text>
                <Text className='font-bold'> — </Text>
                <Text
                  className='text-rose-700 dark:text-rose-400'
                  numberOfLines={1}
                  ellipsizeMode='tail'>
                  {pack_size || "NAD"}
                </Text>
              </Text>
            </View>
            <View className='gap-1 text-sm font-bold'>
              <Text
                numberOfLines={2}
                ellipsizeMode='tail'>
                <Text className='font-extrabold text-green-500 dark:text-green-400'>
                  {generic_name || "NAD"}
                </Text>
              </Text>
            </View>
          </View>

          <View className='items-start gap-1'>
            <Text
              className='text-sm font-bold text-pink-700 dark:text-pink-400'
              numberOfLines={1}
              ellipsizeMode='tail'>
              {company_name || "NAD"}
            </Text>
          </View>
        </CardContent>
      </Card>
    </TouchableHighlight>
    // </Link>
  );
};

export default StatsDrugCard;
