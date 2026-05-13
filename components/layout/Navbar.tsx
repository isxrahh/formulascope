import React from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import SearchPalette from "../navigation/SearchPalette";

interface Props {
  theme?: {
    border: string;
    glow: string;
  };
}

export default function Navbar({ theme }: Props) {
  return (
    <header
      className={`sticky top-0 z-50 border-b ${theme?.border || "border-white/10"} bg-zinc-950/70 backdrop-blur-xl`}>
      <div className={`absolute inset-0 opacity-20 blur-3xl ${theme?.glow}`} />
      <div className="flex h-22 items-center justify-between px-8">
        <div>
          <h2 className="text-lg mb-1 font-semibold text-zinc-100">
            Dashboard - Your essentials all in one place
          </h2>
          <p className="text-sm text-zinc-500">Revision made elegant</p>
        </div>
        <div className="w-84">
          <div className="flex gap-3 justify-center items-center cursor-pointer">
           <SearchPalette/>
          </div>
        </div>
      </div>
    </header>
  );
}
