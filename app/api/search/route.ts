import { createClient } from "@/lib/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const { data: chapters, error } = await supabase.from("chapters").select(`
      id,
      title,
      slug,
      subjects (
        slug,
        name
      )
    `);

  if (error) {
    return NextResponse.json(
      { error: "Failed to load search index" },
      { status: 500 },
    );
  }

  const formatted = (chapters ?? [])
    .filter((chapter: any) => chapter.subjects?.slug && chapter.slug)
    .map((chapter: any) => ({
      title: chapter.title,
      href: `/${chapter.subjects.slug}/${chapter.slug}`,
      category: chapter.subjects.name ?? "Unknown",
    }));

  return NextResponse.json(formatted);
}
