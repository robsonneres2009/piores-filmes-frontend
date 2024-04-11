"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Styles from "./side-menu.module.scss";

export default function SideMenu() {
  const pathname = usePathname();
  const [isOpen, setOpen] = useState(true);

  return (
    isOpen && (
      <nav className={Styles.nav}>
        <Link href="/" className={`${pathname === "/" ? Styles.active : ""}`}>
          Dashboard
        </Link>

        <Link
          href="/list"
          className={`${pathname === "/list" ? Styles.active : ""}`}
        >
          List
        </Link>
      </nav>
    )
  );
}
