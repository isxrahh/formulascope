import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function FormulaCard({ title, children }: Props) {
  return (
    <Card className="border-cyan-500/20 bg-cyan-500/5 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-cyan-300">Formula</CardTitle>
        <p className="text-xl font-semibold text-zinc-100">{title}</p>
      </CardHeader>

      <CardContent>
        <div className="prose prose-invert max-w-none text-lg">{children}</div>
      </CardContent>
    </Card>
  );
}
