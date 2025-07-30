import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectScrollable({
  options,
  setRoute,
}: {
  options: string[];
  setRoute: (route: string) => void;
}) {
  return (
    <Select onValueChange={setRoute}>
      <SelectTrigger
        className='w-[280px]'
        id='route'>
        <SelectValue placeholder='Select a route' />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option}
            value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
