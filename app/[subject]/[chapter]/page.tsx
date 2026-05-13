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

export default async function ChapterPage({ params }: Props) {
  const { subject: subjectSlug, chapter: chapterSlug } = await params;

  const supabase = await createClient();

  // Fetch subject
  const { data: subject } = await supabase
    .from("subjects")
    .select("*")
    .eq("slug", subjectSlug)
    .single();

  if (!subject) {
    notFound();
  }

  // Fetch chapter
  const { data: chapter } = await supabase
    .from("chapters")
    .select("*")
    .eq("slug", chapterSlug)
    .eq("subject_id", subject.id)
    .single();

  if (!chapter) {
    notFound();
  }

  // Fetch content
  const { data: content } = await supabase
    .from("content")
    .select("*")
    .eq("chapter_id", chapter.id);

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-5xl font-bold mb-3">{chapter.title}</h1>

      <p className="text-gray-500 mb-10">{subject.name}</p>

      <div className="space-y-6">
        {content?.map((item) => {
          let CardComponent:
            | typeof FormulaCard
            | typeof RevisionCard
            | typeof NoteCard;

          switch (item.type) {
            case "formula":
              CardComponent = FormulaCard;
              break;

            case "revision":
              CardComponent = RevisionCard;
              break;

            default:
              CardComponent = NoteCard;
          }

          return (
            <CardComponent key={item.id} title={item.title}>
              <article className="prose prose-invert max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}>
                  {item.content}
                </ReactMarkdown>
              </article>
            </CardComponent>
          );
        })}
      </div>
    </main>
  );
}
