"use client";
import "./globals.css";
import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { getData } from "./actions/neon";
import { useEffect, useState } from "react";
import { SessionType } from "@/types/sessionType";
import { SessionProvider } from "@/context/SessionContext";
import { Session } from "inspector/promises";
import { useSessions } from "@/context/SessionContext";

function MainContent({ children }: { children: React.ReactNode }) {
  const { open } = useSidebar();

  return (
    <main
      className={`flex-1 transition-all duration-200 ease-linear ${
        open ? "ml-[-8rem]" : "ml-0"
      }`}
    >
      <div className="w-full flex justify-center">
        <div className="w-full max-w-7xl">
          <SidebarTrigger
            className={`flex-1 transition-all duration-200 ease-linear ${
              open ? "ml-[8rem]" : "ml-0"
            }`}
          />
          {children}
        </div>
      </div>
    </main>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const [sessions, setSessions] = useState<SessionType[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await getData();
  //       setSessions(data);
  //     } catch (error) {
  //       console.error("Error fetching history:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <html lang="en">
      <body className="bg-gray-50/50 overflow-hidden">
        <SessionProvider>
          <SidebarProvider>
            <div className="flex">
              <AppSidebar />
              <MainContent>{children}</MainContent>
            </div>
          </SidebarProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
