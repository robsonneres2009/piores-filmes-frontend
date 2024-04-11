"use client";
import { API } from "@/shared/api";
import SearchBar from "@/shared/components/search-bar/search-bar";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";

export default function DashWinnersToYear() {
  const [dataWinnersToYears, setDataWinnersToYears] = useState([]);

  const handlerGetWinnersToYears = async (year: string) => {
    if (year) {
      fetch(`${API.MOVIES}?winner=true&year=${year}`)
        .then((response) => response.json())
        .then((data) => setDataWinnersToYears(data))
        .catch((error) => console.error("Ocorreu um erro:", error));
    } else {
      setDataWinnersToYears([]);
    }
  };

  return (
    <>
      <SearchBar onSearch={(word) => handlerGetWinnersToYears(word)} />
      <TableContainer>
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Year</Th>
              <Th>Title</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataWinnersToYears?.map((item: any, index: number) => {
              return (
                <Tr key={index}>
                  <Td>{item.id}</Td>
                  <Td>{item.year}</Td>
                  <Td>{item.title}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
