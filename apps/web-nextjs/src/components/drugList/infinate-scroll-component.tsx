"use client";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteServerScroll } from "../../hooks/useInfiniteScroll";
import { Skeleton } from "../ui/skeleton";
import { ListItem } from "./ListItem";

function InfiniteScrollComponent() {
  const { loadMore, hasMore, data: drugList } = useInfiniteServerScroll();

  return (
    <>
      {drugList ? (
        <InfiniteScroll
          className='grid gap-4'
          dataLength={drugList.pages.flatMap((p) => p.data).length}
          next={loadMore}
          endMessage={
            <p className='text-muted-foreground py-4 text-center text-sm'>
              You have seen all drugs.
            </p>
          }
          hasMore={hasMore}
          loader={
            <div className='py-4 text-center'>
              <p className='text-muted-foreground'>Loading more...</p>
            </div>
          }>
          {drugList.pages.map((group) =>
            group.data.map((drug) => (
              <ListItem
                key={drug.no}
                drug={drug}
              />
            ))
          )}
        </InfiniteScroll>
      ) : (
        [...Array(10)].map((_, index) => (
          <Skeleton
            key={index}
            className='h-48 w-full'
          />
        ))
      )}
    </>
  );
}

export default InfiniteScrollComponent;
