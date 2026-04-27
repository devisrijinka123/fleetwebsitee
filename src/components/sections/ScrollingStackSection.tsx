"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { DashboardDemo } from "@/components/dashboard/DashboardDemo";

const ROLES = [
  {
    step: "1/6",
    title: "Plan the fleet",
    description: "Decide what vehicles are needed, set specs, and handle buy vs lease, replacements, and end-of-life disposal.",
    view: "copilot" as const
  },
  {
    step: "2/6",
    title: "Keep vehicles on the road",
    description: "Schedule servicing/inspections, manage repairs, track defects, and minimise downtime—often coordinating workshops and external suppliers.",
    view: "overview" as const
  },
  {
    step: "3/6",
    title: "Manage compliance & legal risk",
    description: "Ensure the fleet and drivers comply with relevant laws and policies (e.g., licensing requirements, safety checks, audit trails).",
    view: "reports" as const
  },
  {
    step: "4/6",
    title: "Safety & driver support",
    description: "Set driving policies, oversee training, investigate incidents/accidents, and monitor behaviours that increase risk.",
    view: "fleet" as const
  },
  {
    step: "5/6",
    title: "Control costs",
    description: "Run budgets, fuel management, insurance, tyres/maintenance contracts, and negotiate with suppliers to reduce TCO.",
    view: "overview" as const
  },
  {
    step: "6/6",
    title: "Data & reporting",
    description: "Track KPIs like fuel efficiency, utilisation, downtime, and incident rates; report performance to ops/finance/leadership.",
    view: "reports" as const
  }
];

export function ScrollingStackSection() {
  return (
    <section className="relative bg-[#F9FAFB] py-32">
      <div className="max-w-[1400px] mx-auto px-12">
        {ROLES.map((role, index) => (
          <div 
            key={index} 
            className="sticky top-32 mb-32 min-h-[600px] flex items-center justify-between gap-24"
          >
            {/* Left Content Card */}
            <div className={cn(
              "w-[450px] p-12 bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 transition-all duration-700",
              "sticky top-32"
            )}>
              <span className="text-orange-500 font-bold text-sm tracking-widest border border-orange-500/20 px-3 py-1 rounded-md mb-8 inline-block">
                {role.step}
              </span>
              <h3 className="text-4xl font-extrabold text-[#00031F] tracking-tight mb-6 leading-tight">
                {role.title}
              </h3>
              <p className="text-lg text-[#00031F]/80 font-medium leading-relaxed">
                {role.description}
              </p>
            </div>

            {/* Right UI Panel */}
            <div className="flex-1 h-[600px] bg-gray-900 rounded-[2.5rem] overflow-hidden border-8 border-gray-100 shadow-2xl relative">
              <div className="absolute top-0 left-0 right-0 h-12 bg-gray-800 flex items-center px-6 gap-2 z-20">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="ml-4 px-4 py-1 bg-gray-700/50 rounded-md text-[10px] text-gray-400 font-mono tracking-wider">
                  ravity.io/fleet/{role.view}
                </div>
              </div>
              <div className="absolute inset-0 pt-12">
                <DashboardDemo initialView={role.view} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

