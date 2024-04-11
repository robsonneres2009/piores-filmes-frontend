import { API } from "@/shared/api";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

interface ItemStudiosProps {
  name: string;
  winCount: string;
}

export default async function DashStudiosWithWin() {
  const dataStudiosWithWinCount = await getStudiosWithWinCount();

  const { studios } = dataStudiosWithWinCount;
  studios.sort((a: any, b: any) => b - a);

  return (
    <>
      <TableContainer>
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Win Count</Th>
            </Tr>
          </Thead>
          <Tbody>
            {studios
              ?.slice(0, 3)
              ?.map((item: ItemStudiosProps, index: number) => {
                return (
                  <Tr key={index}>
                    <Td>{item.name}</Td>
                    <Td>{item.winCount}</Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

async function getStudiosWithWinCount() {
  const res = await fetch(`${API.MOVIES}?projection=studios-with-win-count`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
