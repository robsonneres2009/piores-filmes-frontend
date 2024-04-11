import { Header } from "@/shared/components/header";
import { SideMenu } from "@/shared/components/side-menu";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../shared/styles/globals.scss";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Piores Filmes",
  description:
    "Interface para possibilitar a leitura da lista de indicados e vencedores da categoria Pior Filme do Golden Raspberry Awards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="container">
          <SideMenu />
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
