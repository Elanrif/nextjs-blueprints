"use client";

import { SidebarProvider } from "@/components/Layouts/sidebar/sidebar-context";
import QueryProvider from "@/lib/_/components/layout/query-provider";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <SidebarProvider>
        <QueryProvider>{children}</QueryProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
}
