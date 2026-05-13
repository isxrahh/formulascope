import { createClient } from "@/lib/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const { data: chapters } = await supabase
    .from("chapters")
    .select(`
      id,
      title,
      slug,
      subjects (
        slug,
        name
      )
    `);

  const formatted =
    chapters?.map((chapter: any) => ({
      title: chapter.title,
      href: `/${chapter.subjects.slug}/${chapter.slug}`,
      category: chapter.subjects.name,
    })) || [];

  return NextResponse.json(formatted);
}