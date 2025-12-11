import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useModal } from "@/hooks/useModal";
import type { Drug } from "@/types";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { memo } from "react";
import { TouchableHighlight, View } from "react-native";

const DrugCard = memo(
  ({
    brand_name,
    generic_name,
    agent_name,
    company_name,
    country_name,
    id,
    slug,
    dosage_form,
    pack_size,
    strength,
    company_id,
    agent_id,
    generic_id,
    country_id,
  }: Drug) => {
    // TODO: fix the rerender
    const { setOpen, setModalData } = useModal();
    const router = useRouter();

    const onPress = () => {
      router.push({
        pathname: "/drug-list/[slug]",
        params: {
          slug,
        },
      });
    };
    const onLongPress = () => {
      Haptics.selectionAsync();
      setOpen(true);
      setModalData({
        brand_name,
        generic_name,
        agent_name,
        company_name,
        country_name,
        id,
        slug,
        dosage_form,
        pack_size,
        strength,
        company_id,
        agent_id,
        generic_id,
        country_id,
      });
    };
    return (
      // TODO: remove the the extra params pr #10 Avoid passing all fields via route params to keep deep links small and stable.

      // <Link
      //   href={{
      //     pathname: "/drug-list/[no]",
      //     params: {
      //       no,
      //       brand_name,
      //       genericName,
      //       dosageFormName,
      //       strength,
      //       pack_size,
      //       companyName,
      //       countryOfOrigin,
      //       agentName,
      //       drugInfoRef,
      //     },
      //   }}
      //   asChild
      //   push
      // >
      <TouchableHighlight
        onPress={onPress}
        onLongPress={onLongPress}>
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
                  <Text className='text-sm font-bold'> — </Text>
                  <Text className='font-bold text-blue-700 dark:text-blue-400'>
                    {dosage_form || "NAD"}
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
              <Text
                className='text-sm font-bold text-orange-700 dark:text-orange-400'
                numberOfLines={1}
                ellipsizeMode='tail'>
                {agent_name || "NAD"}
              </Text>
              <Text
                className='text-sm font-bold text-violet-500 dark:text-violet-400'
                numberOfLines={1}
                ellipsizeMode='tail'>
                {country_name || "NAD"}
              </Text>
            </View>
          </CardContent>
        </Card>
      </TouchableHighlight>
      // </Link>
    );
  }
);
DrugCard.displayName = "DrugCard";

export default DrugCard;
