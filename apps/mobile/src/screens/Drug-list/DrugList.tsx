import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useInfiniteServerScroll } from "@/hooks/useInfiniteScroll";
import ModalProvider from "@/providers/ModalProvider";
import DrugCard from "@/screens/Drug-list/DrugCard/DrugCard";
import { LegendList, type LegendListRef } from "@legendapp/list";
import type { Drug } from "@sudan-codex/db";
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
    refetch,
    isFetchingNextPage,
    error,
    isLoading,
    hasNextPage,
  } = useInfiniteServerScroll();
  const listRef = useRef<LegendListRef | null>(null);

  const renderItem = useCallback(({ item }: { item: Drug }) => {
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
  const drugList = data.pages.flatMap((p) => p.data) ?? [];
  return (
    <ModalProvider>
      <LegendList
        recycleItems={true}
        data={drugList}
        ref={listRef}
        renderItem={renderItem}
        className='pt-4'
        keyExtractor={(item) => item.id.toString()}
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
