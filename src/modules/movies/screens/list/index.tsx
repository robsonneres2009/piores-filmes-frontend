"use client";
import { API } from "@/shared/api";
import Pagination from "@/shared/components/pagination/pagination";
import {
  Card,
  CardBody,
  CardFooter,
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
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface ItemMoviesProps {
  id: string;
  year: string;
  title: string;
  winner: string;
}

export default function ListScreen() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);
  const [limitPage, setLimitPage] = useState(0);
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get("page"));

  const handlerGetMovies = useCallback(
    (pageNumber: number) => {
      const isAvaibleToRequest =
        (pageParam && pageParam - 1 === pageNumber) ||
        (!pageParam && pageNumber !== -1);

      if (isAvaibleToRequest) {
        fetch(`${API.MOVIES}?page=${pageNumber}&size=15&winner=true`)
          .then((response) => response.json())
          .then((data) => {
            setMovies(data?.content);
            setLimitPage(data?.totalPages);
          })
          .catch((error) => {
            setMovies([]);
            console.error("Ocorreu um erro:", error);
          });
      }
    },
    [pageParam]
  );

  useEffect(() => {
    if (pageParam !== null && Number(page) !== pageParam - 1) {
      setPage(pageParam - 1);
    }
  }, [pageParam]);

  useEffect(() => {
    handlerGetMovies(page);
  }, [page]);

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
                  <Th>Year</Th>
                  <Th>Title</Th>
                  <Th>Winner?</Th>
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
