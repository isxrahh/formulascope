import { createClient } from "@/lib/server";
import { notFound } from "next/navigation";

import SubjectHero from "@/components/study/SubjectHero";
import { subjects } from "@/lib/subjects";
import ChapterCard from "@/components/study/ChapterCard";

interface Props {
  params: Promise<{
    subject: string;
  }>;
}

export default async function SubjectPage({ params }: Props) {
  const { subject: subjectSlug } = await params;

  const supabase = await createClient();

  const { data: subject } = await supabase
    .from("subjects")
    .select("*")
    .eq("slug", subjectSlug)
    .single();

  if (!subject) {
    notFound();
  }

  const subjectConfig = subjects.find((s) => s.slug === subject.slug);
if (!subjectConfig) {
   notFound();
  }
  const { data: chapters } = await supabase
    .from("chapters")
    .select("*")
    .eq("subject_id", subject.id)
    .order("chapter_order");

  return (
    <main className="min-h-screen p-10">
      <SubjectHero
        title={subject.name}
        description={
          subjectConfig.description || "Study material and revision."
        }
        glowClass={subjectConfig.theme.glow}
      />

      <div className="mt-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-zinc-100">Chapters</h2>
            <p className="mt-1 text-zinc-500">
              Explore concepts and revision material.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {chapters?.map((chapter) => (
          <ChapterCard
            key={chapter.id}
            title={chapter.title}
            slug={chapter.slug}
            subjectSlug={subject.slug}
            description={chapter.description}
            theme={subjectConfig.theme}
          />
        ))}
      </div>
    </main>
  );
}
