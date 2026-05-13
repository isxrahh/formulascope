import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function RevisionCard({ title, children }: Props) {
  return (
    <Card className="border-amber-500/20 bg-amber-500/5 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-amber-300 mb-4 tracking-widest uppercase text-sm">Quick Revision</CardTitle>
        <p className="text-xl font-semibold text-zinc-100">{title}</p>
      </CardHeader>

      <CardContent className="text-zinc-200">
         <div className="prose prose-invert max-w-none text-lg">{children}</div>
      </CardContent>
    </Card>
  );
}
