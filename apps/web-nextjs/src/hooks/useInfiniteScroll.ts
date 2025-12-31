"use client";
import { DrugFilterState, useSearchDrug } from "@/hooks/store/useSearch";
import type { FetchedDrugs } from "@/services/server/getInitialInfiniteDrugs";
import { Drug } from "@sudan-codex/db";
import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { usePostHog } from "posthog-js/react";
import { useEffect, useRef } from "react";
interface InfiniteQueryType {
  data: Drug[];
  nextPage: number | null;
}
interface QueryOptions extends Omit<
  DrugFilterState,
  "setFilterBy" | "setSearch"
> {
  initialDrugs: FetchedDrugs;
}

const getQueryOptions = ({
  search,
  filterBy,
  initialDrugs,
  posthog,
}: QueryOptions & { posthog: ReturnType<typeof usePostHog> }) =>
  infiniteQueryOptions<InfiniteQueryType>({
    initialData: !search
      ? { pages: [initialDrugs], pageParams: [1] }
      : undefined,
    queryKey: ["drugs", filterBy, search || ""],
    queryFn: async ({ pageParam }) => {
      try {
        const params = new URLSearchParams();
        if (search) params.set("q", search);
        if (filterBy) params.set("filterBy", filterBy);
        if (pageParam) params.set("page", pageParam.toString());
        const res = await fetch(`/api/drugs?${params.toString()}`);
        return res.json();
      } catch (error) {
        posthog.captureException(error, {
          search,
          filterBy,
          pageParam,
        });
        throw error;
      }
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    placeholderData: (prev) => prev,
  });
export function useInfiniteServerScroll(initialDrugs: FetchedDrugs) {
  const search = useSearchDrug((state) => state.search);
  const filterBy = useSearchDrug((state) => state.filterBy);
  const posthog = usePostHog();
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    if (search) {
      debounceTimeout.current = setTimeout(() => {
        posthog.capture("drug_searched", {
          search,
          filterBy,
        });
      }, 500);
    }
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [search, filterBy, posthog]);
  const {
    data,
    fetchNextPage: loadMore,
    hasNextPage: hasMore,
  } = useInfiniteQuery<InfiniteQueryType>(
    getQueryOptions({
      search,
      filterBy,
      initialDrugs,
      posthog,
    })
  );

  return { data, hasMore, loadMore };
}
