import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Input,
  InputContainer,
  InputLabel,
} from "src/common/components/primitives/input";

type AccountTableFiltersProps = {
  searchParam: string | null;
  onSearch: (searchTerm: string | null) => void;
};

const defaultTimeout = 500;

const AccountTableFilters = ({
  searchParam,
  onSearch,
}: AccountTableFiltersProps) => {
  const [inputValue, setInputValue] = useState<string | null>(searchParam);

  useEffect(() => {
    const debauncer = setTimeout(() => {
      onSearch(inputValue);
    }, defaultTimeout);

    return () => clearTimeout(debauncer);
  }, [inputValue, onSearch]);

  return (
    <InputContainer>
      <InputLabel>Search Query</InputLabel>
      <Input
        type="text"
        leftIcon={<Search size={20} className="shrink-0" />}
        placeholder={"Search hash name..."}
        value={inputValue ?? ""}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </InputContainer>
  );
};

export default AccountTableFilters;
