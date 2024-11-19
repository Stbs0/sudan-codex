import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";

interface SelectWithOtherProps {
  name: string;
  label: string;
  placeholder: string;
  description?: string;
  options: { value: string; label: string }[];
}

const SelectWithOther: React.FC<SelectWithOtherProps> = ({
  name,
  label,
  placeholder,
  description,
  options,
}) => {
  const [otherSelected, setOtherSelected] = useState(false);

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className='space-y-2'>
            <Select
              onValueChange={(value) => {
                setOtherSelected(value === "other");
                field.onChange(value === "other" ? "" : value);
              }}
              defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
                <SelectItem value='other'>Other</SelectItem>
              </SelectContent>
            </Select>

            {otherSelected && (
              <Input
                placeholder='Specify your occupation'
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
          </div>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectWithOther;
