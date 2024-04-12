"use client";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (word: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [wordSearch, setWordSearch] = useState("");
  return (
    <InputGroup>
      <Input
        placeholder="Search by year"
        value={wordSearch}
        onChange={(e) => setWordSearch(e.target.value)}
      />
      <InputRightElement>
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={() => onSearch(wordSearch)}
        >
          Search
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
