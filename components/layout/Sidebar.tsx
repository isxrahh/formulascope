"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";

import { subjects } from "@/lib/subjects";

interface Props {
  subjectTheme: {
    border: string;
    glow: string;
    bg: string;
  };
}

export default function Sidebar({ subjectTheme }: Props) {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-72 flex-col border-r border-white/10 bg-zinc-950/80 backdrop-blur-xl">
      {/* Logo */}
      <div className="px-6 py-8">
        <Image src="/logo.png" width={240} height={31} alt="FORMULASCOPE" />

        <p className="mt-4 text-sm text-zinc-500">
          Your personal academic system
        </p>
      </div>

      <Separator className={subjectTheme.bg} />

      {/* Navigation */}
      <ScrollArea className="flex-1 px-4 py-6">
        <div className="space-y-2">
          {subjects.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === `/${item.slug}` ||
              pathname.startsWith(`/${item.slug}/`);

            return (
              <Link
                key={item.slug}
                href={`/${item.slug}`}
                className="
                  group flex items-center gap-3
                  rounded-2xl px-4 py-3
                  transition-all duration-200
                "
                style={{
                  backgroundColor: isActive
                    ? "rgba(255,255,255,0.08)"
                    : undefined,
                }}>
                <Icon className={`h-5 w-5 ${item.theme.text}`} />

                <span className="text-sm font-medium text-zinc-200">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </ScrollArea>
    </aside>
  );
}
