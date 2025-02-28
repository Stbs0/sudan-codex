import { ListItem } from "@/components/drugList/ListItem";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { debounce } from "lodash";
import { motion } from "motion/react";
import { useCallback, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const variants = {
  visible: {
    transition: { staggerChildren: 1 },
  },
};

// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0 },
// };
const MotionListItem = motion.create(InfiniteScroll);

const DrugList = () => {
  const [search, setSearch] = useState("");
  const { loadMore, hasMore, drugList } = useInfiniteScroll(search);

  const handleSearchChange = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    }, 300),
    []
  );

  const memoizedLoadMore = useCallback(() => {
    loadMore();
  }, [loadMore]);

  // const MemoListItem = useMemo(() => <ListItem />, []);

  return (
    <div className='grid items-center justify-center gap-4 dark:text-gray-100'>
      <div className='grid gap-2 py-2'>
        <p className='text-2xl'>Search a Drug</p>
        <Input
          className='rounded-3xl shadow-sm shadow-purple-300 placeholder:text-xs'
          placeholder='generic, brand, company name'
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      <MotionListItem
        variants={variants}
        className='min-w-md flex max-w-lg flex-col gap-4'
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
      </MotionListItem>
    </div>
  );
};

export default DrugList;
