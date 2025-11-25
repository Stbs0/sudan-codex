"use client";
import { useSearchDrug } from "@/hooks/store/useSearch";
import { Drug } from "@/lib/types";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

export function useInfiniteServerScroll() {
  const search = useSearchDrug((state) => state.search);
  const {
    data,
    fetchNextPage: loadMore,
    hasNextPage: hasMore,
  } = useSuspenseInfiniteQuery<{
    data: Drug[];
    nextCursor: number | null;
  }>({
    queryKey: ["drugs", search],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL +
          `/api/drugs?page=${pageParam}${search && "&q=" + encodeURIComponent(search)}`
      );
      return res.json();
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 1,
  });

  return { data, hasMore, loadMore };
}
