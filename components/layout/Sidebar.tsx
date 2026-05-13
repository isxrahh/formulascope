"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import React from "react";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { subjects } from "@/lib/subjects";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-72 flex-col border-r border-white/10 bg-zinc-950/80 backdrop-blur-xl">
      <div className="px-6 py-8">
        <Image
          src="/logo.png"
          width={240}
          height={31}
          alt="FORMULASCOPE"></Image>

        <p className="mt-4 text-sm text-zinc-500">
          Your personal academic system
        </p>
      </div>
      <Separator className="bg-white/10" />

      <ScrollArea className="flex-1 px-4 py-6">
        <div className="space-y-2">
          {subjects.map((subject) => {
            const Icon = subject.icon;
            const isActive = pathname === `/${subject.slug}`;

            return (
              <Link
                key={subject.slug}
                href={`/${subject.slug}`}
                className={`group flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 
                ${isActive ? "bg-white/10" : "hover:bg-white/5"}
                `}>
                <Icon className={`h-5 w-5 ${subject.theme.text}`} />
                <span className="text-sm font-medium text-zinc-200">
                  {subject.name}
                </span>
              </Link>
            );
          })}
        </div>
      </ScrollArea>
    </aside>
  );
}
