"use client";

import { ExternalLink } from "lucide-react";

export function CreatorBadge() {
  return (
    <a
      href="https://keanuworksva.vercel.app/"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-10 right-6 z-[80] group flex items-center gap-2 bg-white/90 backdrop-blur-md border border-black/5 p-2 pr-4 rounded-full shadow-lg hover:bg-black hover:text-white transition-all duration-500 hover:scale-105 active:scale-95"
      aria-label="Visit designer's website"
    >
      <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-black group-hover:bg-accent transition-colors">
        K
      </div>
      <div className="flex flex-col gap-y-1">
        <span className="text-[8px] font-bold uppercase tracking-widest leading-none text-gray-400 group-hover:text-gray-300">Created by</span>
        <span className="text-[11px] font-black tracking-tight leading-none">Keanu Works VA</span>
      </div>
      <ExternalLink size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  );
}
