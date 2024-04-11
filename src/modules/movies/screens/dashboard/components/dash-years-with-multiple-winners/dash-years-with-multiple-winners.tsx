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

interface ItemYearsProps {
  year: string;
  winnerCount: string;
}

export default async function DashYearsWithMultipleWinners() {
  const dataYearsMultipleWinners = await getYearsMultipleWinners();

  return (
    <>
      <TableContainer>
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Years</Th>
              <Th>Win Count</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataYearsMultipleWinners?.years?.map(
              (item: ItemYearsProps, index: number) => {
                return (
                  <Tr key={index}>
                    <Td>{item.year}</Td>
                    <Td>{item.winnerCount}</Td>
                  </Tr>
                );
              }
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

async function getYearsMultipleWinners() {
  const res = await fetch(
    `${API.MOVIES}?projection=years-with-multiple-winners`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
