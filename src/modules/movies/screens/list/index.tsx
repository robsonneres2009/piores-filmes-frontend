"use client";
import { API } from "@/shared/api";
import InputFilter from "@/shared/components/input-filter/input-filter";
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
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import fetchMovies from "../../services/api";

interface ItemMoviesProps {
  id: string;
  year: string;
  title: string;
  winner: string;
}

interface GetMoviesProps {
  _page?: number;
  _year?: string;
  _winner?: string;
}

interface URLParamsProps {
  _filterYear?: string | null;
  _filterWinner?: string | null;
}

export default function ListScreen() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);
  const [filterYear, setFilterYear] = useState<null | string>(null);
  const [filterWinner, setFilterWinner] = useState<null | string>(null);

  const [limitPage, setLimitPage] = useState(0);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const pageParam = Number(searchParams.get("page"));
  const yearParam = searchParams.get("year");
  const winnerParam = searchParams.get("winner");

  const handlerGetMovies = useCallback(() => {
    const fetchData = async () => {
      const data = await fetchMovies({ page, filterYear, filterWinner });
      setMovies(data.content);
      setLimitPage(data.totalPages);
      if (page > data.totalPages) {
        setPage(0);
      }
    };
    fetchData();
  }, [page, filterYear, filterWinner]);

  const updateUrlParams = ({ _filterYear, _filterWinner }: URLParamsProps) => {
    const params = new URLSearchParams();

    if (_filterYear) {
      params.set("year", _filterYear);
    }

    if (_filterWinner) {
      params.set("winner", _filterWinner);
    }

    const newUrl = `${pathname}?${params.toString()}`;

    router.push(newUrl, undefined);
  };

  useEffect(() => {
    if (pageParam !== null && page !== pageParam - 1) {
      setPage(pageParam - 1);
    }

    if (yearParam !== null) {
      setFilterYear(yearParam);
    }

    if (winnerParam !== null) {
      setFilterWinner(winnerParam);
    }
  }, [pageParam, yearParam, winnerParam]);

  useEffect(() => {
    if (pageParam !== null && page !== pageParam - 1) {
      setPage(pageParam - 1);
    }

    if (yearParam !== null) {
      setFilterYear(yearParam);
    }

    if (winnerParam !== null) {
      setFilterWinner(winnerParam);
    }

    if (pageParam == 1 && yearParam == null && winnerParam == null) {
      handlerGetMovies();
    }
  }, []);

  useEffect(() => {
    (page !== 0 || filterYear !== null || filterWinner !== null) &&
      handlerGetMovies();
  }, [page, filterYear, filterWinner]);

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
                          <InputFilter
                            title="Filter by year"
                            defaultValue={filterYear}
                            onClick={(value: string) => {
                              setFilterYear(value);
                              updateUrlParams({ _filterYear: value });
                            }}
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
                          <InputFilter
                            title="Yes/No"
                            defaultValue={filterWinner}
                            onClick={(value: string) => {
                              setFilterWinner(value);
                              updateUrlParams({ _filterWinner: value });
                            }}
                            options={[
                              { value: true, title: "Yes" },
                              { value: false, title: "No" },
                            ]}
                          />
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
