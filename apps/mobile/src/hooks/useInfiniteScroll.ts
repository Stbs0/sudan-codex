import { type DrugFilterState, useSearchDrug } from "@/hooks/store/useSearch";
import { api } from "@/lib/api-client";
import { captureException } from "@sentry/react-native";
import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { usePostHog } from "posthog-js/react";
import { useEffect, useRef } from "react";
// interface InfiniteQueryType {
//   data: Drug[];
//   nextPage: number | null;
// }
type QueryOptions = Omit<DrugFilterState, "setFilterBy" | "setSearch">;

const getQueryOptions = ({ search, filterBy }: QueryOptions) =>
  infiniteQueryOptions({
    queryKey: ["drugs", filterBy, search],
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams();
      if (search) params.set("q", search);
      if (filterBy) params.set("filterBy", filterBy);
      if (pageParam) params.set("page", pageParam.toString());
      const res = await api(`/api/drugs`, {
        query: {
          ...(filterBy ? { filterBy } : {}),
          q: encodeURIComponent(search),
          page: Number(params.get("page")) ?? 1,
        },
      });
      if (res.error) {
        throw new Error(res.error.message);
      }
      return res.data;
    },
    getNextPageParam: (lastPage) => lastPage?.nextPage,
    initialPageParam: 1,
    placeholderData: (prev) => prev,
  });

export function useInfiniteServerScroll() {
  const search = useSearchDrug((state) => state.search);

  const filterBy = useSearchDrug((state) => state.filterBy);

  const posthog = usePostHog();

  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const query = useInfiniteQuery(getQueryOptions({ search, filterBy }));

  useEffect(() => {
    if (query.error) {
      captureException(query.error);
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
