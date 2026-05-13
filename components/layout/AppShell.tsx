"use client";

import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";
import { getSubjectTheme } from "@/lib/getSubjectTheme";

interface Props {
  children: React.ReactNode;
  
}

export default function AppShell({ children }: Props) {
  const pathname = usePathname();
  const subjectSlug = pathname.split("/")[1];
  const theme = getSubjectTheme(subjectSlug);

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
      <Sidebar subjectTheme={theme} />

      <div className="flex flex-1 flex-col">
        <Navbar theme={theme} />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-6xl px-4 py-4">{children}</div>
        </main>
      </div>
    </div>
  );
}
