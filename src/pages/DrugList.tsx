import { ListItem } from "@/components/drugList/ListItem";
import { Input } from "@/components/ui/input";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const DrugList = () => {
  const [search, setSearch] = useState("");
  const { loadMore, hasMore, drugList } = useInfiniteScroll(search);

  if (!drugList) {
    return <div>Loading...</div>;
  }
  return (
    <div className=' grid justify-center gap-4 items-center  '>
      <div className='grid gap-2 py-2'>
        <p className='text-2xl'>Search a Drug</p>
        <Input
          className='placeholder:text-xs shadow-sm shadow-purple-300 rounded-3xl  '
          placeholder='generic, brand, company name'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <InfiniteScroll
        className='flex  flex-col gap-4 max-w-lg min-w-md'
        dataLength={drugList.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}>
        {drugList.map((drug) => (
          <ListItem
            key={drug.no}
            drug={drug}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default DrugList;
