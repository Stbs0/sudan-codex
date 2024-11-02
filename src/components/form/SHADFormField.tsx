import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useFormContext } from "react-hook-form";
import { FormSchema } from "@/lib/schemas/newDrugSchema";

type Props = {
  name: "brand" | "manufacturer" | "dosageForm" | "agency" | "price";
  label: string;
  description: string;
  placeholder: string;
  type?: string;
};
const SHADFormField = ({
  name: fieldName,
  label: fieldLabel,
  description: fieldDescription,
  placeholder: fieldPlaceholder,
  type: fieldType,
}: Props) => {
  const { control } = useFormContext<Omit<FormSchema, "generics" | "strength">>();

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field: { onChange, value } }) => (
        <FormItem className="border-l-2 border-neutral-500 px-2">
          <FormLabel>{fieldLabel}</FormLabel>
          <FormControl>
            <Input
              type={fieldType}
              placeholder={fieldPlaceholder}
              value={value === 0 ? "" : value}
              onChange={(event) =>
                fieldType === "number"
                  ? onChange(parseInt(event.target.value, 10))
                  : onChange(event.target.value)
              }
            />
          </FormControl>
          <FormDescription>{fieldDescription}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SHADFormField;
