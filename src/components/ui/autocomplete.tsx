import * as React from "react";
import { Check, ChevronsUpDown, ChevronDown, ChevronUp } from "lucide-react";

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

interface Props {
  options: Unit[] | DosageForm[];
}
const AutoComplete = ({ options }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className=' flex max-w-fit min-w-10  items-center '>
          {value
            ? options.find((framework) => framework.value === value)?.label
            : options[0]?.label}
          {open ? (
            <ChevronUp className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          ) : (
            <ChevronDown className='ml-2 h-4 w-4 shrink-0 opacity-50 border-l-2' />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Search framework...' />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup >
              {options.map((framework) => (
                <CommandItem className="border-t-[1px]"
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}>
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {framework.label}
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
