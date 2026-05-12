import { createClient } from "@/lib/server";
import { notFound } from "next/navigation";

import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

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
  const { data: subject, error: subjectError } = await supabase
    .from("subjects")
    .select("*")
    .eq("slug", subjectSlug)
    .single();

  if (subjectError) throw subjectError;
  if (!subject) {
    notFound();
  }

  // Fetch chapter
  const { data: chapter, error: chapterError } = await supabase
    .from("chapters")
    .select("*")
    .eq("slug", chapterSlug)
    .eq("subject_id", subject.id)
    .single();

  if (chapterError) throw chapterError;
  if (!chapter) {
    notFound();
  }

  // Fetch content
  const { data: content, error: contentError } = await supabase
    .from("content")
    .select("*")
    .eq("chapter_id", chapter.id);

  if (contentError) throw contentError;

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-5xl font-bold mb-3">{chapter.title}</h1>

      <p className="text-gray-500 mb-10">{subject.name}</p>

      <div className="space-y-6">
        {content?.map((item) => (
          <div key={item.id} className="border rounded-2xl p-6">
            <div className="mb-2 text-sm text-gray-400 uppercase">
              {item.type}
            </div>

            <h2 className="text-2xl font-semibold mb-4">{item.title}</h2>

            <article className="prose prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}>
                {item.content}
              </ReactMarkdown>
            </article>
          </div>
        ))}
      </div>
    </main>
  );
}
