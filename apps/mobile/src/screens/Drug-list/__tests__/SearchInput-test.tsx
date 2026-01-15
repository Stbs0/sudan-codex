import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import SearchInput from "../SearchInput";
// Mock the hooks
jest.mock("@/components/ui/icon", () => ({
  Icon: "Icon",
}));
jest.mock("@/components/ui/input", () => ({
  Input: (props: any) => {
    const { TextInput } = require("react-native");
    return (
      <TextInput
        testID='search-input'
        onChangeText={props.onChangeText}
        value={props.value}
        placeholder={props.placeholder}
        {...props}
      />
    );
  },
}));
jest.mock("@/components/ui/select", () => ({
  Select: ({ children }: any) => <>{children}</>,
  SelectContent: ({ children }: any) => <>{children}</>,
  SelectItem: ({ children, onPress }: any) => {
    const { Pressable } = require("react-native");
    return <Pressable onPress={onPress}>{children}</Pressable>;
  },
  SelectLabel: ({ children }: any) => <>{children}</>,
  SelectSeparator: () => null,
  SelectTrigger: ({ children, onLayout }: any) => {
    const { View } = require("react-native");
    return <View onLayout={onLayout}>{children}</View>;
  },
  SelectValue: () => null,
}));
jest.mock("@/components/ui/text", () => {
  const { Text } = require("react-native");
  return {
    Text: ({ children }: any) => <Text>{children}</Text>,
  };
});
jest.mock("lucide-react-native", () => ({
  SearchIcon: "SearchIcon",
}));
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock the local store
const mockSetSearch = jest.fn();
const mockSetFilterBy = jest.fn();

jest.mock("@/hooks/store/useSearch", () => ({
  useSearchDrug: (selector: any) => {
    const state = {
      search: "",
      filterBy: "brand_name",
      setSearch: mockSetSearch,
      setFilterBy: mockSetFilterBy,
    };
    return selector(state);
  },
}));

describe("SearchInput", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    render(<SearchInput />);
    expect(screen.getByPlaceholderText("Search by Brand Name...")).toBeTruthy();
  });

  it("updates search text on input change", () => {
    render(<SearchInput />);
    const input = screen.getByPlaceholderText("Search by Brand Name...");

    fireEvent.changeText(input, "Panadol");
    expect(mockSetSearch).toHaveBeenCalledWith("Panadol");
  });
});
