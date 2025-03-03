import { ListItem } from "@/components/drugList/ListItem";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useCallback, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const DrugList = () => {
  const [search, setSearch] = useState("");
  const { loadMore, hasMore, drugList } = useInfiniteScroll(search);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const memoizedLoadMore = useCallback(() => {
    loadMore();
  }, [loadMore]);

  return (
    <div className='mx-auto grid max-w-2xl items-center gap-4 px-3 dark:text-gray-100'>
      <div className='grid gap-2 py-2'>
        <p className='text-2xl'>Search a Drug</p>
        <Input
          className='rounded-3xl shadow-xs shadow-purple-300 placeholder:text-xs'
          placeholder='generic, brand, company name'
          value={search}
          onChange={handleSearchInput}
        />
      </div>

      <InfiniteScroll
        className='flex w-full flex-col gap-4'
        dataLength={drugList ? drugList.length : 0}
        next={memoizedLoadMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}>
        {drugList
          ? drugList.map((drug) => <ListItem drug={drug} />)
          : [...Array(10)].map((_, index) => (
              <Skeleton
                key={index}
                className='h-full w-full'
              />
            ))}
      </InfiniteScroll>
    </div>
  );
};

export default DrugList;
