"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Settings2, 
  ShieldCheck, 
  UserPlus, 
  Wallet, 
  Database,
  CheckCircle2,
  XCircle,
  Link2
} from "lucide-react";

const ROLES = [
  {
    id: 1,
    title: "Plan the fleet",
    subtitle: "“right vehicles, right time”",
    description: "Decide what vehicles are needed, set specs, and handle buy vs lease, replacements, and end-of-life disposal.",
    ui: <FleetPlanUI />
  },
  {
    id: 2,
    title: "Keep vehicles on the road",
    subtitle: "maintenance & uptime",
    description: "Schedule servicing/inspections, manage repairs, track defects, and minimise downtime—often coordinating workshops and external suppliers.",
    ui: <MaintenanceUI />
  },
  {
    id: 3,
    title: "Manage compliance & legal risk",
    description: "Ensure the fleet and drivers comply with relevant laws and policies (e.g., licensing requirements, safety checks, audit trails, driver hours).",
    ui: <ComplianceUI />
  },
  {
    id: 4,
    title: "Safety & driver support",
    description: "Set driving policies, oversee training, investigate incidents/accidents, and monitor behaviours that increase risk.",
    ui: <SafetyUI />
  },
  {
    id: 5,
    title: "Control costs",
    description: "Run budgets, fuel management, insurance, tyres/maintenance contracts, and negotiate with suppliers to reduce TCO.",
    ui: <CostUI />
  },
  {
    id: 6,
    title: "Use data/telematics & reporting",
    description: "Track KPIs like fuel efficiency, utilisation, downtime, and incident rates; report performance to ops/finance/leadership.",
    ui: <ReportingUI />
  }
];

export function RolesSection() {
  return (
    <section className="bg-[#F9FAFB] py-32 px-6">
      <div className="max-w-[1400px] mx-auto relative">
        {ROLES.map((role, idx) => (
          <div 
            key={role.id} 
            className="sticky top-24 pt-12 pb-32"
            style={{ 
              zIndex: idx + 1,
              marginTop: idx === 0 ? 0 : '-50vh' // Negative margin creates the overlap potential
            }}
          >
            <div 
              className="bg-white rounded-[3rem] border border-gray-100 shadow-[0_-32px_64px_-12px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col lg:flex-row min-h-[75vh] transition-transform duration-500 relative"
              style={{
                boxShadow: "0 -40px 100px -20px rgba(0,0,0,0.15)" // Upward shadow to emphasize stacking
              }}
            >
              {/* Text Side */}
              <div className="flex-1 p-12 lg:p-24 flex flex-col justify-center bg-white">
                <div className="inline-block w-fit px-3 py-1 border border-pink-500/30 text-pink-600 rounded-md text-xs font-bold mb-8">
                  {role.id} / {ROLES.length}
                </div>
                <h2 className="text-4xl md:text-6xl font-extrabold text-[#00031F] tracking-[-0.04em] mb-8 leading-tight">
                  {role.title}
                  {role.subtitle && <span className="block text-[#00031F]/55 text-4xl mt-2">{role.subtitle}</span>}
                </h2>
                <p className="text-xl text-[#00031F]/80 font-medium leading-relaxed max-w-lg">
                  {role.description}
                </p>
              </div>

              {/* UI Side */}
              <div className="flex-1 bg-gray-50/50 p-8 lg:p-16 flex items-center justify-center border-l border-gray-100 relative group overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-50/30 group-hover:scale-110 transition-transform duration-1000" />
                 <div className="relative w-full max-w-2xl aspect-[4/3]">
                    {role.ui}
                 </div>
              </div>
            </div>
          </div>
        ))}
        {/* Spacer to allow the last card to be scrolled away properly */}
        <div className="h-[50vh]" />
      </div>
    </section>
  );
}

// --- Specific UI Mockups ---

function FleetPlanUI() {
  return (
    <div className="h-full flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600"><Link2 size={24} /></div>
          <div>
            <div className="font-bold text-lg">Buy vs Lease Analysis</div>
            <div className="text-xs text-gray-400">Projected 5-year TCO Comparison</div>
          </div>
        </div>
        <div className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase">Active Analysis</div>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-center">
           <div className="w-full h-3 bg-gray-50 rounded-full mb-6 overflow-hidden text-center">
              <div className="w-2/3 h-full bg-pink-500 rounded-full" />
           </div>
           <div className="font-black text-3xl mb-1 text-[#00031F]">$2.4M</div>
           <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Buy Option</div>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-center">
           <div className="w-full h-3 bg-gray-50 rounded-full mb-6 overflow-hidden text-center">
              <div className="w-1/2 h-full bg-cyan-400 rounded-full" />
           </div>
           <div className="font-black text-3xl mb-1 text-[#00031F]">$1.8M</div>
           <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Lease Option</div>
        </div>
      </div>
    </div>
  );
}

function MaintenanceUI() {
  return (
    <div className="h-full flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="font-bold text-lg mb-6">Automated Service Queue</div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-pink-500 shadow-lg shadow-pink-200" />
                <span className="text-[13px] font-bold text-gray-700">Heavy Fleet SC-489{i}</span>
              </div>
              <span className="text-[11px] font-black text-gray-400 uppercase">Jan {12 + i}, 2026</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[#0E1133] p-8 rounded-3xl text-white flex-1 relative overflow-hidden">
         <Settings2 className="absolute -right-8 -bottom-8 w-48 h-48 text-white/5 rotate-12" />
         <div className="relative z-10 flex flex-col h-full justify-center">
           <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Predictive Fleet Uptime</div>
           <div className="text-6xl font-black tracking-tighter">98.4%</div>
           <div className="text-pink-500 text-xs font-bold mt-4 flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" /> AI Optimized Maintenance
           </div>
         </div>
      </div>
    </div>
  );
}

function ComplianceUI() {
  return (
    <div className="h-full flex flex-col justify-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {[
        { t: "Driver Licensing Requirements", s: "Compliant", c: "text-blue-500", icon: <CheckCircle2 size={20} /> },
        { t: "Annual Safety Inspections", s: "Compliant", c: "text-blue-500", icon: <CheckCircle2 size={20} /> },
        { t: "Tachograph / Hours of Service", s: "Manual check required", c: "text-pink-500", icon: <XCircle size={20} /> }
      ].map((item, i) => (
        <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between group-hover:translate-x-2 transition-all duration-500">
          <span className="font-bold text-sm text-gray-800">{item.t}</span>
          <div className={cn("flex items-center gap-3 text-[11px] font-black uppercase tracking-wider", item.c)}>
            {item.icon}
            {item.s}
          </div>
        </div>
      ))}
    </div>
  );
}

function SafetyUI() {
  return (
    <div className="h-full flex items-center justify-center animate-in fade-in scale-95 duration-1000">
      <div className="relative w-80 h-80 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle cx="160" cy="160" r="140" fill="none" stroke="#F3F4F6" strokeWidth="12" />
          <circle 
            cx="160" cy="160" r="140" 
            fill="none" 
            stroke="#EC4899" 
            strokeWidth="12" 
            strokeDasharray="880"
            strokeDashoffset="220"
            strokeLinecap="round"
          />
        </svg>
        <div className="text-center relative z-10">
          <div className="text-7xl font-black text-[#00031F] tracking-tighter">84</div>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">Safety Score</div>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 bg-white px-6 py-3 rounded-2xl shadow-xl border border-gray-50 flex items-center gap-3">
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-ping" />
          <span className="text-[11px] font-black uppercase tracking-tight text-gray-800">Anomaly Detected</span>
        </div>
      </div>
    </div>
  );
}

function CostUI() {
  return (
    <div className="h-full grid grid-cols-2 gap-6 animate-in fade-in duration-1000">
      <div className="col-span-2 bg-[#0E1133] p-10 rounded-[2rem] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8">
           <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
              <Wallet className="text-white/20" />
           </div>
        </div>
        <div className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] mb-6">Annual Fleet Operating Budget</div>
        <div className="text-6xl font-black tracking-tight">$4,280,000</div>
      </div>
      <div className="bg-white p-8 rounded-[2rem] border border-gray-100 flex flex-col justify-between shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center">
          <Wallet className="text-pink-500" />
        </div>
        <div>
          <div className="font-bold text-lg text-[#00031F]">Fuel Mgmt</div>
          <div className="text-green-500 text-sm font-black mt-1">-12.4% YoY Efficiency</div>
        </div>
      </div>
      <div className="bg-white p-8 rounded-[2rem] border border-gray-100 flex flex-col justify-between shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
          <ShieldCheck className="text-blue-500" />
        </div>
        <div>
          <div className="font-bold text-lg text-[#00031F]">Insurance</div>
          <div className="text-gray-400 text-sm font-black mt-1">Premiums Locked</div>
        </div>
      </div>
    </div>
  );
}

function ReportingUI() {
  return (
    <div className="h-full flex flex-col gap-6 animate-in fade-in duration-1000">
      <div className="flex-1 bg-white rounded-[2.5rem] border border-gray-100 p-8 relative overflow-hidden shadow-sm">
        <div className="flex items-end justify-between h-40 gap-3">
          {[30, 50, 40, 70, 90, 60, 80, 45, 75].map((h, i) => (
            <div key={i} className="flex-1 bg-gray-50 rounded-lg relative overflow-hidden group">
              <div 
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-pink-500 to-purple-500 transition-all duration-700 group-hover:brightness-110" 
                style={{ height: `${h}%` }}
              />
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-between items-center">
           <span className="font-black text-sm uppercase tracking-widest text-[#00031F]">Utilization Rate</span>
           <span className="text-pink-600 font-bold text-lg">+8.2%</span>
        </div>
      </div>
      <div className="h-24 bg-[#0E1133] rounded-[2rem] flex items-center px-8 justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-cyan-400/10 flex items-center justify-center">
            <Database className="text-cyan-400" size={20} />
          </div>
          <div>
            <span className="text-white text-sm font-bold block tracking-tight">Active Telemetry Stream</span>
            <span className="text-white/30 text-[10px] uppercase font-black tracking-[0.1em]">Real-time connection</span>
          </div>
        </div>
        <div className="flex gap-1">
           <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
           <div className="w-1.5 h-1.5 bg-green-400/40 rounded-full" />
           <div className="w-1.5 h-1.5 bg-green-400/20 rounded-full" />
        </div>
      </div>
    </div>
  );
}
