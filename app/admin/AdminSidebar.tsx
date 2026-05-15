"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { BookOpen, FolderOpen, Sigma } from "lucide-react";

const items = [
  {
    label: "Subjects",
    href: "/admin/subjects",
    icon: BookOpen,
  },
  {
    label: "Chapters",
    href: "/admin/chapters",
    icon: FolderOpen,
  },
  {
    label: "Content",
    href: "/admin/content",
    icon: Sigma,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 border-r border-white/10 bg-zinc-950/80 p-6">
      <h2 className="text-xl font-semibold text-zinc-100">Admin</h2>

      <div className="mt-8 space-y-2">
        {items.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 rounded-2xl px-4 py-3
                transition-all duration-200
                ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-zinc-400 hover:bg-white/5"
                }
              `}>
              <Icon className="h-5 w-5" />

              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
