import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function NoteCard({ title, children }: Props) {
  return (
    <Card className="border-white/10 bg-white/3 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-zinc-300">Concept</CardTitle>
        <p className="text-xl font-semibold text-zinc-100">{title}</p>
      </CardHeader>

      <CardContent>
        <div className="prose prose-invert max-w-none text-lg">{children}</div>
      </CardContent>
    </Card>
  );
}
