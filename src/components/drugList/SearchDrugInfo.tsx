import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { DRUG_ROUTES } from "@/constants";
import { Label } from "../ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SelectScrollable } from "./SelectRoute";

const SearchDrugInfo = ({
  handleSubmit,
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, route: string) => void;
}) => {
  const [route, setRoute] = useState("");
  return (
    <div className='grid  gap-4'>
      <Alert className='border-yellow-300 bg-yellow-50'>
        <AlertTitle>Attention</AlertTitle>
        <AlertDescription>
          If the page didn't find the drug you are looking for, please try again
          with a different route and a correct generic name.
        </AlertDescription>
      </Alert>
      <form
        method='get'
        className='flex gap-4 items-center md:flex-row flex-col'
        onSubmit={(e) => handleSubmit(e, route)}>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='genericName'>Search By Generic Name</Label>
          <Input
            type='text'
            name='genericName'
            placeholder='Enter generic name'
            id='genericName'
          />
        </div>
        {/* <Label htmlFor='brandName'>Brand Name</Label>
        <Input
          type='text'
          name='brandName'
          placeholder='Enter brand name'
          id='brandName'
        /> */}
        <div className='flex flex-col gap-2'>
          <Label htmlFor='route'> Search By Route</Label>
          <SelectScrollable
            options={DRUG_ROUTES}
            setRoute={setRoute}
          />
        </div>
        {/* <Label htmlFor='strength'>Strength</Label> */}
        {/* <Input
          type='text'
          name='strength'
          placeholder='Enter strength'
          id='strength'
        /> */}
        <Button type='submit'>Search</Button>
      </form>
    </div>
  );
};

export default SearchDrugInfo;
