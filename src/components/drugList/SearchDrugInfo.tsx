import { Input } from "../ui/input";
import { Button } from "../ui/button";
import AutoComplete from "../ui/autocomplete";
import { DRUG_ROUTES } from "@/constants";

const SearchDrugInfo = ({
  handleSubmit,
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <div className='flex flex-col gap-4'>
      <form
        method='get'
        onSubmit={handleSubmit}>
        <Input
          type='text'
          name='genericName'
        />
        <AutoComplete options={DRUG_ROUTES} />
        <Input
          type='text'
          name='strength'
        />
        <Input
          type='text'
          name='brandName'
        />
        <Button type='submit'>Search</Button>
      </form>
    </div>
  );
};

export default SearchDrugInfo;
