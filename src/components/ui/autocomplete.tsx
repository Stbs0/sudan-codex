import { ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DosageForm, Unit } from "@/types/types";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  options:
    | Unit[]
    | {
        label: string;
      }[];

  className?: string;
  name: string;
  onChange: (...event: any[]) => void;
}

const AutoComplete = ({ options, className, onChange, name }: Props) => {
  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(options[0].label);
  const { setValue } = useFormContext();
  useEffect(() => {
    setValue(name, value1);
  }, [value1]);
  return (
    <Popover
      open={open}
      onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={` flex   items-center ${className} `}>
          {options.find((framework) => framework.label === value1)?.label}
          {open ? (
            <ChevronUp className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          ) : (
            <ChevronDown className='ml-2 h-4 w-4 shrink-0 opacity-50 border-l-2' />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Search item...' />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {options.map((item) => (
                <CommandItem
                  className={`border-t-[1px] ${
                    value1 === item.label ? "bg-gray-300" : ""
                  }`}
                  key={item.label}
                  onSelect={(currentValue) => {
                    setValue1(currentValue);
                    onChange(currentValue);
                    setOpen(false);
                  }}>
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
export default AutoComplete;
