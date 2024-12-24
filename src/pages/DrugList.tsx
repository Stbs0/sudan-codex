import { ListItem } from "@/components/drugList/ListItem";
import { Input } from "@/components/ui/input";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Outlet, useParams } from "react-router-dom";

const DrugList = () => {
  const [search, setSearch] = useState("");
  const { loadMore, hasMore, drugList } = useInfiniteScroll(search);
  const param = useParams();
  console.log(param);

  if (!drugList) {
    return <div>Loading...</div>;
  }
  if (param?.no) {
    return <Outlet />;
  }
  return (
    <div className='w-full flex flex-col items-center '>
      <div className=''>
        <span className='text-2xl'>Drug List</span>
        <Input
          className='placeholder:text-xs rounded-3xl w-96 '
          placeholder='generic, brand, company name'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <InfiniteScroll
        className='flex flex-col gap-4 max-w-lg min-w-md'
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
