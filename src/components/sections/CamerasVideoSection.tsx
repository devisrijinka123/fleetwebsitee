"use client";

import { useState, useEffect } from "react";
import { Camera, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const cameras = [
  { id: "front", label: "Front Dash" },
  { id: "cabin", label: "Cabin" },
  // { id: "rear", label: "Rear Cargo" },
  // { id: "side", label: "Side View" },
];

const events = [
  { id: 1, message: "Hard Braking Event - Vehicle 2291", time: "2 min ago", severity: "warning" as const },
  { id: 2, message: "Drowsy Driver Detected - Vehicle 5463", time: "8 min ago", severity: "critical" as const },
  { id: 3, message: "Tailgating Alert - Vehicle 1102", time: "15 min ago", severity: "warning" as const },
  { id: 4, message: "Lane Departure - Vehicle 4891", time: "32 min ago", severity: "info" as const },
];

export function CamerasVideoSection() {
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const [alertPanel, setAlertPanel] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertPanel("cabin");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-[#0a0a1a] p-4 overflow-hidden">
      {/* 2x2 Camera Grid */}
      <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
        {cameras.map((cam) => (
          <div
            key={cam.id}
            onClick={() => setSelectedCamera(cam.id === selectedCamera ? null : cam.id)}
            className={cn(
              "relative bg-[#1a1a2e] rounded-lg overflow-hidden cursor-pointer transition-all duration-300",
              selectedCamera === cam.id
                ? "ring-2 ring-[#F0197A] shadow-xl"
                : "ring-1 ring-white/10 hover:ring-white/20"
            )}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Camera className="w-10 h-10 text-white/10" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />
            </div>

            {/* LIVE badge */}
            <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400 text-[9px] font-bold uppercase tracking-wider">Live</span>
            </div>

            {/* Label */}
            <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded">
              <span className="text-white text-[10px] font-bold">{cam.label}</span>
            </div>

            {/* AI Alert */}
            {alertPanel === cam.id && (
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md flex items-center gap-1.5 animate-pulse shadow-lg">
                <AlertTriangle className="w-3 h-3" />
                <span className="text-[9px] font-bold">Drowsy Driver Detected</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Event Timeline */}
      <div className="mt-3 bg-white/5 rounded-lg p-3 shrink-0">
        <div className="flex items-center gap-1.5 mb-2">
          <AlertTriangle className="w-3 h-3 text-[#F0197A]" />
          <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Recent AI Events</span>
        </div>
        <div className="space-y-1.5">
          {events.map((event) => (
            <div key={event.id} className="flex items-center justify-between px-2 py-1.5 bg-white/5 rounded">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  event.severity === "critical" && "bg-red-500",
                  event.severity === "warning" && "bg-yellow-500",
                  event.severity === "info" && "bg-blue-500"
                )} />
                <span className="text-white/70 text-[10px] font-medium">{event.message}</span>
              </div>
              <span className="text-white/30 text-[9px] font-medium shrink-0 ml-2">{event.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
