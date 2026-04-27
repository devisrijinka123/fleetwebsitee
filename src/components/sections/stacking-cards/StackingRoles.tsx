"use client";

import { cn } from "@/lib/utils";
import { 
  Calendar, 
  Wrench, 
  ShieldCheck, 
  UserCheck, 
  CircleDollarSign, 
  LineChart 
} from "lucide-react";

const ROLES = [
  {
    step: "1/6",
    title: "Plan the fleet",
    subtitle: "Right vehicles, right time",
    description: "Decide what vehicles are needed, set specs, and handle buy vs lease, replacements, and end-of-life disposal.",
    icon: <Calendar className="text-pink-500" size={24} />,
    uiType: "planning"
  },
  {
    step: "2/6",
    title: "Keep vehicles on the road",
    subtitle: "Maintenance & uptime",
    description: "Schedule servicing/inspections, manage repairs, track defects, and minimise downtime—often coordinating workshops and external suppliers.",
    icon: <Wrench className="text-blue-500" size={24} />,
    uiType: "maintenance"
  },
  {
    step: "3/6",
    title: "Manage compliance & legal risk",
    subtitle: "Safety & Audit Readiness",
    description: "Ensure the fleet and drivers comply with relevant laws and policies (licensing, safety checks, audit trails, driver hours).",
    icon: <ShieldCheck className="text-purple-500" size={24} />,
    uiType: "compliance"
  },
  {
    step: "4/6",
    title: "Safety & driver support",
    subtitle: "Behavioral Intelligence",
    description: "Set driving policies, oversee training, investigate incidents, and monitor behaviours that increase risk (speeding, overloading).",
    icon: <UserCheck className="text-cyan-500" size={24} />,
    uiType: "safety"
  },
  {
    step: "5/6",
    title: "Control costs",
    subtitle: "Financial Optimization",
    description: "Run budgets, fuel management, insurance, and negotiate with suppliers to reduce total cost of ownership.",
    icon: <CircleDollarSign className="text-indigo-500" size={24} />,
    uiType: "costs"
  },
  {
    step: "6/6",
    title: "Data & reporting",
    subtitle: "Performance Tracking",
    description: "Track KPIs like fuel efficiency, utilisation, downtime, and incident rates; report performance to leadership.",
    icon: <LineChart className="text-pink-600" size={24} />,
    uiType: "reporting"
  }
];

export function StackingRoles() {
  return (
    <section className="relative bg-[#F9FAFB] py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-32">
          {ROLES.map((role, index) => (
            <div 
              key={index} 
              className="sticky top-32 min-h-[60vh] bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden flex flex-col md:flex-row"
              style={{ 
                marginTop: index === 0 ? 0 : `-15vh`, // Creates the overlap effect
                zIndex: index + 10 
              }}
            >
              {/* Text Side */}
              <div className="flex-1 p-12 md:p-20 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 rounded-lg border border-pink-200 text-pink-600 text-xs font-bold mb-8 w-fit">
                  {role.step}
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#00031F] tracking-tight mb-4 leading-tight">
                  {role.title}
                </h2>
                <h3 className="text-xl font-bold text-gray-400 mb-6 uppercase tracking-widest text-sm">
                  {role.subtitle}
                </h3>
                <p className="text-lg md:text-xl text-[#00031F]/80 font-medium leading-relaxed max-w-md">
                  {role.description}
                </p>
              </div>

              {/* UI Visual Side */}
              <div className="flex-1 bg-gray-50/50 p-12 md:p-20 flex items-center justify-center relative overflow-hidden">
                <div className="w-full aspect-square max-w-md rounded-3xl bg-white border border-gray-100 shadow-xl p-8 animate-in fade-in zoom-in duration-700">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center">
                      {role.icon}
                    </div>
                    <div>
                      <div className="h-2 w-32 bg-gray-100 rounded-full mb-2" />
                      <div className="h-2 w-20 bg-gray-50 rounded-full" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-24 w-full bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center text-[#00031F]/45 font-bold uppercase tracking-widest text-[10px]">
                      {role.uiType} Dashboard Preview
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-20 bg-gray-50 rounded-2xl border border-gray-100" />
                      <div className="h-20 bg-gray-50 rounded-2xl border border-gray-100" />
                    </div>
                  </div>
                </div>
                
                {/* Decorative blob */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-cyan-400/5 rounded-full blur-3xl -z-10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

