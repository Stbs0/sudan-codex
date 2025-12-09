import type { Drug } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { useDeferredValue, useMemo, useState } from "react";

const PAGE_SIZE = 10;

export const useInfiniteScroll = () => {
  const db = useSQLiteContext();
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState<keyof Drug>("genericName");
  const deferredSearch = useDeferredValue(search);

  const {
    fetchNextPage,
    isFetchingNextPage,
    error,
    isLoading,
    hasNextPage,
    data,
  } = useInfiniteQuery({
    queryKey: ["drugList", deferredSearch, searchBy],
    queryFn: async ({ pageParam = 0 }) => {
      const searchTerm = `%${deferredSearch}%`; // LIKE %term%

      const query = `
        SELECT *
        FROM drugIndex
        WHERE ${searchBy} LIKE $searchTerm
        ORDER BY ${searchBy} ASC
        LIMIT $PAGE_SIZE OFFSET $pageParam;
      `;

      const drugs = (await db.getAllAsync(query, {
        $searchTerm: searchTerm,
        $PAGE_SIZE: PAGE_SIZE,
        $pageParam: pageParam,
      })) as Drug[];

      return {
        drugs,
        nextPage:
          drugs.length === PAGE_SIZE ? pageParam + PAGE_SIZE : undefined,
      };
    },
    initialPageParam: 0,
    placeholderData: (prev) => prev,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  // Flatten all pages into a single list for convenience
  const drugList = useMemo(
    () => data?.pages.flatMap((page) => page.drugs) ?? [],
    [data],
  );
  return {
    drugList,
    search,
    setSearch,
    deferredSearch,
    setSearchBy,
    searchBy,
    fetchNextPage,

    isFetchingNextPage,
    error,
    isLoading,
    hasNextPage,
  };
};
