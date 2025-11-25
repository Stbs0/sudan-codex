"use client";
import { useSearchDrug } from "@/hooks/store/useSearch";
import { Input } from "../ui/input";

function SearchDrug() {
  const search = useSearchDrug((state) => state.search);
  const setSearch = useSearchDrug((state) => state.setSearch);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.trim());
  };

  return (
    <Input
      className='rounded-3xl shadow-md placeholder:text-xs'
      placeholder='Search Generic, Brand, or Company Name'
      value={search}
      onChange={handleSearchInput}
    />
  );
}

export default SearchDrug;
