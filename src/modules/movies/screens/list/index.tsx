"use client";
import { API } from "@/shared/api";
import Pagination from "@/shared/components/pagination/pagination";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface ItemMoviesProps {
  id: string;
  year: string;
  title: string;
  winner: string;
}

interface GetMoviesProps {
  pageNumber: number;
  year?: string;
  winner?: string;
}

export default function ListScreen() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);
  const [filterYear, setFilterYear] = useState("");
  const [filterWinner, setFilterWinner] = useState("");

  const [limitPage, setLimitPage] = useState(0);
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get("page"));

  const handlerGetMovies = useCallback(
    ({ pageNumber, year, winner }: GetMoviesProps) => {
      const isAvaibleToRequestByPage =
        (pageParam && pageParam - 1 === pageNumber) ||
        (!pageParam && pageNumber !== -1);

      const isAvaibleToRequestByYear =
        (year && year === filterYear) || (!year && filterYear == "");

      const isAvaibleToRequestByWinner = winner || (!winner && winner !== "");

      if (
        isAvaibleToRequestByPage ||
        isAvaibleToRequestByYear ||
        isAvaibleToRequestByWinner
      ) {
        fetch(
          `${API.MOVIES}?page=${pageNumber < 0 ? 0 : pageNumber}&size=15${
            winner ? "&winner=" + winner : ""
          }${filterYear ? "&year=" + filterYear : ""}`
        )
          .then((response) => response.json())
          .then((data) => {
            setMovies(data?.content);
            setLimitPage(data?.totalPages);
          })
          .catch((error) => {
            setMovies([]);
          });
      }
    },
    [pageParam, filterYear]
  );

  useEffect(() => {
    if (pageParam !== null && Number(page) !== pageParam - 1) {
      setPage(pageParam - 1);
    }
  }, [pageParam]);

  useEffect(() => {
    handlerGetMovies({ pageNumber: page });
  }, [page]);

  useEffect(() => {
    if (filterWinner !== null) {
      handlerGetMovies({
        pageNumber: page,
        winner: filterWinner,
      });
    }
  }, [filterWinner]);

  return (
    <>
      <Card>
        <CardHeader>
          <Heading size="md">List movies</Heading>
        </CardHeader>
        <CardBody>
          <TableContainer>
            <Table variant="striped" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>
                    <Wrap>
                      <SimpleGrid columns={1} spacing={2}>
                        <WrapItem>Year</WrapItem>
                        <WrapItem>
                          <Input
                            placeholder="Filter by year"
                            value={filterYear}
                            onChange={(e) => setFilterYear(e.target.value)}
                            onBlur={(e) =>
                              handlerGetMovies({
                                pageNumber: page,
                                year: e.target.value,
                              })
                            }
                          />
                        </WrapItem>
                      </SimpleGrid>
                    </Wrap>
                  </Th>
                  <Th>Title</Th>
                  <Th>
                    <Wrap>
                      <SimpleGrid columns={1} spacing={2}>
                        <WrapItem>Winner?</WrapItem>
                        <WrapItem>
                          <Select
                            placeholder="Yes/No"
                            value={filterWinner}
                            onChange={(e) => {
                              console.log("teste: ", e.target.value);
                              setFilterWinner(e.target.value);
                            }}
                          >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </Select>
                        </WrapItem>
                      </SimpleGrid>
                    </Wrap>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {movies?.map((item: ItemMoviesProps, index: number) => {
                  return (
                    <Tr key={index}>
                      <Td>{item.id}</Td>
                      <Td>{item.year}</Td>
                      <Td>{item.title}</Td>
                      <Td>{item.winner ? "Yes" : "No"}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
        <CardFooter alignItems="center" justifyContent="center">
          <Pagination limit={limitPage} selectedPage={page} />
        </CardFooter>
      </Card>
    </>
  );
}
