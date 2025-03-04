import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import "./globals.css";
import type { Metadata } from "next";
import NavBar from "./NavBar";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { Inter } from "next/font/google";

const inter = Inter({
	subsets: ["latin"],
  display: "swap",
	variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Debug Nest",
  description: "Issue Tracker App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Theme accentColor="teal">
          <NavBar></NavBar>
          <main>{children}</main>
        </Theme>
      </body>
    </html>
  );
}
