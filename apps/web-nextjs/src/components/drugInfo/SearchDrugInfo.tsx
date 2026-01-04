"use client";
import { useDrugInfoSearch } from "@/hooks/store/useDrugInfoSearch";
import { DRUG_ROUTES } from "@sudan-codex/types";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { AutoComplete } from "../ui/autocomplete";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const SearchDrugInfo = () => {
  const { route, setRoute, setRefetch, setGeneric, generic } =
    useDrugInfoSearch();
  const { no } = useParams();
  const queryClient = useQueryClient();
  const onDrugInfoSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const genericName = (formData.get("genericName") as string | null) ?? "";

    queryClient.cancelQueries({ queryKey: ["drugInfo", no] });
    queryClient.invalidateQueries({ queryKey: ["drugInfo", no] });
    setGeneric(genericName.trim());
    setRefetch(true);
  };
  return (
    <div className='flex flex-col gap-4'>
      <form
        className='flex flex-col gap-4'
        onSubmit={onDrugInfoSearch}>
        <div className='flex justify-center gap-2 max-md:flex-col'>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='genericName'>Search By Generic Name</Label>
            <Input
              type='text'
              name='genericName'
              placeholder='Enter generic name'
              id='genericName'
              defaultValue={generic}
              className='w-xs'
            />
            <p className='text-xs text-gray-500'>
              Hint: try deleting the salt name from the generic name
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='route'> Search By Route</Label>
            <AutoComplete
              setRoute={setRoute}
              options={DRUG_ROUTES}
              route={route}
            />
          </div>
        </div>
        <div className='flex justify-center'>
          <Button>Search</Button>
        </div>
      </form>
    </div>
  );
};

export default SearchDrugInfo;
