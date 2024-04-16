"use client";
import { Input, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface OptionsPros {
  value: string | boolean | number;
  title: string;
}

interface InputFilterProps {
  onClick: (value: string) => void;
  title: string;
  options?: OptionsPros[];
  defaultValue?: string | null;
}

export default function InputFilter({
  onClick,
  title,
  options,
  defaultValue,
}: InputFilterProps) {
  const [filter, setFilter] = useState("");

  useEffect(() => {
    defaultValue && setFilter(String(defaultValue));
  }, [defaultValue]);

  return options ? (
    <>
      <Select
        placeholder={title}
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
          onClick(e.target.value);
        }}
      >
        {options?.map((option, index) => (
          <option value={String(option?.value)} key={index}>
            {option?.title}
          </option>
        ))}
      </Select>
    </>
  ) : (
    <>
      <Input
        placeholder={title}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        onBlur={() => onClick(filter)}
      />
    </>
  );
}
