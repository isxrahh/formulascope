import { createClient } from "@/lib/server";
import { notFound } from "next/navigation";

import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import FormulaCard from "@/components/cards/FormulaCard";
import RevisionCard from "@/components/cards/RevisionCard";
import NoteCard from "@/components/cards/NoteCard";

interface Props {
  params: Promise<{
    subject: string;
    chapter: string;
  }>;
}

export default async function ChapterPage({
  params,
}: Props) {
  const {
    subject: subjectSlug,
    chapter: chapterSlug,
  } = await params;

  const supabase = await createClient();

  // SUBJECT
  const { data: subject } =
    await supabase
      .from("subjects")
      .select("*")
      .eq("slug", subjectSlug)
      .single();

  if (!subject) {
    notFound();
  }

  // CHAPTER
  const { data: chapter } =
    await supabase
      .from("chapters")
      .select("*")
      .eq("slug", chapterSlug)
      .eq("subject_id", subject.id)
      .single();

  if (!chapter) {
    notFound();
  }

  // CONTENT
  const { data: content } =
    await supabase
      .from("content")
      .select("*")
      .eq("chapter_id", chapter.id);

  return (
    <main className="min-h-screen p-10">
      {/* HEADER */}
      <div className="mb-12">
        <h1 className="mb-3 text-5xl font-bold text-white">
          {chapter.title}
        </h1>

        <p className="text-zinc-500">
          {subject.name}
        </p>
      </div>

      {/* LAYOUT */}
      <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
        {/* CONTENT */}
        <div className="space-y-6">
          {content?.map((item) => {
            let CardComponent:
              | typeof FormulaCard
              | typeof RevisionCard
              | typeof NoteCard;

            switch (item.type) {
              case "formula":
                CardComponent =
                  FormulaCard;
                break;

              case "revision":
                CardComponent =
                  RevisionCard;
                break;

              default:
                CardComponent =
                  NoteCard;
            }

            return (
              <div
                key={item.id}
                id={item.title
                  .toLowerCase()
                  .replace(/\s+/g, "-")}
              >
                <CardComponent
                  title={item.title}
                >
                  <article
                    className="
                      prose prose-invert
                      max-w-none

                      prose-headings:text-white
                      prose-p:text-zinc-200
                      prose-li:text-zinc-300
                      prose-strong:text-white

                      [&_.katex-display]:overflow-x-auto
                      [&_.katex-display]:py-4
                    "
                  >
                    <ReactMarkdown
                      remarkPlugins={[
                        remarkMath,
                      ]}
                      rehypePlugins={[
                        rehypeKatex,
                      ]}
                    >
                      {item.content}
                    </ReactMarkdown>
                  </article>
                </CardComponent>
              </div>
            );
          })}
        </div>

        {/* TOC */}
        <div className="hidden lg:block">
          <div
            className="
              sticky top-10

              rounded-3xl
              border border-white/10
              bg-zinc-950/80

              p-6
            "
          >
            <h3
              className="
                mb-5 text-sm
                font-semibold uppercase
                tracking-[0.2em]
                text-zinc-500
              "
            >
              On This Page
            </h3>

            <div className="space-y-2">
              {content?.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.title
                    .toLowerCase()
                    .replace(
                      /\s+/g,
                      "-"
                    )}`}
                  className="
                    block rounded-xl
                    px-3 py-2

                    text-sm text-zinc-400

                    transition-all duration-200

                    hover:bg-white/3
                    hover:text-white
                  "
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}