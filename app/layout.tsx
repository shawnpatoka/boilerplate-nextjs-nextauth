import type { Metadata } from "next";
import "./globals.css";
import Topbar from "./layout/Topbar";
import SessionContextProvider from "@/context/SessionContextProvider";


export const metadata: Metadata = {
  title: "Boilerplate NextJS & NextAuth",
  description: "Boilerplate NextJS & NextAuth startup app.",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <SessionContextProvider>
        <body className="bg-slate-100 dark:bg-slate-600 antialiased">
          <Topbar />
          <main className="container mx-auto">
            {children}
          </main>
        </body>
      </SessionContextProvider>
    </html>
  );
}
