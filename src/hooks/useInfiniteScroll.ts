import drugDB from "@/lib/indexedDB";
import { useState } from "react";

import { useLiveQuery } from "dexie-react-hooks";

const PAGE_SIZE = 20;

export const useInfiniteScroll = (search?: string) => {
  const [page, setPage] = useState(1);

  const drugList = useLiveQuery(async () => {
    const query = drugDB.drugList;
    const limit = page * PAGE_SIZE;

    if (search) {
      const data = await query
        .where("genericName")
        .startsWithIgnoreCase(search)
        .or("brandName")
        .startsWithIgnoreCase(search)
        .or("agentName")
        .startsWithIgnoreCase(search)
        .or("companyName")
        .startsWithIgnoreCase(search)
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
  }, [search, page]);

  const hasMore = !!drugList && drugList.length >= page * PAGE_SIZE;

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return { drugList, loadMore, hasMore };
};
