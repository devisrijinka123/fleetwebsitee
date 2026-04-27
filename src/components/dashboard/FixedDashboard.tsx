"use client";

import { useEffect, useState, useRef } from "react";
import { DashboardDemo, View } from "./DashboardDemo";

// Default internal canvas dimensions for the dashboard
const DEFAULT_CANVAS_WIDTH = 1200;

/**
 * A resilient dashboard wrapper that maintains a fixed aspect ratio
 * and scale-to-fit behavior.
 */
export function FixedDashboard({
  initialView,
  hideSidebar,
  url,
  maxWidth = "1000px",
  aspectRatio = `${DEFAULT_CANVAS_WIDTH}/750`,
  externalPrompt,
  externalAgent,
  externalCameraFeature,
  demoMode = "none",
  interactive = true,
  canvasWidth = DEFAULT_CANVAS_WIDTH
}: {
  initialView?: View,
  hideSidebar?: boolean,
  url?: string,
  maxWidth?: string,
  aspectRatio?: string,
  externalPrompt?: string,
  externalAgent?: string,
  externalCameraFeature?: string,
  demoMode?: "fms" | "none" | "maintenance_auto" | "reports_auto" | "driver_auto" | "dispatch_auto",
  interactive?: boolean,
  canvasWidth?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Calculate internal height based on the provided aspect ratio
  const [ratioW, ratioH] = aspectRatio.split('/').map(Number);
  const internalHeight = (canvasWidth * ratioH) / ratioW;

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      setScale(containerRef.current.offsetWidth / canvasWidth);
    };

    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) observer.observe(containerRef.current);
    updateScale();
    return () => observer.disconnect();
  }, [canvasWidth]);

  return (
    <div
      ref={containerRef}
      className="w-full relative bg-black rounded-xl overflow-hidden border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]"
      style={{ maxWidth, aspectRatio }}
    >
      <div
        style={{
          width: `${canvasWidth}px`,
          height: `${internalHeight}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      >
        <div className="w-full h-full relative">
          {/* Header Bar */}
          <div className="absolute top-0 left-0 right-0 h-10 bg-black flex items-center px-6 gap-2 z-20 border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
            </div>
            {url && (
              <div className="ml-4 px-4 py-0.5 bg-white/5 rounded-md text-[10px] text-gray-500 font-mono tracking-wider">
                {url}
              </div>
            )}
          </div>

          {/* Dashboard Content */}
          <div className="absolute inset-0 pt-10">
            <DashboardDemo
              initialView={initialView}
              hideSidebar={hideSidebar}
              isScaled
              externalPrompt={externalPrompt}
              externalAgent={externalAgent}
              externalCameraFeature={externalCameraFeature}
              demoMode={demoMode}
              interactive={interactive}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
