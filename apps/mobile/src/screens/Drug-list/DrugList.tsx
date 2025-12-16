import { Text } from "@/components/ui/text";
import { useInfiniteServerScroll } from "@/hooks/useInfiniteScroll";
import ModalProvider from "@/providers/ModalProvider";
import DrugCard from "@/screens/Drug-list/DrugCard/DrugCard";
import type { Drug } from "@/types";
import { LegendList, type LegendListRef } from "@legendapp/list";
import React, { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, View } from "react-native";
import CardModal from "./CardModal";
import SearchInput from "./SearchInput";

const DrugList = () => {
  const { t } = useTranslation();
  const {
    data,
    fetchNextPage,

    isFetchingNextPage,
    error,
    isLoading,
    hasNextPage,
  } = useInfiniteServerScroll();
  const listRef = useRef<LegendListRef | null>(null);

  const renderItem = useCallback(({ item }: { item: Drug }) => {
    return <DrugCard {...item} />;
  }, []);
  if (error) return <Text className="text-destructive">{String(error)}</Text>;

  if (isLoading)
    return <ActivityIndicator size="large" style={{ marginTop: 16 }} />;
  const drugList = data!.pages.flatMap((p) => p.data) ?? [];
  return (
    <ModalProvider>
      <LegendList
        recycleItems={true}
        data={drugList}
        ref={listRef}
        renderItem={renderItem}
        className="pt-4"
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        ListFooterComponent={() => {
          if (isFetchingNextPage) return <ActivityIndicator size="large" />;
          if (!hasNextPage && drugList.length > 0)
            return (
              <Text className="py-2 text-center text-muted-foreground">
                {t("drugList.noMoreResults")}
              </Text>
            );
          return null;
        }}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        onEndReachedThreshold={0.7}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        keyboardShouldPersistTaps="always"
      />
      <SearchInput />
      <CardModal />
    </ModalProvider>
  );
};

export default DrugList;
