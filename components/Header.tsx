"use client";

import { Navbar } from "./Navbar";
import { AnnouncementBar } from "./AnnouncementBar";

export function Header() {
  return (
    <header className="fixed top-0 w-full z-50 flex flex-col border-b border-secondary/10 bg-background/80 backdrop-blur-md">
      <AnnouncementBar />
      <Navbar />
    </header>
  );
}
