"use client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import Styles from "./pagination.module.scss";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
  limit: number;
  selectedPage: number;
}

export default function Pagination({ limit, selectedPage }: PaginationProps) {
  const searchParams = useSearchParams();

  const yearParam = searchParams?.get("year");
  const winnerParam = searchParams?.get("winner");

  const renderBreadCrumb = () => {
    const breadcrumbs = [];
    selectedPage = selectedPage < 0 ? 0 : selectedPage;

    for (let index = 0; index < limit; index++) {
      const element = index + 1;
      const isActive = selectedPage === element - 1;

      breadcrumbs.push(
        <BreadcrumbItem key={element} isCurrentPage={isActive}>
          <BreadcrumbLink
            href={`?page=${element}${yearParam ? `&year=${yearParam}` : ""}${
              winnerParam ? `&winner=${winnerParam}` : ""
            }`}
          >
            <div className={isActive ? Styles.isActive : ""}>{element}</div>
          </BreadcrumbLink>
        </BreadcrumbItem>
      );
    }

    return breadcrumbs;
  };

  return <Breadcrumb separator="-">{renderBreadCrumb()}</Breadcrumb>;
}
