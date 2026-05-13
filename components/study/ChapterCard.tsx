"use client";

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface Props {
  title: string;
  slug: string;
  subjectSlug: string;
  description?: string;
  theme: {
  text: string;
  border: string;
  bg: string;
  glow: string;
  badge: string;
};
}

export default function ChapterCard({
  title,
  slug,
  subjectSlug,
  description,
  theme
}: Props) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Link
        href={`/${subjectSlug}/${slug}`}
        className={`group relative block overflow-hidden rounded-[2rem] border ${theme.border} bg-white/3 p-7 transition-all duration-300 hover:border-white/20 hover:bg-white/5`}>
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className={`absolute -right-10 -top-10 h-40 w-40 rounded-full ${theme.glow} blur-3xl `} />
        </div>
        <div className="relative">
          <div className="flex items-start justify-between">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.25em] text-zinc-500">
                Chapter
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
                {title}
              </h2>
            </div>

            <ArrowUpRight className="h-5 w-5 text-zinc-600 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1 group-hover:text-zinc-300" />
          </div>

          <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-zinc-400">
            {description || "Concepts, formulas and revision material."}
          </p>

          <div className="mt-8 flex items-center gap-3">
             <div className={`rounded-full border ${theme.border} ${theme.badge} px-4 py-1.5 text-xs`}>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
