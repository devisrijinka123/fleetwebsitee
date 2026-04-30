"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#FFFFFF] text-[#00031F] pb-12 border-t border-black/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Copyright / Social Bar */}
        <div className="pt-12 border-t border-black/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 text-sm font-bold uppercase tracking-widest text-[#00031F]/65 pb-12">
          <div className="flex flex-col gap-2">
            <span>copyright 2026 ravity fleet{" "}
              <span className="lowercase">(powered by{" "}
                <Link href="https://www.ravity.io/" target="_blank" className="hover:text-[#F00D69] transition-colors">
                  ravity.io
                </Link>
                )
              </span>
            </span>
            <span className="text-[10px] opacity-60">All rights reserved.</span>
          </div>

          <div className="flex items-center gap-8">
            <Link href="https://www.ravity.io/privacy-policy" className="hover:text-[#00031F] transition-colors">Privacy</Link>
            {/* <Link href="/terms" className="hover:text-[#00031F] transition-colors">Terms</Link> */}
            <Link href="https://www.linkedin.com/company/ravity-software-solutions-pvt-ltd/" className="hover:text-[#00031F] transition-colors">LinkedIn</Link>
            <Link href="mailto:sales@ravity.io" className="hover:text-[#00031F] transition-colors">sales@ravity.io</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

