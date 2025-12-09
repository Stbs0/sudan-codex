import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import ModalProvider from "@/providers/ModalProvider";
import DrugCard from "@/screens/Drug-list/DrugCard/DrugCard";
import type { Drug } from "@/types";
import { LegendList, type LegendListRef } from "@legendapp/list";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type Dispatch,
} from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, View } from "react-native";
import CardModal from "./CardModal";

const DrugList = () => {
  const { t } = useTranslation();
  const {
    drugList,
    fetchNextPage,
    setSearch,
    isFetchingNextPage,
    error,
    isLoading,
    hasNextPage,
    searchBy,
    setSearchBy,

    deferredSearch,
  } = useInfiniteScroll();
  const listRef = useRef<LegendListRef | null>(null);

  useEffect(() => {
    listRef.current?.scrollToOffset?.({ offset: 0, animated: true });
  }, [deferredSearch]);

  const renderItem = useCallback(({ item }: { item: Drug }) => {
    return <DrugCard {...item} />;
  }, []);

  const debouncedSetSearch = useMemo(() => {
    const timeoutRef = {
      current: null as ReturnType<typeof setTimeout> | null,
    };

    return (q: string) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setSearch(q);
      }, 500);
    };
  }, [setSearch]);

  if (error) return <Text className="text-destructive">{String(error)}</Text>;

  if (isLoading)
    return <ActivityIndicator size="large" style={{ marginTop: 16 }} />;

  return (
    <ModalProvider>
      <LegendList
        recycleItems={true}
        // getItemLayout={getItemLayout}
        data={drugList}
        ref={listRef}
        renderItem={renderItem}
        className="pt-4 "
        keyExtractor={(item) => item.no}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        ListFooterComponent={() => {
          if (isFetchingNextPage) return <ActivityIndicator size="large" />;
          if (!hasNextPage && drugList.length > 0)
            return (
              <Text className="text-muted-foreground text-center py-2">
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
      <SearchInput
        debouncedSetSearch={debouncedSetSearch}
        setSearchBy={setSearchBy}
        searchBy={searchBy}
      />
      <CardModal />
    </ModalProvider>
  );
};

const SearchInput = ({
  debouncedSetSearch,
  setSearchBy,
  searchBy,
}: {
  debouncedSetSearch: (q: string) => void;
  setSearchBy: Dispatch<React.SetStateAction<keyof Drug>>;
  searchBy: keyof Drug;
}) => {
  const { t } = useTranslation();
  const searchItems: { value: keyof Drug; label: string }[] = [
    { value: "genericName", label: "Generic Name" },
    { value: "brandName", label: "Brand Name" },
    { value: "agentName", label: "Agent Name" },
    { value: "companyName", label: "Company Name" },
    { value: "countryOfOrigin", label: "Country of Origin" },
    { value: "strength", label: "Strength" },
    { value: "dosageFormName", label: "Dosage Form" },
    { value: "packSize", label: "Pack Size" },
  ];
  const [width, setWidth] = React.useState(0);
  const placeholder = searchItems.find(
    (item) => item.value === searchBy,
  )?.label;

  return (
    <View className="relative m-2 flex-row items-center">
      <Input
        onChangeText={debouncedSetSearch}
        className={`border rounded-md w-full  dark:bg-black`}
        style={{ paddingRight: width + 8 }}
        placeholder={`Search by ${placeholder}...`}
      />

      {/* Dropdown overlay on right side */}
      <View
        className="absolute right-2 top-1/2 -translate-y-1/2 elevation-md"
        pointerEvents="box-none"
      >
        <Select>
          <SelectTrigger
            onLayout={(event) => {
              const { width } = event.nativeEvent.layout;
              setWidth(width);
            }}
            className="h-9 border-0 shadow-none px-2 bg-transparent"
          >
            <SelectValue
              placeholder={placeholder || "Generic Name"}
              className="text-muted-foreground text-sm"
            />
          </SelectTrigger>

          <SelectContent side="top">
            <SelectLabel>
              <Text>{t("drugList.searchTerm")}</Text>
            </SelectLabel>
            <SelectSeparator />
            {searchItems.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                label={item.label}
                onPress={() => setSearchBy(item.value)}
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </View>
    </View>
  );
};

export default DrugList;
