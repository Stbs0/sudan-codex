"use client";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteServerScroll } from "../../hooks/useInfiniteScroll";
import { ListItem } from "./ListItem";

function InfiniteScrollComponent() {
  const { loadMore, hasMore, data: drugList } = useInfiniteServerScroll();

  return (
    <InfiniteScroll
      className='grid gap-4'
      dataLength={drugList ? drugList.pages.length : 0}
      next={loadMore}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}>
      {drugList.pages.map((group) =>
        group.data.map((drug) => (
          <ListItem
            key={drug.no}
            drug={drug}
          />
        ))
      )}
    </InfiniteScroll>
  );
}

export default InfiniteScrollComponent;
