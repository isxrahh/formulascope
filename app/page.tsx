import { createClient } from "@/lib/client";


export default async function Home() {
  const supabase = await createClient();

  const { data: subjects, error } = await supabase
    .from("subjects")
    .select("*");

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-8">
        Formula Scope
      </h1>

      <div className="space-y-4">
        {subjects?.map((subject) => (
          <div
            key={subject.id}
            className="border rounded-2xl p-5"
          >
            <h2 className="text-2xl font-semibold">
              {subject.name}
            </h2>

            <p className="text-gray-500">
              {subject.slug}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}