import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
// import "../../firebase-message"
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "All you have to do",
  description: "Manage your schedule and to-do",
  // icons: [
  //   {
  //     url: "../../../logo.svg",
  //     href: "../../../logo.svg",
  //   },
  // ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <Head>
        <link rel='manifest' href='/manifest.json' />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
