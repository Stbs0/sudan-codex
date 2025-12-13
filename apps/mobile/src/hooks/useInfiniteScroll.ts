import { type DrugFilterState, useSearchDrug } from "@/hooks/store/useSearch";
import type { Drug } from "@/types";
import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { usePostHog } from "posthog-js/react";
import { useEffect, useRef } from "react";
interface InfiniteQueryType {
  data: Drug[];
  nextPage: number | null;
}
type QueryOptions = Omit<DrugFilterState, "setFilterBy" | "setSearch">;

const getQueryOptions = ({ search, filterBy }: QueryOptions) =>
  infiniteQueryOptions<InfiniteQueryType>({
    queryKey: ["drugs", filterBy, search],
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams();
      if (search) params.set("q", search);
      if (filterBy) params.set("filterBy", filterBy);
      if (pageParam) params.set("page", pageParam.toString());
      const res = await fetch(
        process.env.EXPO_PUBLIC_BACKEND_URI + `/api/drugs?${params.toString()}`,
        { cache: "force-cache" },
      );
      if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`);
      }
      return await res.json();
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    placeholderData: (prev) => prev,
  });
export function useInfiniteServerScroll() {
  const search = useSearchDrug((state) => state.search);
  const filterBy = useSearchDrug((state) => state.filterBy);
  const posthog = usePostHog();
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const query = useInfiniteQuery<InfiniteQueryType>(
    getQueryOptions({
      search,
      filterBy,
    }),
  );
  useEffect(() => {
    if (query.error) {
      posthog.captureException(query.error, { search, filterBy });
    }
  }, [query.error, posthog, search, filterBy]);
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
  return query;
}
