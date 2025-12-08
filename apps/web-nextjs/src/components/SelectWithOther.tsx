import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { occupationLiteral } from "@/lib/schemas";
import React from "react";
import { useFormContext } from "react-hook-form";

interface SelectWithOtherProps {
  name: string;
  label: string;
  placeholder: string;
  description?: string;
}

const SelectWithOther: React.FC<SelectWithOtherProps> = ({
  name,
  label,
  placeholder,
  description,
}) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className='space-y-2'>
            <Select
              {...field}
              value={field.value || ""}
              onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {[...occupationLiteral.values].map((occupation) => (
                  <SelectItem
                    key={occupation}
                    value={occupation}>
                    {occupation}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <FormMessage />
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
};

export default SelectWithOther;
