"use client";
import { useSearchDrug } from "@/hooks/store/useSearch";
import { Drug } from "@/lib/types";
import { useInfiniteQuery, useSuspenseInfiniteQuery } from "@tanstack/react-query";

export function useInfiniteServerScroll() {
  const search = useSearchDrug((state) => state.search);
  const {
    data,
    fetchNextPage: loadMore,
    hasNextPage: hasMore,
  } = useInfiniteQuery<{
    data: Drug[];
    nextCursor: number | null;
  }>({
    queryKey: ["drugs", search],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(
        `/api/drugs?page=${pageParam}${search && "&q=" + encodeURIComponent(search)}`
      );
      return res.json();
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 1,
    placeholderData: (prev) => prev,
  });

  return { data, hasMore, loadMore };
}
