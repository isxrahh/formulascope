import { createClient } from "@/lib/server";
import { notFound } from "next/navigation";
interface Props {
  params: Promise<{
    subject: string;
  }>;
}

export default async function SubjectPage({ params }: Props) {
  const { subject: subjectSlug } = await params;

  const supabase = await createClient();

  const { data: subject, error: subjectError } = await supabase
    .from("subjects")
    .select("*")
    .eq("slug", subjectSlug)
    .single();
  if (subjectError) throw subjectError;
  if (!subject) {
    notFound();
  }
  const { data: chapters, error: chaptersError } = await supabase
    .from("chapters")
    .select("*")
    .eq("subject_id", subject.id)
    .order("chapter_order");
  if (chaptersError) throw chaptersError;
  return (
    <main className="min-h-screen p-10">
      <h1 className="text-5xl font-bold mb-10">{subject.name}</h1>

      <div className="grid gap-4">
        {chapters?.map((chapter) => (
          <div key={chapter.id} className="border rounded-2xl p-5">
            <h2 className="text-3xl font-semibold">{chapter.title}</h2>
            <p className="text-gray-500">{chapter.slug}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
