import { dosageForms } from "@/constants";
import AutoComplete from "../ui/autocomplete";

const DosageFormInput = () => {
  return (
    <>
      {" "}
      <div className='px-2 my-2 '>
        <AutoComplete
          options={dosageForms}
          name='dosageForm'
        />
        <p className='text-xs text-neutral-500'>Chose The Right Form</p>
      </div>
    </>
  );
};

export default DosageFormInput;
