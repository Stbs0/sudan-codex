import * as React from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";
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
import { useController } from "react-hook-form";

interface Props {
  options: Unit[] | DosageForm[];
  name: string;
  className?: string;
}
const AutoComplete = ({ options, name, className }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(options[0].value);

  const {
    field: { onChange },
  } = useController({
    name,
  });

  React.useEffect(() => {
    onChange(value);
  }, [value]);

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
          {options.find((framework) => framework.value === value)?.label}
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
                  className='border-t-[1px]'
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    onChange(currentValue);
                    setOpen(false);
                  }}>
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0",
                    )}
                  />
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
