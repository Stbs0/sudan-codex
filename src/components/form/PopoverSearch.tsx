import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Search } from "lucide-react";
import { Input } from "../ui/input";

const PopoverSearch = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Search color='#d4c9c9' />
      </PopoverTrigger>
      <PopoverContent className='p-0  max-w-52 '>
        <Input
          placeholder='Search'
          className='  border-none '
        />
      </PopoverContent>
    </Popover>
  );
};

export default PopoverSearch;
