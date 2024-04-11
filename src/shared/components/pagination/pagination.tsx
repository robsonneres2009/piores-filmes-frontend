"use client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import Styles from "./pagination.module.scss";

interface PaginationProps {
  limit: number;
  selectedPage: number;
}

export default function Pagination({ limit, selectedPage }: PaginationProps) {
  const renderBreadCrumb = () => {
    const breadcrumbs = [];

    for (let index = 0; index < limit; index++) {
      const element = index + 1;
      const isActive = selectedPage === element - 1;

      breadcrumbs.push(
        <BreadcrumbItem key={element} isCurrentPage={isActive}>
          <BreadcrumbLink href={`?page=${element}`}>
            <div className={isActive ? Styles.isActive : ""}>{element}</div>
          </BreadcrumbLink>
        </BreadcrumbItem>
      );
    }

    return breadcrumbs;
  };

  return <Breadcrumb separator="-">{renderBreadCrumb()}</Breadcrumb>;
}
