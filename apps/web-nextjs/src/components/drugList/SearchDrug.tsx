"use client";
import {
  DrugFilterState,
  SearchDrugType,
  useSearchDrug,
} from "@/hooks/store/useSearch";

import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function SearchDrug() {
  const search = useSearchDrug((state) => state.search);
  const setSearch = useSearchDrug((state) => state.setSearch);
  const setFilterBy = useSearchDrug((state) => state.setFilterBy);
  const filterBy = useSearchDrug((state) => state.filterBy);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const onFilter = (val: DrugFilterState["filterBy"]) => {
    setFilterBy(val);
  };

  return (
    <div className='relative'>
      <Input
        className='rounded-3xl pr-[160px] shadow-md placeholder:text-xs'
        placeholder='Search and/or filter drugs...'
        value={search}
        data-testid='searchDrug'
        onChange={onSearch}
      />
      <Select
        value={filterBy}
        onValueChange={onFilter}
        data-testid='filterDrug'>
        <SelectTrigger className='absolute top-0 right-0 w-fit border-none bg-transparent dark:bg-transparent'>
          <SelectValue
            placeholder='Filter By'
            className='bg-transparent'
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Options</SelectLabel>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

const options: { value: SearchDrugType; label: string }[] = [
  {
    value: "brand_name",
    label: "Brand Name",
  },
  {
    value: "agent_name",
    label: "Agent Name",
  },
  {
    value: "company_name",
    label: "Company Name",
  },
  {
    value: "generic_name",
    label: "Generic Name",
  },
  {
    value: "country_name",
    label: "Country of Origin",
  },
];
export default SearchDrug;
