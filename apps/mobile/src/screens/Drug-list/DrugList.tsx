import { LegendList, type LegendListRef } from "@legendapp/list";
import type { DrugListApiResponseType } from "@sudan-codex/db/schema";
import React, { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useInfiniteServerScroll } from "@/hooks/useInfiniteScroll";
import ModalProvider from "@/providers/ModalProvider";
import DrugCard from "@/screens/Drug-list/DrugCard/DrugCard";

import CardModal from "./CardModal";
import SearchInput from "./SearchInput";

type ListItem = DrugListApiResponseType["data"][number];

const DrugList = () => {
  const { t } = useTranslation();
  const {
    data,
    fetchNextPage,
    refetch,
    isFetchingNextPage,
    error,
    isLoading,
    hasNextPage,
  } = useInfiniteServerScroll();
  const listRef = useRef<LegendListRef | null>(null);

  // Merge drugs with ads

  const drugList = data?.pages.flatMap((p) => p.data) ?? [];

  const renderItem = useCallback(({ item }: { item: ListItem }) => {
    return <DrugCard {...item} />;
  }, []);

  if (error)
    return (
      <View className='flex-1 items-center justify-center'>
        <Text>There was an error loading the drugs</Text>
        <Button
          variant='destructive'
          onPress={async () => await refetch()}>
          <Text>Retry</Text>
        </Button>
      </View>
    );
  if (isLoading)
    return (
      <ActivityIndicator
        size='large'
        style={{ marginTop: 16 }}
      />
    );

  if (!data) return null;

  return (
    <ModalProvider>
      <LegendList
        data={drugList}
        ref={listRef}
        renderItem={renderItem}
        style={{ paddingVertical: 16 }}
        keyExtractor={(item) => {
          return item.id.toString();
        }}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        ListFooterComponent={() => {
          if (isFetchingNextPage) return <ActivityIndicator size='large' />;
          if (!hasNextPage && drugList.length > 0)
            return (
              <Text className='text-muted-foreground py-2 text-center'>
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
        keyboardShouldPersistTaps='always'
      />
      <SearchInput />
      <CardModal />
    </ModalProvider>
  );
};

export default DrugList;
