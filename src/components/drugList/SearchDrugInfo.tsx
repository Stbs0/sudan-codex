import { Input } from "../ui/input";
import { Button } from "../ui/button";

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
        <Input
          type='text'
          name='dosageFormName'
        />
        <Input
          type='text'
          name='strength'
        />
        <Button type='submit'>Search</Button>
      </form>
    </div>
  );
};

export default SearchDrugInfo;
