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
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

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
  const [width, setWidth] = useState(0);

  const onSearch = (text: string) => {
    setSearch(text);
  };
  const onFilter = (val: DrugFilterState["filterBy"]) => {
    setFilterBy(val);
  };

  const defaultOption = options.find((item) => item.value === filterBy) ?? {
    value: "brand_name",
    label: "Brand Name",
  };
  return (
    <View className='relative m-2 flex-row items-center'>
      <Input
        onChangeText={onSearch}
        className={`w-full rounded-md border dark:bg-black`}
        style={{ paddingRight: width + 8 }}
        value={search}
        placeholder={`Search by ${defaultOption.label}...`}
      />

      {/* Dropdown overlay on right side */}
      <View
        className='elevation-md absolute top-1/2 right-2 -translate-y-1/2'
        pointerEvents='box-none'>
        <Select value={defaultOption}>
          <SelectTrigger
            onLayout={(event) => {
              const { width } = event.nativeEvent.layout;
              setWidth(width);
            }}
            className='h-9 border-0 bg-transparent px-2 shadow-none'>
            <SelectValue
              placeholder={defaultOption.label}
              className='text-muted-foreground text-sm'
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
