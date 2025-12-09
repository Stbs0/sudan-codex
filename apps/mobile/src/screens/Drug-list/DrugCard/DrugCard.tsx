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
    no,
    brandName,
    genericName,
    dosageFormName,
    strength,
    packSize,
    companyName,
    countryOfOrigin,
    agentName,
    drugInfoRef,
  }: Drug) => {
    // TODO: fix the rerender
    const { setOpen, setModalData } = useModal();
    const router = useRouter();

    const onPress = () => {
      router.push({
        pathname: "/drug-list/[no]",
        params: {
          no,
          brandName,
          genericName,
          dosageFormName,
          strength,
          packSize,
          companyName,
          countryOfOrigin,
          agentName,
          drugInfoRef,
        },
      });
    };
    const onLongPress = () => {
      Haptics.selectionAsync();
      setOpen(true);
      setModalData({
        no,
        brandName,
        genericName,
        dosageFormName,
        strength,
        packSize,
        companyName,
        countryOfOrigin,
        agentName,
        drugInfoRef,
      });
    };
    return (
      // TODO: remove the the extra params pr #10 Avoid passing all fields via route params to keep deep links small and stable.

      // <Link
      //   href={{
      //     pathname: "/drug-list/[no]",
      //     params: {
      //       no,
      //       brandName,
      //       genericName,
      //       dosageFormName,
      //       strength,
      //       packSize,
      //       companyName,
      //       countryOfOrigin,
      //       agentName,
      //       drugInfoRef,
      //     },
      //   }}
      //   asChild
      //   push
      // >
      <TouchableHighlight onPress={onPress} onLongPress={onLongPress}>
        <Card className=" py-2 rounded-none border-2 shadow-black shadow-md ">
          <CardContent className="gap-1">
            <View className="gap-1   ">
              <View className="flex-row ">
                <Text numberOfLines={1} ellipsizeMode="tail">
                  <Text className=" font-extrabold text-neutral-700   dark:text-blue-200  ">
                    {(brandName || "NAD") + " " + (strength || "NAD")}
                  </Text>
                  <Text className="font-bold"> — </Text>
                  <Text
                    className="dark:text-rose-400 text-rose-700"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {packSize || "NAD"}
                  </Text>
                </Text>
              </View>
              <View className=" gap-1 font-bold text-sm ">
                <Text numberOfLines={2} ellipsizeMode="tail">
                  <Text className="dark:text-green-400 text-green-500 font-extrabold">
                    {genericName || "NAD"}
                  </Text>
                  <Text className="font-bold text-sm "> — </Text>
                  <Text className="font-bold dark:text-blue-400 text-blue-700">
                    {dosageFormName || "NAD"}
                  </Text>
                </Text>
              </View>
            </View>

            <View className="items-start gap-1 ">
              <Text
                className="text-sm font-bold dark:text-pink-400 text-pink-700"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {companyName || "NAD"}
              </Text>
              <Text
                className="text-sm font-bold dark:text-orange-400 text-orange-700"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {agentName || "NAD"}
              </Text>
              <Text
                className="text-sm font-bold dark:text-violet-400 text-violet-500"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {countryOfOrigin || "NAD"}
              </Text>
            </View>
          </CardContent>
        </Card>
      </TouchableHighlight>
      // </Link>
    );
  },
);
DrugCard.displayName = "DrugCard";

export default DrugCard;
