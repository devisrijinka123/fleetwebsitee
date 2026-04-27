"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "./Button";

export function Header({ onBookDemo }: { onBookDemo?: () => void }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col font-sans">
      {/* Trust banner */}
      <div className="bg-[#00031F] text-white/60 text-[10px] font-bold uppercase tracking-widest text-center py-1.5 px-4">
        Backed by Maruti Suzuki &middot; Nasscom Emerge 50 Winner
      </div>

      <div className="h-12 bg-[#FFFFFF] border-b border-black/10 flex items-center justify-between px-8 shadow-sm">
        <Link href="/" className="flex items-center gap-1.5 group">
          <div className="relative w-5 h-5 transition-all duration-500">
            <Image
              src="/logo.jpeg"
              alt="Ravity Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-xl font-extrabold text-[#00031F] tracking-[-0.04em] transition-all duration-500 group-hover:text-[#F0197A]">
            Ravity Fleet
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10 h-full">
          <div className="relative h-full flex items-center group">
            <Link
              href="/"
              className="text-[13px] font-bold text-[#00031F]/85 hover:text-[#00031F] transition-colors uppercase tracking-wider flex items-center gap-1 py-4"
            >
              Product
            </Link>

            <div className="absolute top-full left-0 w-64 bg-[#FFFFFF] border border-black/15 shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 py-2">
              <Link
                href="/#fleet-intelligence"
                className="block px-6 py-3 text-[11px] font-bold text-[#00031F]/85 hover:text-[#F0197A] hover:bg-black/[0.02] uppercase tracking-widest transition-colors"
              >
                Fleet Sage
              </Link>
              <Link
                href="/#ai-fleet-manager"
                className="block px-6 py-3 text-[11px] font-bold text-[#00031F]/85 hover:text-[#F0197A] hover:bg-black/[0.02] uppercase tracking-widest transition-colors"
              >
                AI Fleet Manager
              </Link>
              <Link
                href="/#cameras-video"
                className="block px-6 py-3 text-[11px] font-bold text-[#00031F]/85 hover:text-[#F0197A] hover:bg-black/[0.02] uppercase tracking-widest transition-colors"
              >
                Cameras &amp; Video
              </Link>
              <Link
                href="/#fms"
                className="block px-6 py-3 text-[11px] font-bold text-[#00031F]/85 hover:text-[#F0197A] hover:bg-black/[0.02] uppercase tracking-widest transition-colors"
              >
                Fleet Management System
              </Link>
            </div>
          </div>

          <div className="relative h-full flex items-center group">
            <Link
              href="/about"
              className="text-[13px] font-bold text-[#00031F]/85 hover:text-[#00031F] transition-colors uppercase tracking-wider flex items-center gap-1 py-4"
            >
              Company
            </Link>

            <div className="absolute top-full left-0 w-64 bg-[#FFFFFF] border border-black/15 shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 py-2">
              <Link
                href="/about"
                className="block px-6 py-3 text-[11px] font-bold text-[#00031F]/85 hover:text-[#F0197A] hover:bg-black/[0.02] uppercase tracking-widest transition-colors"
              >
                Mission
              </Link>
              <Link
                href="/about#news"
                className="block px-6 py-3 text-[11px] font-bold text-[#00031F]/85 hover:text-[#F0197A] hover:bg-black/[0.02] uppercase tracking-widest transition-colors"
              >
                News
              </Link>
              <Link
                href="/about#careers"
                className="block px-6 py-3 text-[11px] font-bold text-[#00031F]/85 hover:text-[#F0197A] hover:bg-black/[0.02] uppercase tracking-widest transition-colors"
              >
                Careers
              </Link>
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="https://fleet.ravity.io/" className="text-[13px] font-bold text-[#F0197A] hover:text-[#F0197A]/80 transition-colors uppercase tracking-wider mr-2">
            Login
          </Link>
          <Button
            variant="primary"
            className="bg-[#F0197A] hover:bg-[#C0106A] rounded-lg px-6 h-9 font-bold uppercase text-[11px] tracking-widest transition-all duration-500 shadow-[0_4px_16px_rgba(240,25,122,0.35)]"
            onClick={onBookDemo}
          >
            Book a Demo
          </Button>
        </div>
      </div>
    </header>
  );
}
