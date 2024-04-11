import { API } from "@/shared/api";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

interface ItemProducersProps {
  producer: string;
  interval: string;
  previousWin: string;
  followingWin: string;
}

export default async function DashProducers() {
  const dataProducersIntervalMinMax = await getProducersIntervalMinMax();

  return (
    <>
      <Card>
        <CardHeader>
          <Heading size="md">
            Producers with longest and shortest interval between wins
          </Heading>
        </CardHeader>
        <CardBody>
          <Heading size="md" fontWeight={300}>
            Maximum
          </Heading>
          <TableContainer>
            <Table variant="striped" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th>Producer</Th>
                  <Th>Interval</Th>
                  <Th>Previous Year</Th>
                  <Th>Following Year</Th>
                </Tr>
              </Thead>
              <Tbody>
                {dataProducersIntervalMinMax?.max?.map(
                  (item: ItemProducersProps, index: number) => {
                    return (
                      <Tr key={index}>
                        <Td>{item.producer}</Td>
                        <Td>{item.interval}</Td>
                        <Td>{item.previousWin}</Td>
                        <Td>{item.followingWin}</Td>
                      </Tr>
                    );
                  }
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Heading size="md" fontWeight={300}>
            Minimum
          </Heading>
          <TableContainer>
            <Table variant="striped" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th>Producer</Th>
                  <Th>Interval</Th>
                  <Th>Previous Year</Th>
                  <Th>Following Year</Th>
                </Tr>
              </Thead>
              <Tbody>
                {dataProducersIntervalMinMax?.min?.map(
                  (item: ItemProducersProps, index: number) => {
                    return (
                      <Tr key={index}>
                        <Td>{item.producer}</Td>
                        <Td>{item.interval}</Td>
                        <Td>{item.previousWin}</Td>
                        <Td>{item.followingWin}</Td>
                      </Tr>
                    );
                  }
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </>
  );
}

async function getProducersIntervalMinMax() {
  const res = await fetch(
    `${API.MOVIES}?projection=max-min-win-interval-for-producers`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
