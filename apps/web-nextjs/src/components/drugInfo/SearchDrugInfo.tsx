import { DRUG_ROUTES } from "@/constants";
import { useState } from "react";
import { AutoComplete } from "../ui/autocomplete";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const SearchDrugInfo = ({
  handleSubmit,
  generic,
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, route: string) => void;
  generic: string;
}) => {
  const [route, setRoute] = useState("");
  return (
    <div className='flex flex-col gap-4'>
      <form
        className='flex flex-col gap-4'
        onSubmit={(e) => handleSubmit(e, route)}>
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
