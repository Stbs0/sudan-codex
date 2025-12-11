import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import {
  useSearchDrug,
  type DrugFilterState,
  type SearchDrugType,
} from "@/hooks/store/useSearch";
import { View } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";

const options: { value: SearchDrugType; label: string }[] = [
  {
    value: "brand_name",
    label: "Brand Name",
  },
  {
    value: "agent_name",
    label: "Agent Name",
  },
  {
    value: "company_name",
    label: "Company Name",
  },
  {
    value: "generic_name",
    label: "Generic Name",
  },
  {
    value: "country_name",
    label: "Country of Origin",
  },
];

export default function SearchInput() {
  const { t } = useTranslation();
  const search = useSearchDrug((state) => state.search);
  const setSearch = useSearchDrug((state) => state.setSearch);
  const setFilterBy = useSearchDrug((state) => state.setFilterBy);
  const filterBy = useSearchDrug((state) => state.filterBy);

  const onSearch = (text: string) => {
    setSearch(text);
  };
  const onFilter = (val: DrugFilterState["filterBy"]) => {
    setFilterBy(val);
  };

  const [width, setWidth] = React.useState(0);
  const placeholder = options.find((item) => item.value === filterBy)?.label;

  return (
    <View className='relative m-2 flex-row items-center'>
      <Input
        onChangeText={onSearch}
        className={`w-full rounded-md border dark:bg-black`}
        style={{ paddingRight: width + 8 }}
        value={search}
        placeholder={`Search by ${placeholder}...`}
      />

      {/* Dropdown overlay on right side */}
      <View
        className='elevation-md absolute right-2 top-1/2 -translate-y-1/2'
        pointerEvents='box-none'>
        <Select>
          <SelectTrigger
            onLayout={(event) => {
              const { width } = event.nativeEvent.layout;
              setWidth(width);
            }}
            className='h-9 border-0 bg-transparent px-2 shadow-none'>
            <SelectValue
              placeholder={placeholder || "Generic Name"}
              className='text-sm text-muted-foreground'
            />
          </SelectTrigger>

          <SelectContent side='top'>
            <SelectLabel>
              <Text>{t("drugList.searchTerm")}</Text>
            </SelectLabel>
            <SelectSeparator />
            {options.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                label={item.label}
                onPress={() => onFilter(item.value)}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </View>
    </View>
  );
}
