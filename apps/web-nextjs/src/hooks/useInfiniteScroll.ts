"use client";
import { Drug } from "@/db/schema";
import { DrugFilterState, useSearchDrug } from "@/hooks/store/useSearch";
import type { FetchedDrugs } from "@/services/server/getInitialInfiniteDrugs";
import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
interface InfiniteQueryType {
  data: Drug[];
  nextPage: number | null;
}
interface QueryOptions
  extends Omit<DrugFilterState, "setFilterBy" | "setSearch"> {
  initialDrugs: FetchedDrugs;
}

const getQueryOptions = ({ search, filterBy, initialDrugs }: QueryOptions) =>
  infiniteQueryOptions<InfiniteQueryType>({
    initialData: !search
      ? { pages: [initialDrugs], pageParams: [1] }
      : undefined,
    queryKey: ["drugs", filterBy, search || ""],
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams();
      if (search) params.set("q", search);
      if (filterBy) params.set("filterBy", filterBy);
      if (pageParam) params.set("page", pageParam.toString());
      const res = await fetch(`/api/drugs?${params.toString()}`);
      return res.json();
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    placeholderData: (prev) => prev,
  });
export function useInfiniteServerScroll(initialDrugs: FetchedDrugs) {
  const search = useSearchDrug((state) => state.search);
  const filterBy = useSearchDrug((state) => state.filterBy);
  const {
    data,
    fetchNextPage: loadMore,
    hasNextPage: hasMore,
  } = useInfiniteQuery<InfiniteQueryType>(
    getQueryOptions({
      search,
      filterBy,
      initialDrugs,
    })
  );

  return { data, hasMore, loadMore };
}
