import { ListItem } from "@/components/drugList/ListItem";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useCallback, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0 },
// };

const DrugList = () => {
  const [search, setSearch] = useState("");
  const { loadMore, hasMore, drugList } = useInfiniteScroll(search);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const memoizedLoadMore = useCallback(() => {
    loadMore();
  }, [loadMore]);

  // const MemoListItem = useMemo(() => <ListItem />, []);

  return (
    <div className='grid items-center justify-center gap-4 dark:text-gray-100'>
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
        // variants={variants}
        className='flex max-w-lg min-w-md flex-col gap-4'
        dataLength={drugList ? drugList.length : 0}
        next={memoizedLoadMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}>
        {drugList
          ? drugList.map((drug) => (
              <ListItem
                drug={drug}
                key={drug.no}
              />
            ))
          : [...Array(10)].map((_, index) => (
              <Skeleton
                key={index}
                className='h-24 w-full'
              />
            ))}
      </InfiniteScroll>
    </div>
  );
};

export default DrugList;
