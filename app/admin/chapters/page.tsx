"use client";

import React from "react";
import { createClient } from "@/lib/client";

type Chapter = {
  id: string;
  title: string;
  slug: string;
  subject_id: string;
};

export default function ChaptersPage() {
  const supabase = React.useMemo(() => createClient(), []);

  const [chapters, setChapters] = React.useState<Chapter[]>([]);
  const [loading, setLoading] = React.useState(true);

  const [editing, setEditing] = React.useState<Chapter | null>(null);
  const [editTitle, setEditTitle] = React.useState("");

  // Fetch chapters
  const fetchChapters = React.useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from("chapters").select("*");
    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }
    setChapters(data ?? []);
    setLoading(false);
  }, [supabase]);

  React.useEffect(() => {
    void fetchChapters();
  }, [fetchChapters]);

  // Delete chapter
  async function handleDelete(id: string) {
    const confirmDelete = confirm("Delete this chapter?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("chapters").delete().eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }
    setChapters((prev) => prev.filter((c) => c.id !== id));
  }

  // Open edit modal
  function openEdit(chapter: Chapter) {
    setEditing(chapter);
    setEditTitle(chapter.title);
  }

  // Update chapter
  async function handleUpdate() {
    if (!editing) return;

    const normalizedTitle = editTitle.trim();
    if (!normalizedTitle) return;
    const normalizedSlug = normalizedTitle
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    if (!normalizedSlug) return;
    const { error } = await supabase
      .from("chapters")
      .update({
        title: normalizedTitle,
        slug: normalizedSlug,
      })
      .eq("id", editing.id);

    if (error) {
      alert(error.message);
      return;
    }
    setEditing(null);
    void fetchChapters();
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-zinc-100">Chapters</h1>

        <p className="mt-2 text-zinc-500">Manage all study chapters</p>
      </div>

      {/* Content */}
      <div className="rounded-3xl border border-white/10 bg-white/3">
        <div className="border-b border-white/10 px-6 py-4">
          <h2 className="text-lg font-semibold text-zinc-100">All Chapters</h2>
        </div>

        <div className="divide-y divide-white/5">
          {loading ? (
            <div className="p-6 text-zinc-500">Loading...</div>
          ) : (
            chapters.map((chapter) => (
              <div
                key={chapter.id}
                className="flex items-center justify-between px-6 py-5 hover:bg-white/3">
                {/* Left */}
                <div>
                  <h3 className="font-medium text-zinc-100">{chapter.title}</h3>

                  <p className="mt-1 text-sm text-zinc-500">/{chapter.slug}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => openEdit(chapter)}
                    className="text-sm text-blue-400 hover:text-blue-300">
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(chapter.id)}
                    className="text-sm text-red-400 hover:text-red-300">
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* EDIT MODAL */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-105 rounded-2xl border border-white/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white">Edit Chapter</h2>

            <div className="mt-4">
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none"
                placeholder="Chapter title"
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setEditing(null)}
                className="text-sm text-zinc-400">
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
