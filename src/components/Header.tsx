"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "./Button";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header({ onBookDemo }: { onBookDemo?: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col font-sans">
      {/* Trust banner */}
      <div className="bg-[#00031F] text-white text-[10px] font-bold uppercase tracking-widest text-center py-1.5 px-4">
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
                href="/#fleet-sage"
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

        <div className="hidden md:flex items-center gap-4">
          <Link href="https://platform.rfleet.ai/" className="text-[13px] font-bold text-[#F0197A] hover:text-[#F0197A]/80 transition-colors uppercase tracking-wider mr-2">
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
        <button
          className="md:hidden p-2 text-[#00031F] hover:text-[#F0197A] transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <div
        className={cn(
          "md:hidden bg-[#FFFFFF] border-b border-black/10 overflow-hidden transition-all duration-300 ease-in-out",
          mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-6 py-4 space-y-1">
          <button
            onClick={() => setMobileProductOpen(!mobileProductOpen)}
            className="w-full flex items-center justify-between py-3 text-[13px] font-bold text-[#00031F] uppercase tracking-wider border-b border-black/5"
          >
            Product
            <ChevronDown size={16} className={cn("transition-transform duration-200", mobileProductOpen && "rotate-180")} />
          </button>
          <div className={cn("overflow-hidden transition-all duration-200", mobileProductOpen ? "max-h-64" : "max-h-0")}>
            <div className="pl-4 py-2 space-y-1">
              <Link href="/#fleet-sage" onClick={() => setMobileOpen(false)} className="block py-2.5 text-[12px] font-bold text-[#00031F]/70 hover:text-[#F0197A] uppercase tracking-widest transition-colors">Fleet Sage</Link>
              <Link href="/#ai-fleet-manager" onClick={() => setMobileOpen(false)} className="block py-2.5 text-[12px] font-bold text-[#00031F]/70 hover:text-[#F0197A] uppercase tracking-widest transition-colors">AI Fleet Manager</Link>
              <Link href="/#cameras-video" onClick={() => setMobileOpen(false)} className="block py-2.5 text-[12px] font-bold text-[#00031F]/70 hover:text-[#F0197A] uppercase tracking-widest transition-colors">Cameras &amp; Video</Link>
              <Link href="/#fms" onClick={() => setMobileOpen(false)} className="block py-2.5 text-[12px] font-bold text-[#00031F]/70 hover:text-[#F0197A] uppercase tracking-widest transition-colors">Fleet Management System</Link>
            </div>
          </div>
           <button
              onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
              className="w-full flex items-center justify-between py-3 text-[13px] font-bold text-[#00031F] uppercase tracking-wider border-b border-black/5"
            >
              Company
              <ChevronDown size={16} className={cn("transition-transform duration-200", mobileCompanyOpen && "rotate-180")} />
            </button>
          <div className={cn("overflow-hidden transition-all duration-200", mobileCompanyOpen ? "max-h-48" : "max-h-0")}>
            <div className="pl-4 py-2 space-y-1">
              <Link href="/about" onClick={() => setMobileOpen(false)} className="block py-2.5 text-[12px] font-bold text-[#00031F]/70 hover:text-[#F0197A] uppercase tracking-widest transition-colors">Mission</Link>
              <Link href="/about#news" onClick={() => setMobileOpen(false)} className="block py-2.5 text-[12px] font-bold text-[#00031F]/70 hover:text-[#F0197A] uppercase tracking-widest transition-colors">News</Link>
              <Link href="/about#careers" onClick={() => setMobileOpen(false)} className="block py-2.5 text-[12px] font-bold text-[#00031F]/70 hover:text-[#F0197A] uppercase tracking-widest transition-colors">Careers</Link>
            </div>
          </div>

          <div className="pt-4 pb-2 flex flex-col gap-3">
            <Link
              href="https://platform.rfleet.ai/"
              onClick={() => setMobileOpen(false)}
              className="text-center text-[13px] font-bold text-[#F0197A] uppercase tracking-wider py-2.5 border border-[#F0197A]/30 rounded-lg hover:bg-[#F0197A]/5 transition-colors"
            >
              Login
            </Link>
            <button
              onClick={() => { setMobileOpen(false); onBookDemo?.(); }}
              className="w-full bg-[#F0197A] text-white py-3 rounded-lg font-bold uppercase text-[11px] tracking-widest hover:bg-[#C0106A] transition-colors shadow-[0_4px_16px_rgba(240,25,122,0.35)]"
            >
              Book a Demo
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
