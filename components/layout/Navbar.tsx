import React from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl">
      <div className="flex h-22 items-center justify-between px-8">
        <div>
          <h2 className="text-lg mb-1 font-semibold text-zinc-100">
        Dashboard - Your essentials all in one place
          </h2>
          <p className="text-sm text-zinc-500">Revision made elegant</p>
        </div>
        <div className="w-84">
          <div className="flex gap-3 justify-center items-center cursor-pointer">
            <Search className="size-5 text-zinc-300"/>
            <Input
              placeholder="Search formulas, concepts..."
              className="border-white/10 bg-white/5 text-zinc-100 placeholder:text-zinc-500"
            />
            
          </div>
        </div>
      </div>
    </header>
  );
}
