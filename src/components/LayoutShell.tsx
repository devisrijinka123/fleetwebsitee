"use client";

import { useState, useEffect } from "react";
import { Header } from "./Header";
import { BookDemoModal } from "./BookDemoModal";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    const handler = () => setDemoOpen(true);
    window.addEventListener('open-book-demo', handler);
    return () => window.removeEventListener('open-book-demo', handler);
  }, []);

  return (
    <>
      <Header onBookDemo={() => setDemoOpen(true)} />
      {children}
      <BookDemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
