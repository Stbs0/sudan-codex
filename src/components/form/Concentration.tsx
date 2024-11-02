import { DRUG_UNITS } from "@/constants";
import AutoComplete from "../ui/autocomplete";
import { FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { useFormContext } from "react-hook-form";

type Props = {
  name: string;
  unitName: string;
  denominator?: boolean;
  placeholder: string;
};
export function Concentration({
  name,
  unitName,
  denominator,
  placeholder,
}: Props) {
  const {
    formState: { errors },
  } = useFormContext();
  const nominatorOrDenominator = denominator ? "denominator" : "nominator";
  return (
    <div className='flex'>
      <FormField
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                placeholder={placeholder}
                className='w-20 '
                type='number'
                {...field}
                onChange={(e) =>
                  field.onChange(e.target.value === "" ? 0 : parseInt(e.target.value))
                }
                value={field.value === 0 ? "" : field.value}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        name={unitName}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <AutoComplete
                name={unitName}
                onChange={field.onChange}
                options={DRUG_UNITS}
              />
            </FormControl>
          </FormItem>
        )}
      />
      {errors &&
        "strength" in errors &&
        Array.isArray(errors.strength) &&
        errors.strength[0] && (
          <p className='text-[0.8rem] font-medium text-red-500 dark:text-red-900 self-center'>
            {errors.strength[0][nominatorOrDenominator]?.message}
          </p>
        )}
    </div>
  );
}
