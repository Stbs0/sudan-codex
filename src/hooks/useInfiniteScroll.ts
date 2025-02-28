import drugDB from "@/lib/indexedDB";
import { useState, useEffect, useRef } from "react";
import { useLiveQuery } from "dexie-react-hooks";

const PAGE_SIZE = 20;
const DEBOUNCE_DELAY = 300; // Adjust the delay as needed

export const useInfiniteScroll = (search?: string) => {
  const [page, setPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setDebouncedSearch(search);
    }, DEBOUNCE_DELAY);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [search]);

  const drugList = useLiveQuery(async () => {
    const query = drugDB.drugList;
    const limit = page * PAGE_SIZE;

    if (debouncedSearch) {
      const data = await query
        .where("genericName")
        .startsWithIgnoreCase(debouncedSearch)
        .or("brandName")
        .startsWithIgnoreCase(debouncedSearch)
        .or("companyName")
        .startsWithIgnoreCase(debouncedSearch)
        .limit(limit)
        .toArray()
        .then((data) =>
          data.sort((a, b) => a.brandName.localeCompare(b.brandName))
        );
      return data.sort((a, b) => a.brandName.localeCompare(b.brandName));
    }

    return await query
      .limit(limit)
      .toArray()
      .then((data) =>
        data.sort((a, b) => a.brandName.localeCompare(b.brandName))
      );
  }, [debouncedSearch, page]);

  const hasMore = !!drugList && drugList.length >= page * PAGE_SIZE;

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return { drugList, loadMore, hasMore };
};
