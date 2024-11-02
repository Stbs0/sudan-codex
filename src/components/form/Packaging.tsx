import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import AutoComplete from "../ui/autocomplete";
import { packagingTypes } from "@/constants";
import { Input } from "../ui/input";
export default function PackagingField() {
  return (
    <div className="border-l-2 border-neutral-500 px-2">
      <FormLabel>Packaging Form</FormLabel>
      <div className="flex">
        <FormField
          name="packaging.number"
          render={({ field: { onChange, value } }) => (
            <Input
              type="number"
              placeholder="1"
              value={value === 0 ? "" : value}
              onChange={(event) => onChange(parseInt(event.target.value, 10))}
            />
          )}
        />
        <FormField
          name="packaging.packageForm"
          render={({ field: { onChange } }) => (
            <FormItem>
              <FormControl>
                <AutoComplete
                  name="packaging.packageForm"
                  options={packagingTypes}
                  onChange={onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <FormDescription>Chose The Right Form</FormDescription>
      <FormMessage />
    </div>
  );
}
