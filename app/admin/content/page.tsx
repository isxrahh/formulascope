"use client";

import React from "react";
import { createClient } from "@/lib/client";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import EditorToolbar from "@/components/editor/EditorToolbar";

type Chapter = {
  id: string;
  title: string;
};

type ContentItem = {
  id: string;
  title: string;
  type: string;
};

export default function ContentPage() {
  const supabase = createClient();

  const [chapters, setChapters] = React.useState<Chapter[]>([]);
  const [content, setContent] = React.useState<ContentItem[]>([]);
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [type, setType] = React.useState("note");
  const [chapterId, setChapterId] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Fetch data
  async function fetchChapters() {
    const { data } = await supabase.from("chapters").select("id, title");
    setChapters(data || []);
  }

  async function fetchContent() {
    const { data } = await supabase
      .from("content")
      .select("*")
      .order("created_at", { ascending: false });
    setContent(data || []);
  }

  React.useEffect(() => {
    fetchChapters();
    fetchContent();
  }, []);

  // Create content
  async function handleCreate() {
    if (!title || !body || !chapterId) return;

    setLoading(true);
    const { error } = await supabase.from("content").insert({
      title,
      content: body,
      type,
      chapter_id: chapterId,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    // Reset form
    setTitle("");
    setBody("");
    setType("note");
    setChapterId("");

    fetchContent();
  }

  function insertSnippet(snippet: string) {
    const textarea = textareaRef.current;

    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const before = body.substring(0, start);
    const after = body.substring(end);

    const newValue = before + snippet + after;

    setBody(newValue);

    // restore cursor position
    requestAnimationFrame(() => {
      textarea.focus();

      const cursor = start + snippet.length;

      textarea.setSelectionRange(cursor, cursor);
    });
  }
  return (
    <div className="space-y-12">
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-white">Content</h1>
        <p className="mt-2 text-zinc-500">
          Manage formulas, notes and revisions.
        </p>
      </div>

      {/* FORM */}
      <div className="rounded-3xl border border-white/10 bg-white/3 p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <p className="mb-2 text-sm text-zinc-400">Title</p>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Coulomb's Law"
                className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none focus:border-white/30 transition-colors"
              />
            </div>

            {/* Type */}
            <div>
              <p className="mb-2 text-sm text-zinc-400">Type</p>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-zinc-900 p-4 text-white outline-none focus:border-white/30 transition-colors">
                <option value="note">Note</option>
                <option value="formula">Formula</option>
                <option value="revision">Revision</option>
              </select>
            </div>

            {/* Chapter */}
            <div>
              <p className="mb-2 text-sm text-zinc-400">Chapter</p>
              <select
                value={chapterId}
                onChange={(e) => setChapterId(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-zinc-900 p-4 text-white outline-none focus:border-white/30 transition-colors">
                <option value="">Select chapter</option>
                {chapters.map((chapter) => (
                  <option key={chapter.id} value={chapter.id}>
                    {chapter.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Content */}
            <div>
              <p className="mb-2 text-sm text-zinc-400">
                Content (Markdown + LaTeX)
              </p>

              <EditorToolbar onInsert={insertSnippet} />

              <textarea
                ref={textareaRef}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={12}
                placeholder="Write your markdown or LaTeX here..."
                className="w-full resize-y rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none focus:border-white/30 transition-colors font-mono text-sm"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleCreate}
              disabled={loading || !title || !body || !chapterId}
              className="w-full rounded-2xl bg-white py-4 font-semibold text-black hover:bg-zinc-200 transition disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? "Saving..." : "Save Content"}
            </button>
          </div>

          {/* LIVE PREVIEW - Now on the right on large screens */}
          <div>
            <div className="sticky top-6">
              <div className="mb-4 flex items-center gap-2">
                <h2 className="text-xl font-semibold text-white">
                  Live Preview
                </h2>
                <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-zinc-400">
                  {type}
                </span>
              </div>

              <div
                className={`rounded-3xl border p-8 min-h-200 overflow-auto ${
                  type === "revision"
                    ? "border-yellow-500/30 bg-yellow-950/30"
                    : "border-white/10 bg-zinc-950"
                }`}>
                <h3
                  className={`mb-6 text-2xl font-semibold ${
                    type === "revision" ? "text-yellow-300" : "text-white"
                  }`}>
                  {title || "Preview Title"}
                </h3>

                <article
                  className="
                    max-w-none
                    prose prose-invert prose-zinc
                    prose-headings:text-white prose-headings:font-semibold
                    prose-p:text-zinc-200 prose-p:leading-relaxed
                    prose-strong:text-white
                    prose-li:text-zinc-200
                    prose-code:text-cyan-300 prose-code:bg-zinc-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                    prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-white/10
                    prose-blockquote:text-zinc-300 prose-blockquote:border-l-4 prose-blockquote:border-zinc-700
                    prose-a:text-cyan-400 hover:prose-a:text-cyan-300
                    prose-img:rounded-2xl
                  ">
                  <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}>
                    {body || "Your formatted content will appear here..."}
                  </ReactMarkdown>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT LIST */}
      <div className="rounded-3xl border border-white/10 bg-white/3 overflow-hidden">
        <div className="border-b border-white/10 px-6 py-5">
          <h2 className="text-lg font-semibold text-white">Content Blocks</h2>
        </div>

        <div className="divide-y divide-white/5">
          {content.length === 0 ? (
            <p className="px-6 py-12 text-center text-zinc-500">
              No content yet. Create your first one above.
            </p>
          ) : (
            content.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between px-6 py-5 hover:bg-white/5 transition">
                <div>
                  <h3 className="font-medium text-white">{item.title}</h3>
                  <p className="text-sm text-zinc-500 capitalize">
                    {item.type}
                  </p>
                </div>
                <span className="text-xs text-zinc-500">Just now</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
