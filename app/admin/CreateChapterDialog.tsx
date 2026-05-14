"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { createClient } from "@/lib/client";

interface Subject {
  id: string;
  name: string;
}

interface Props {
  subjects: Subject[];
}

export default function CreateChapterDialog({ subjects }: Props) {
  const [open, setOpen] = React.useState(false);

  const [title, setTitle] = React.useState("");

  const [subjectId, setSubjectId] = React.useState("");

  const [loading, setLoading] = React.useState(false);

  const router = useRouter();

  const supabase = createClient();

  const slug = title.toLowerCase().replace(/\s+/g, "-");

  async function handleCreate() {
    if (!title || !subjectId) return;

    setLoading(true);

    const { error } = await supabase.from("chapters").insert({
      title,
      slug,
      subject_id: subjectId,
    });

    setLoading(false);

    if (error) {
      alert(error.message);

      return;
    }

    setOpen(false);

    setTitle("");

    setSubjectId("");

    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)} className="rounded-2xl mb-6 px-5 py-2.5">
        New Chapter
      </Button>

      <DialogContent className="border-white/10 bg-zinc-950 text-zinc-100">
        <DialogHeader>
          <DialogTitle>Create Chapter</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 pt-4">
          {/* Title */}
          <div>
            <p className="mb-2 text-sm text-zinc-400">Chapter Title</p>

            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Electrostatics"
              className="border-white/10 bg-white/3"
            />
          </div>

          {/* Slug */}
          <div>
            <p className="mb-2 text-sm text-zinc-400">Generated Slug</p>

            <div className="rounded-xl border border-white/10 bg-white/3 px-4 py-3 text-sm text-zinc-500">
              {slug || "chapter-slug"}
            </div>
          </div>

          {/* Subject */}
          <div>
            <p className="mb-2 text-sm text-zinc-400">Subject</p>

            <Select
              value={subjectId}
              onValueChange={(value) => setSubjectId(value || "")}>
              <SelectTrigger className="border-white/10 bg-white/3">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>

              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.id}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Button */}
          <Button
            onClick={handleCreate}
            disabled={loading}
            className="w-full rounded-2xl">
            {loading ? "Creating..." : "Create Chapter"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
