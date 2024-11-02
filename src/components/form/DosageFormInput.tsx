import { DOSAGE_FORMS } from "@/constants";
import AutoComplete from "../ui/autocomplete";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const DosageFormInput = () => {
  return (
    <div className='border-l-2 border-neutral-500 px-2'>
      <FormField
        name='dosageForm'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Dosage Form</FormLabel>
            <FormControl>
              <AutoComplete
                name='dosageForm'
                options={DOSAGE_FORMS}
                onChange={field.onChange}
              />
            </FormControl>

            <FormDescription>Chose The Right Form</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default DosageFormInput;
