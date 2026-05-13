"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { createPortal } from "react-dom";

interface SearchItem {
  title: string;
  href: string;
  category: string;
}

export default function CommandMenu() {
  const [mounted, setMounted] = React.useState(false);
  const [searchData, setSearchData] = React.useState<SearchItem[]>([]);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    async function fetchSearch() {
      try {
        const res = await fetch("/api/search");
        if (!res.ok) {
          setSearchData([]);
          return;
        }
        const data = await res.json();
        setSearchData(Array.isArray(data) ? data : []);
      } catch {
        setSearchData([]);
      }
    }
    fetchSearch();
  }, []);

  const [open, setOpen] = React.useState(false);

  const router = useRouter();

  // Ctrl + K / Cmd + K
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();

        setOpen((prev) => !prev);
      }

      // ESC close
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      {/* Trigger */}
      <button
      type="button"
        onClick={() => setOpen(true)}
        className=" flex w-72 items-center justify-between rounded-2xl border border-white/10 bg-white/3 px-4 py-2.5 text-sm text-zinc-500 transition-all duration-200 hover:bg-white/5">
        <span>Search formulas, chapters...</span>

        <kbd className=" rounded-md border border-white/10 bg-white/3 px-2 py-1 text-xs">
          Ctrl K
        </kbd>
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <>
                {/* BACKDROP */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setOpen(false)}
                  className=" fixed inset-0 z-9998 bg-black/40 backdrop-blur-xs"
                />

                {/* PANEL */}
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 12,
                    scale: 0.98,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: 12,
                    scale: 0.98,
                  }}
                  transition={{ duration: 0.2 }}
                  className=" fixed left-1/2 top-[18%] z-9999 w-full max-w-4xl -translate-x-1/2 overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/90 shadow-2xl backdrop-blur-xs p-4">
                  <Command className="bg-transparent">
                    <CommandInput
                      placeholder="Search formulas, concepts, chapters..."
                      className=" h-14 max-w-full border-b border-white/10 bg-zinc-950/90 text-zinc-100 placeholder:text-zinc-500"
                    />

                    <CommandList className="max-h-100 overflow-y-auto p-2">
                      <CommandEmpty className="py-10 text-center text-sm text-zinc-500">
                        No results found.
                      </CommandEmpty>

                      <CommandGroup heading="Study Material">
                        {searchData.map((item) => (
                          <CommandItem
                            key={item.href}
                            value={item.title}
                            onSelect={() => {
                              router.push(item.href);

                              setOpen(false);
                            }}
                            className=" cursor-pointer rounded-2xl px-4 py-4 transition-all duration-200 hover:bg-white/5 aria-selected:bg-white/8">
                            <div>
                              <p className="text-sm font-medium text-zinc-100">
                                {item.title}
                              </p>

                              <p className="mt-1 text-xs text-zinc-500">
                                {item.category}
                              </p>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
