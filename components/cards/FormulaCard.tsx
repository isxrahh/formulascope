import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function FormulaCard({ title, children }: Props) {
  return (
    <Card className="group relative overflow-hidden border-cyan-500/20 bg-cyan-500/5 backdrop-blur-xl py-8">
     <div className="absolute inset-0 bg-cyan-500/5 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
      <CardHeader>
        <CardTitle className="text-cyan-300 mb-4 tracking-widest uppercase text-sm">Formula</CardTitle>
        <p className="text-xl font-semibold text-zinc-100">{title}</p>
      </CardHeader>

      <CardContent>
        <div className="prose prose-invert max-w-none text-lg text-white/80">{children}</div>
      </CardContent>
    </Card>
  );
}
