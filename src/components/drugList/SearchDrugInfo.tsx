import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { DRUG_ROUTES } from "@/constants";
import { Label } from "../ui/label";

import { SelectScrollable } from "./SelectRoute";

const SearchDrugInfo = ({
  handleSubmit,
  generic,
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, route: string) => void;
  generic: string;
}) => {
  const [route, setRoute] = useState("");
  return (
    <div className='grid  gap-4'>
      <form
        method='get'
        className='flex gap-4 items-center md:flex-row flex-col'
        onSubmit={(e) => handleSubmit(e, route)}>
        <div className='flex  flex-col gap-2'>
          <Label htmlFor='genericName'>Search By Generic Name</Label>
          <Input
            type='text'
            name='genericName'
            placeholder='Enter generic name'
            id='genericName'
            defaultValue={generic}
          />{" "}
          <p className='text-xs text-gray-500'>
            Hint: try deleting the salt name from the generic name
          </p>
          <Label htmlFor='route'> Search By Route</Label>
          <SelectScrollable
            options={DRUG_ROUTES}
            setRoute={setRoute}
          />
        </div>

        <Button type='submit'>Search</Button>
      </form>
    </div>
  );
};

export default SearchDrugInfo;
