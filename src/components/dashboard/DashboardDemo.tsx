"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  Truck,
  Settings2,
  BarChart3,
  BarChart2,
  Trophy,
  GitBranch,
  UserCircle,
  Plus,
  Trash2,
  Search,
  Bell,
  Settings,
  Send,
  MessageSquare,
  Calendar,
  ChevronDown,
  Minus,
  Lock,
  CheckCircle2,
  Package,
  LayoutDashboard,
  LayoutGrid,
  Camera,
  AlertTriangle,
  Video,
  Bot,
  RefreshCcw,
  MapPin,
  ClipboardList,
  UserCog
} from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { FleetSageIcon, AIFleetManagerIcon, OverviewIcon, MyFleetIcon, MaintenanceIcon, DispatchIcon, ReportsIcon, LeaderboardIcon, SetupAdminIcon } from "@/components/icons/SidebarIcons"; import { FLEET_INTELLIGENCE_QUESTIONS } from "@/constants/products";

export type View = "copilot" | "overview" | "fleet" | "reports" | "maintenance" | "driver" | "dispatch" | "cameras" | "monitor_overview";

interface DashboardDemoProps {
  initialView?: View;
  hideSidebar?: boolean;
  isScaled?: boolean;
  externalPrompt?: string;
  externalAgent?: string;
  externalCameraFeature?: string;
  demoMode?: "fms" | "none" | "maintenance_auto" | "reports_auto" | "driver_auto" | "dispatch_auto";
  interactive?: boolean;
}

export function DashboardDemo({
  initialView = "copilot",
  hideSidebar = false,
  isScaled = false,
  externalPrompt,
  externalAgent,
  externalCameraFeature,
  demoMode = "none",
  interactive = true
}: DashboardDemoProps) {
  const [activeView, setActiveView] = useState<View>(initialView);
  const [hoveredMarker, setHoveredMarker] = useState<number | null>(null);
  const [cameraShowAllAlerts, setCameraShowAllAlerts] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveView(initialView);
  }, [initialView]);

  // FMS Demo Animation Logic
  useEffect(() => {
    if (demoMode !== "fms") return;

    let isCancelled = false;

    const runSequence = async () => {
      if (isCancelled) return;

      // 1. Start with My Fleet
      setActiveView("fleet");

      await new Promise(r => setTimeout(r, 2000));
      if (isCancelled) return;

      // 2. Hover over markers
      setHoveredMarker(191);
      await new Promise(r => setTimeout(r, 1500));
      if (isCancelled) return;
      setHoveredMarker(24);
      await new Promise(r => setTimeout(r, 1500));
      if (isCancelled) return;
      setHoveredMarker(null);

      // 3. Go to Maintenance
      setActiveView("maintenance");
      await new Promise(r => setTimeout(r, 7000)); // Give time for typing and creating tasks
      if (isCancelled) return;

      // 4. Go to Driver Behavior
      setActiveView("driver");
      await new Promise(r => setTimeout(r, 4000));
      if (isCancelled) return;

      // 5. Go to Dispatch
      setActiveView("dispatch");
      await new Promise(r => setTimeout(r, 3000));
      if (isCancelled) return;

      // Restart sequence
      runSequence();
    };

    runSequence();

    return () => {
      isCancelled = true;
    };
  }, [demoMode]);

  return (
    <div
      ref={containerRef}
      onClickCapture={(e) => !interactive && (e.stopPropagation(), e.preventDefault())}
      className={cn(
        "flex h-full w-full bg-[#FFFFFF] text-[#00031F] font-sans overflow-hidden relative",
        !isScaled && "border border-black/10",
        !interactive && "cursor-default [&_*]:cursor-default"
      )}
    >
      {!hideSidebar && (
        <aside className="w-64 bg-black flex flex-col shrink-0 relative z-10">
          <div className="p-6 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <div className="w-4 h-4 bg-[#F0197A] rounded-full" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">RAVITY</span>
          </div>

          <nav className="flex-1 px-6 py-6 space-y-2 overflow-y-auto no-scrollbar">
            {/* ARTIFICIAL INTELLIGENCE */}
            <div className="px-4 pb-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Artificial Intelligence</span>
            </div>
            <SidebarItem icon={<FleetSageIcon width="22" height="22" />} label="Fleet Sage" active={activeView === "copilot"} onClick={() => setActiveView("copilot")} />
            <SidebarItem
              icon={<AIFleetManagerIcon width="22" height="22" />}
              label="AI Fleet Manager"
              active={activeView === "overview"}
              onClick={() => setActiveView("overview")}
            />

            <div className="pt-6 pb-2">
              {/* MONITOR */}
              <div className="px-4 pb-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Monitor</span>
              </div>
              <div className="space-y-2 mt-2">
                <SidebarItem icon={<OverviewIcon width="22" height="22" />} label="Overview" active={activeView === "monitor_overview"} onClick={() => setActiveView("monitor_overview")} />
                <SidebarItem icon={<MyFleetIcon width="22" height="22" />} label="My Fleet" active={activeView === "fleet"} onClick={() => setActiveView("fleet")} />
              </div>
            </div>

            <div className="pt-6 pb-2">
              {/* OPERATIONS */}
              <div className="px-4 pb-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Operations</span>
              </div>
              <div className="space-y-2 mt-2">
                <SidebarItem icon={<MaintenanceIcon width="22" height="22" />} label="Vehicle Maintenance" active={activeView === "maintenance"} onClick={() => setActiveView("maintenance")} />
                <SidebarItem icon={<Bell size={22} />} label="All Alerts" active={false} onClick={() => { }} />
                <SidebarItem icon={<DispatchIcon width="22" height="22" />} label="Dispatch Management" active={activeView === "dispatch"} onClick={() => setActiveView("dispatch")} />
                <SidebarItem icon={<ReportsIcon width="22" height="22" />} label="Reports" active={activeView === "reports"} onClick={() => setActiveView("reports")} />
                <SidebarItem icon={<LeaderboardIcon width="22" height="22" />} label="Driver Leaderboard" active={activeView === "driver"} onClick={() => setActiveView("driver")} />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 mt-4">
              {/* ADMIN */}
              <div className="px-4 pb-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Admin</span>
              </div>
              {/* <SidebarItem icon={<GitBranch size={22} />} label="Workflow" hasSubmenu /> */}
              <SidebarItem icon={<SetupAdminIcon width="22" height="22" />} label="Setup / Admin" hasSubmenu />
            </div>
          </nav>
        </aside>
      )}

      <main className="flex-1 flex flex-col min-w-0 relative z-0">
        <header className="h-16 border-b border-black/10 flex items-center justify-between px-8 shrink-0 bg-[#FFFFFF] z-10">
          <h1 className="font-extrabold text-xl text-[#00031F] capitalize truncate mr-4">
            {activeView === "copilot" ? "Fleet Sage" :
              activeView === "overview" ? "AI Fleet Manager" :
                activeView === "monitor_overview" ? "Overview" :
                  activeView === "fleet" ? "My Fleet" :
                    activeView === "driver" ? "Driver Leaderboard" :
                      activeView === "maintenance" ? "Vehicle Maintenance" :
                        activeView === "dispatch" ? "Dispatch Management" :
                          activeView === "reports" ? "Reports" :
                            activeView === "cameras" ? (cameraShowAllAlerts || externalCameraFeature === "ai-alerts" ? "All Alerts" : externalCameraFeature === "event-timeline" ? "Event Timeline" : "Cameras & Video") :
                              activeView}
          </h1>
          <div className="flex items-center gap-4 text-[#00031F]/65 shrink-0">
            <button className="p-2 hover:bg-black/5 rounded-lg transition-colors"><Search size={20} /></button>
            <button className="p-2 hover:bg-black/5 rounded-lg transition-colors relative">
              <Bell size={20} />
              <div className="absolute top-2 right-2 w-2 h-2 bg-[#F0197A] rounded-full border-2 border-[#FFFFFF]" />
            </button>
            <button className="p-2 hover:bg-black/5 rounded-lg transition-colors"><Settings size={20} /></button>
            <div className="w-8 h-8 rounded-full bg-black/5" />
          </div>
        </header>

        <div className="flex-1 relative overflow-hidden">
          {activeView === "copilot" && <CopilotView externalPrompt={externalPrompt} hideHistory={hideSidebar} />}
          {activeView === "fleet" && <FleetMapView hoveredMarker={hoveredMarker} interactive={interactive} />}
          {activeView === "reports" && <ReportsView isDemo={demoMode === "reports_auto"} />}
          {activeView === "monitor_overview" && <OverviewDashboardView />}
          {activeView === "maintenance" && <MaintenanceView isDemo={demoMode === "fms" || demoMode === "maintenance_auto"} />}
          {activeView === "driver" && <DriverView isDemo={demoMode === "fms" || demoMode === "driver_auto"} />}
          {activeView === "dispatch" && <DispatchView />}
          {activeView === "cameras" && <CamerasView externalFeature={externalCameraFeature} onShowAllAlerts={() => setCameraShowAllAlerts(true)} showAllAlerts={cameraShowAllAlerts || externalCameraFeature === "ai-alerts"} />}
          {activeView === "overview" && <VirtualManagerView externalAgent={externalAgent} />}
        </div>

      </main>
    </div>
  );
}

// --- Views ---

function ComingSoonView({ title }: { title: string }) {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-[#FFFFFF] p-12 text-center animate-in fade-in duration-500">
      <div className="w-32 h-32 rounded-3xl bg-[#F0197A]/10 flex items-center justify-center mb-10">
        <Lock size={48} className="text-[#F0197A]" />
      </div>
      <h2 className="text-4xl font-extrabold text-[#00031F] mb-4">{title}</h2>
      <p className="text-lg text-[#00031F]/65 font-medium max-w-lg leading-relaxed">
        This feature is currently in development. Our agentic systems are being fine-tuned to provide the best possible experience.
      </p>
      <div className="mt-12 px-8 py-3 rounded-full bg-[#F0197A] text-white text-xs font-bold uppercase tracking-[0.2em] shadow-lg shadow-[#F0197A]/20">
        Coming Soon
      </div>
    </div>
  );
}

// Build MOCKED_RESPONSES from FLEET_INTELLIGENCE_QUESTIONS
const MOCKED_RESPONSES: Record<string, string> = Object.fromEntries(
  FLEET_INTELLIGENCE_QUESTIONS.map(q => [q.question, q.answer])
);

interface Message {
  id: string;
  type: 'prompt' | 'response';
  text: string;
  isStreaming?: boolean;
}

function BoldText({ text }: { text: string }) {
  const parts = text.split(/(\*\*.*?\*\*|\[\[.*?\]\])/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-extrabold text-[#F0197A]">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('[[') && part.endsWith(']]')) {
          const linkText = part.slice(2, -2);
          return (
            <a
              key={i}
              href="mailto:sales@ravity.io"
              className="text-[#F0197A] font-bold underline hover:text-[#F0197A]/80 transition-colors"
            >
              {linkText}
            </a>
          );
        }
        return part;
      })}
    </>
  );
}

function CopilotView({ externalPrompt, hideHistory = false }: { externalPrompt?: string, hideHistory?: boolean }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [typedPrompt, setTypedPrompt] = useState("");
  const [userInputValue, setUserInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const prevPromptRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typedPrompt, userInputValue]);

  const handleSendPrompt = (prompt: string) => {
    if (!prompt.trim()) return;
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      const promptId = Math.random().toString(36).substring(7);
      const responseId = Math.random().toString(36).substring(7);

      setMessages(prev => [...prev, { id: promptId, type: 'prompt', text: prompt }]);
      setTypedPrompt("");
      setUserInputValue("");

      setTimeout(() => {
        const responseText = MOCKED_RESPONSES[prompt] || "[[Book a demo]] to see Fleet Intelligence in action, or try one of the questions on the left.";
        const words = responseText.split(" ");

        setMessages(prev => [...prev, { id: responseId, type: 'response', text: "", isStreaming: true }]);

        let resIndex = 0;
        const streamInterval = setInterval(() => {
          if (resIndex < words.length) {
            const currentText = words.slice(0, resIndex + 1).join(" ");
            setMessages(prev => prev.map(m =>
              m.id === responseId ? { ...m, text: currentText } : m
            ));
            resIndex++;
          } else {
            clearInterval(streamInterval);
            setMessages(prev => prev.map(m =>
              m.id === responseId ? { ...m, isStreaming: false } : m
            ));
          }
        }, 100);
      }, 500);
    }, 200);
  };

  const handleManualSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (userInputValue.trim() && !isSending && !isTyping) {
      handleSendPrompt(userInputValue);
    }
  };

  useEffect(() => {
    if (!externalPrompt) return;

    if (prevPromptRef.current !== externalPrompt) {
      setMessages([]);
      prevPromptRef.current = externalPrompt;
    } else if (messages.length > 0) {
      return;
    }

    setTypedPrompt("");
    setIsTyping(true);

    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex < externalPrompt.length) {
        setTypedPrompt(externalPrompt.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        setTimeout(() => {
          handleSendPrompt(externalPrompt);
        }, 500);
      }
    }, 12);

    return () => clearInterval(typingInterval);
  }, [externalPrompt, messages.length]);

  return (
    <div className="h-full flex min-h-0 animate-in fade-in duration-300">
      {/* Questions sidebar (full sidebar mode) */}
      {!hideHistory && (
        <div className="w-48 lg:w-72 border-r border-black/10 flex flex-col shrink-0 bg-black/[0.02] hidden sm:flex">
          <div className="p-4 space-y-4">
            <button
              onClick={() => setMessages([])}
              className="w-full py-2 px-4 flex items-center gap-2 text-[#00031F]/65 hover:bg-black/5 rounded-lg transition-colors text-sm font-medium"
            >
              <Plus size={16} /> New chat
            </button>
            <div className="text-[10px] font-bold text-[#00031F]/45 uppercase tracking-widest px-2">Questions</div>
          </div>
          <div className="flex-1 overflow-y-auto px-3 space-y-2 no-scrollbar">
            {FLEET_INTELLIGENCE_QUESTIONS.map((q) => (
              <button
                key={q.id}
                onClick={() => handleSendPrompt(q.question)}
                className="w-full text-left p-3 rounded-xl bg-[#FFFFFF] border border-black/10 hover:border-[#F0197A]/30 hover:bg-[#F0197A]/5 transition-all text-[13px] text-[#00031F]/80 font-bold leading-snug"
              >
                {q.question}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="flex-1 flex flex-col relative bg-[#FFFFFF]">
        {/* Compact question chips in embedded mode */}
        {hideHistory && messages.length === 0 && !typedPrompt && !userInputValue && (
          <div className="px-4 pt-4 pb-2 overflow-x-auto no-scrollbar">
            <div className="flex gap-2 min-w-max">
              {FLEET_INTELLIGENCE_QUESTIONS.slice(0, 4).map((q) => (
                <button
                  key={q.id}
                  onClick={() => handleSendPrompt(q.question)}
                  className="px-4 py-2 rounded-full bg-white border border-black/10 text-xs text-[#00031F]/80 font-bold hover:border-black/20 hover:bg-black/5 transition-all whitespace-nowrap"
                >
                  {q.question}
                </button>
              ))}
            </div>
          </div>
        )}
        <div
          ref={scrollRef}
          className="flex-1 flex flex-col items-center justify-start pt-12 px-6 lg:px-12 text-center overflow-y-auto no-scrollbar pb-32 scroll-smooth"
        >
          {messages.length === 0 && !typedPrompt && !userInputValue && (
            <>
              <h2 className="text-2xl lg:text-4xl font-bold text-[#00031F] mb-8 lg:mb-12">Ask anything about your fleet</h2>
              {!hideHistory && (
                <div className="w-full max-w-2xl space-y-3">
                  <div className="flex flex-wrap justify-center gap-3">
                    {FLEET_INTELLIGENCE_QUESTIONS.slice(0, 4).map((q) => (
                      <SuggestionChip
                        key={q.id}
                        label={q.question}
                        onClick={() => handleSendPrompt(q.question)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          <div className="w-full max-w-3xl space-y-8 text-left pb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex animate-in fade-in slide-in-from-bottom-2 duration-300",
                  message.type === 'prompt' ? "justify-end" : "justify-start"
                )}
              >
                <div className={cn(
                  "px-6 py-4 rounded-2xl shadow-sm max-w-[85%] text-base lg:text-lg font-medium whitespace-pre-wrap",
                  message.type === 'prompt'
                    ? "bg-[#F0197A] text-white rounded-tr-none"
                    : "bg-white border border-black/10 text-[#00031F]/80 rounded-tl-none"
                )}>
                  <BoldText text={message.text} />
                  {message.isStreaming && <span className="inline-block w-1.5 h-5 ml-1 bg-[#F0197A] animate-pulse" />}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 lg:p-10 pt-0 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#FFFFFF] via-[#FFFFFF] to-transparent">
          <form
            onSubmit={handleManualSend}
            className="max-w-3xl mx-auto relative"
          >
            <div className="w-full h-14 lg:h-16 bg-white border border-black/10 rounded-2xl flex items-center text-[#00031F] shadow-sm overflow-hidden px-6">
              <input
                type="text"
                value={typedPrompt || userInputValue}
                onChange={(e) => setUserInputValue(e.target.value)}
                placeholder={isTyping ? "" : "Ask anything about your fleet..."}
                disabled={isTyping || isSending}
                className="flex-1 bg-transparent border-none outline-none text-base lg:text-lg font-medium placeholder:text-[#00031F]/55"
              />
              {(isTyping || isSending) && <div className="w-0.5 h-6 bg-[#F0197A] ml-1 animate-pulse" />}
            </div>
            <button
              type="submit"
              disabled={(!userInputValue.trim() && !typedPrompt) || isSending || isTyping}
              className={cn(
                "absolute right-3 top-3 lg:top-4 w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center shadow-lg transition-all duration-100",
                isSending ? "bg-[#F0197A] scale-90" : "bg-[#F0197A] hover:bg-[#C0106A] disabled:opacity-50 disabled:grayscale"
              )}
            >
              <Send size={20} className="text-white" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}


function FleetMapView({ hoveredMarker, interactive }: { hoveredMarker?: number | null, interactive?: boolean }) {
  const [selectedUnits, setSelectedUnits] = useState<number | null>(null);

  return (
    <div className="h-full relative bg-[#13111E] animate-in fade-in duration-300 overflow-hidden text-[#00031F]">
      <div className="absolute inset-0 bg-[#1A1728]">
        {/* Actual World Map Background */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-no-repeat bg-center bg-contain" />
        <div className="absolute top-1/4 left-1/4 w-32 h-20 bg-[#8DA68E]/20 rounded-lg blur-xl" />
        <div className="absolute top-1/2 left-1/2 w-48 h-32 bg-[#8DA68E]/30 rounded-lg blur-2xl" />
      </div>

      <div className="absolute top-4 left-4">
        <div className="bg-[#FFFFFF] p-2 rounded-lg shadow-none border border-black/10 flex items-center gap-2 hover:bg-black/5 transition-colors cursor-pointer group">
          <div className="w-6 h-6 bg-[#F0197A]/10 rounded-lg flex items-center justify-center group-hover:bg-[#F0197A]/20 transition-colors"><Truck size={14} className="text-[#F0197A]" /></div>
          <span className="text-xs font-bold opacity-70 group-hover:opacity-100 transition-opacity">My Fleet</span>
        </div>
      </div>

      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button className="p-2 bg-[#FFFFFF] rounded-lg shadow-none border border-black/10 hover:bg-black/5 text-[#00031F]/65"><Plus size={16} /></button>
        <button className="p-2 bg-[#FFFFFF] rounded-lg shadow-none border border-black/10 hover:bg-black/5 text-[#00031F]/65"><Minus size={16} /></button>
      </div>

      <MapMarker
        top="30%"
        left="52%"
        count={24}
        type="secondary"
        isHovered={hoveredMarker === 24 || selectedUnits === 24}
        onClick={() => interactive && setSelectedUnits(selectedUnits === 24 ? null : 24)}
      />
      <MapMarker
        top="45%"
        left="73%"
        count={191}
        type="main"
        isHovered={hoveredMarker === 191 || selectedUnits === 191}
        onClick={() => interactive && setSelectedUnits(selectedUnits === 191 ? null : 191)}
      />

      {selectedUnits && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border border-black/10 rounded-2xl shadow-2xl p-6 animate-in slide-in-from-bottom-4 duration-300 z-30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-extrabold text-lg">Cluster Details: {selectedUnits === 191 ? "South Asia" : "Western Europe"}</h3>
            <button onClick={() => setSelectedUnits(null)} className="text-black/20 hover:text-black transition-colors">
              <Plus size={24} className="rotate-45" />
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#00031F]/65 font-bold uppercase tracking-widest text-[10px]">Operational Status</span>
              <span className="text-[#8DA68E] font-black tracking-tight">Healthy</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#00031F]/65 font-bold uppercase tracking-widest text-[10px]">Total Assets</span>
              <span className="text-white font-black tracking-tight">{selectedUnits} Units</span>
            </div>
            <button className="w-full py-3 bg-[#F0197A] text-white rounded-xl font-bold text-sm hover:bg-[#C0106A] transition-all shadow-[0_2px_10px_rgba(240,25,122,0.4)]">
              View Active Driver Logs
            </button>
          </div>
        </div>
      )}

      <div className="absolute bottom-4 right-4 flex items-end gap-2">
        <div className="bg-[#FFFFFF] p-1 rounded-lg shadow-none border border-black/10 overflow-hidden">
          <div className="w-20 h-16 bg-[#F0197A]/10 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-[#F0197A]/10" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/30 p-1 text-[8px] font-bold text-center text-white/60 uppercase tracking-widest">OSM Map</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportsView({ isDemo }: { isDemo?: boolean }) {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  useEffect(() => {
    if (!isDemo) return;

    let isCancelled = false;
    const runDemo = async () => {
      if (isCancelled) return;
      await new Promise(r => setTimeout(r, 1500));
      if (isCancelled) return;
      setSelectedReport("Daily vehicle usage");
      await new Promise(r => setTimeout(r, 3000));
      if (isCancelled) return;
      setSelectedReport(null);
      await new Promise(r => setTimeout(r, 1500));
      if (isCancelled) return;
      setSelectedReport("Eco Drive");
      await new Promise(r => setTimeout(r, 3000));
      if (isCancelled) return;
      setSelectedReport(null);

      if (!isCancelled) runDemo();
    };

    runDemo();
    return () => { isCancelled = true; };
  }, [isDemo]);

  const reportSections = [
    {
      title: "Activity",
      reports: [
        { title: "Daily driver usage", desc: "Show driver usage of the vehicle" },
        { title: "Daily vehicle usage", desc: "Show vehicle usage" },
        { title: "Vehicle Record", desc: "Detailed odometer and fuel of the vehicle" },
        { title: "Vehicle Stopped", desc: "Detailed stop history" },
        { title: "Trip Reports", desc: "Detailed trip history" },
        { title: "Trip Shift Reports", desc: "Breakdown on trips and stop by shifts" },
        { title: "Temperature level statistics", desc: "Monitor the temperature level changes" },
        { title: "Driver metrics", desc: "Metrics performed by each driver in the selected period" },
        { title: "Video Telematics Trip Summary", desc: "Trip history with video telematics events and camera footage" },
      ]
    },
    {
      title: "Device health and status",
      reports: [
        { title: "Device On/ Off", desc: "Switching device using hardware switch" },
        { title: "Connection Lost", desc: "Long disruption of server connection" },
        { title: "Tracker Detach", desc: "Demounting devices from tracking objects" },
        { title: "Video Alert Summary", desc: "Summary of video alerts with event type and severity" },
      ]
    },
    {
      title: "Driving quality and Driver Behavior Profiling",
      reports: [
        { title: "Eco Drive", desc: "Monitor driver behavior on the road" },
        { title: "Speed Violations", desc: "Speeding instances and violation" },
        { title: "Driver Change Rotation", desc: "Operations of driver change" },
        { title: "Driver Behaviour", desc: "Driver scores and penalties" },
      ]
    }
  ];

  if (selectedReport) {
    return (
      <div className="h-full flex flex-col bg-[#FFFFFF] animate-in fade-in duration-300">
        <div className="p-6 border-b border-black/10 flex items-center justify-between bg-white/50">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setSelectedReport(null)}
              className="p-3 hover:bg-black/5 rounded-full transition-colors text-[#00031F]/65"
            >
              <Plus size={24} className="rotate-45" />
            </button>
            <h2 className="text-xl font-bold text-[#00031F]">{selectedReport}</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-white border border-black/10 rounded-lg text-xs font-bold text-[#00031F]/65 uppercase tracking-widest">All Fleets</div>
            <button className="px-5 py-2 bg-white border border-black/10 rounded-lg text-xs font-bold text-[#00031F]/80 flex items-center gap-2 hover:bg-black/5 transition-colors uppercase tracking-widest">
              Export CSV
            </button>
            <button className="px-5 py-2 bg-[#F0197A] text-white rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-[#C0106A] transition-colors uppercase tracking-widest">
              Export XLSX
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-8">
          <div className="bg-white border border-black/10 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/[0.02] border-b border-black/10">
                  {["VIN", "Time", "Distance", "Overspeeding", "Harsh acceleration", "Harsh deceleration", "Drive score"].map((header) => (
                    <th key={header} className="px-6 py-4 text-xs font-bold text-[#00031F]/65 uppercase tracking-wider">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {[
                  { vin: "12027-T-1", time: "1hr 3mins", dist: "24 kms", over: "-", acc: "-", dec: "-", score: "10" },
                  { vin: "17926-B-26", time: "2hrs 51mins", dist: "24 kms", over: "-", acc: "-", dec: "-", score: "10" },
                  { vin: "18638-A-72", time: "4hrs 11mins", dist: "103 kms", over: "-", acc: "-", dec: "-", score: "10" },
                  { vin: "21244-W-1", time: "4hrs 54mins", dist: "242 kms", over: "-", acc: "-", dec: "-", score: "10" },
                  { vin: "24660-B-7", time: "3hrs 18mins", dist: "51 kms", over: "-", acc: "-", dec: "-", score: "10" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-black/[0.01] transition-colors">
                    <td className="px-6 py-5 text-sm font-bold text-[#00031F]">{row.vin}</td>
                    <td className="px-6 py-5 text-sm font-medium text-[#00031F]/80">{row.time}</td>
                    <td className="px-6 py-5 text-sm font-medium text-[#00031F]/80">{row.dist}</td>
                    <td className="px-6 py-5 text-sm font-medium text-[#00031F]/80">{row.over}</td>
                    <td className="px-6 py-5 text-sm font-medium text-[#00031F]/80">{row.acc}</td>
                    <td className="px-6 py-5 text-sm font-medium text-[#00031F]/80">{row.dec}</td>
                    <td className="px-6 py-5 text-sm font-bold text-[#8DA68E]">{row.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex items-center justify-between px-2">
            <span className="text-xs font-medium text-[#00031F]/65">Showing 1 to 5 of 104 items</span>
            <div className="flex items-center gap-2">
              {[1, 2, "...", 21].map((p, i) => (
                <button key={i} className={cn(
                  "w-9 h-9 flex items-center justify-center rounded-xl text-xs font-bold transition-all",
                  p === 1 ? "bg-[#F0197A] text-white" : "text-[#00031F]/65 hover:bg-black/5"
                )}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#FFFFFF] animate-in fade-in duration-300 overflow-y-auto no-scrollbar">
      <div className="p-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <h2 className="text-[#F0197A] font-extrabold text-2xl tracking-tight">Overall Insight Reports</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 text-[#00031F]/45" size={20} />
              <input
                type="text"
                placeholder="Search reports..."
                className="pl-12 pr-6 py-3 w-72 bg-white border border-black/10 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#F0197A]/20 text-[#00031F]"
              />
            </div>
            <button className="px-6 py-3 bg-[#F0197A] text-white rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-[#C0106A] transition-colors uppercase tracking-[0.1em] shadow-[0_2px_10px_rgba(240,25,122,0.25)]">
              <Calendar size={18} /> Schedule
            </button>
          </div>
        </div>

        <div className="space-y-16">
          {reportSections.map((section) => (
            <div key={section.title} className="space-y-8">
              <h3 className="text-sm font-black text-[#00031F] uppercase tracking-[0.2em] border-l-4 border-[#F0197A] pl-4">
                {section.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {section.reports.map((report) => (
                  <button
                    key={report.title}
                    onClick={() => setSelectedReport(report.title)}
                    className={cn(
                      "p-6 bg-white border border-black/10 rounded-2xl text-left hover:shadow-xl hover:border-[#F0197A]/30 transition-all group flex flex-col gap-3 min-h-[140px]",
                      selectedReport === report.title && "border-[#F0197A] ring-2 ring-[#F0197A]/10 bg-[#FFFFFF]"
                    )}
                  >
                    <h4 className="font-extrabold text-base text-[#00031F] group-hover:text-[#F0197A] transition-colors leading-tight">
                      {report.title}
                    </h4>
                    <p className="text-xs text-[#00031F]/65 leading-relaxed font-medium">
                      {report.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface MaintenanceTask {
  id: string;
  text: string;
  status: 'pending' | 'completed';
  date: string;
}

function MaintenanceView({ isDemo }: { isDemo?: boolean }) {
  const [tasks, setTasks] = useState<MaintenanceTask[]>([
    { id: '1', text: 'Brake pad replacement - VOLVO 2291-B-2', status: 'pending', date: '2025-12-30' },
    { id: '2', text: 'Tire rotation - TATA 1102-X-4', status: 'completed', date: '2025-12-28' }
  ]);
  const [taskInput, setTaskInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [showNewTaskWindow, setShowNewTaskWindow] = useState(false);

  useEffect(() => {
    if (!isDemo) return;

    let isCancelled = false;
    const runDemo = async () => {
      if (isCancelled) return;
      await new Promise(r => setTimeout(r, 1000));
      if (isCancelled) return;
      setShowNewTaskWindow(true);
      await new Promise(r => setTimeout(r, 500));
      if (isCancelled) return;
      setIsTyping(true);
      const task1 = "Schedule engine inspection for SCANIA 5463-T-1 next Monday.";
      for (let i = 0; i <= task1.length; i++) {
        if (isCancelled) return;
        setTaskInput(task1.substring(0, i));
        await new Promise(r => setTimeout(r, 40));
      }
      setIsTyping(false);
      await new Promise(r => setTimeout(r, 800));
      if (isCancelled) return;
      setIsCreating(true);
      await new Promise(r => setTimeout(r, 400));
      if (isCancelled) return;
      setTasks(prev => [{
        id: Math.random().toString(),
        text: task1,
        status: 'pending',
        date: new Date().toISOString().split('T')[0]
      }, ...prev]);
      setTaskInput("");
      setIsCreating(false);
      setShowNewTaskWindow(false);

      if (isCancelled) return;
      await new Promise(r => setTimeout(r, 1000));
      if (isCancelled) return;
      setShowNewTaskWindow(true);
      await new Promise(r => setTimeout(r, 500));
      if (isCancelled) return;
      setIsTyping(true);
      const task2 = "Order replacement parts for AL7 front suspension.";
      for (let i = 0; i <= task2.length; i++) {
        if (isCancelled) return;
        setTaskInput(task2.substring(0, i));
        await new Promise(r => setTimeout(r, 40));
      }
      setIsTyping(false);
      await new Promise(r => setTimeout(r, 800));
      if (isCancelled) return;
      setIsCreating(true);
      await new Promise(r => setTimeout(r, 400));
      if (isCancelled) return;
      setTasks(prev => [{
        id: Math.random().toString(),
        text: task2,
        status: 'pending',
        date: new Date().toISOString().split('T')[0]
      }, ...prev]);
      setTaskInput("");
      setIsCreating(false);
      setShowNewTaskWindow(false);

      if (!isCancelled) runDemo();
    };

    runDemo();
    return () => { isCancelled = true; };
  }, [isDemo]);

  const handleAddTask = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!taskInput.trim()) return;
    setIsCreating(true);
    setTimeout(() => {
      setTasks(prev => [{
        id: Math.random().toString(),
        text: taskInput,
        status: 'pending',
        date: new Date().toISOString().split('T')[0]
      }, ...prev]);
      setTaskInput("");
      setIsCreating(false);
      setShowNewTaskWindow(false);
    }, 400);
  };

  return (
    <div className="h-full flex flex-col p-8 bg-[#FFFFFF] animate-in fade-in duration-300 relative">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl font-extrabold text-[#00031F] tracking-tight">Vehicle Maintenance</h2>
        <button
          onClick={() => setShowNewTaskWindow(true)}
          className={cn(
            "px-6 py-3 bg-[#F0197A] text-white rounded-xl text-base font-bold flex items-center gap-2 shadow-lg transition-all duration-200",
            showNewTaskWindow ? "opacity-50 scale-95" : "hover:scale-105"
          )}
        >
          <Plus size={20} /> New Task
        </button>
      </div>

      <div className="flex-1 space-y-4">
        {showNewTaskWindow && (
          <div className="absolute inset-0 bg-[#FFFFFF]/80 backdrop-blur-sm z-20 flex items-center justify-center p-8 animate-in fade-in zoom-in-95 duration-200">
            <form
              onSubmit={handleAddTask}
              className="w-full max-w-lg bg-white border border-black/10 rounded-2xl shadow-2xl p-10 space-y-8"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-extrabold text-[#00031F]">Create Task</h3>
                <button type="button" onClick={() => setShowNewTaskWindow(false)} className="text-black/20 hover:text-black transition-colors">
                  <Plus size={32} className="rotate-45" />
                </button>
              </div>
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em]">Task Description</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={taskInput}
                      onChange={(e) => setTaskInput(e.target.value)}
                      placeholder="e.g. Schedule oil change for Truck 12"
                      className="w-full h-16 bg-black/5 rounded-xl px-6 text-lg font-medium text-[#00031F] focus:outline-none focus:ring-2 focus:ring-[#F0197A]/20 border-none"
                    />
                    {isTyping && <div className="absolute right-6 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-[#F0197A] animate-pulse" />}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em]">Priority</label>
                    <div className="h-14 bg-black/5 rounded-xl flex items-center px-6 text-sm font-bold text-black/30">Normal</div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em]">Assignee</label>
                    <div className="h-14 bg-black/5 rounded-xl flex items-center px-6 text-sm font-bold text-black/30">Auto-assign</div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={!taskInput.trim() || isCreating}
                className={cn(
                  "w-full h-16 bg-[#F0197A] text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-[0_4px_14px_rgba(240,25,122,0.3)]",
                  isCreating ? "opacity-50 scale-95" : "hover:bg-black"
                )}
              >
                {isCreating ? "Creating..." : "Save Task"}
              </button>
            </form>
          </div>
        )}

        <div className="space-y-4">
          <div className="text-[11px] font-black text-[#00031F]/45 uppercase tracking-[0.2em] px-2 mb-4">Active Tasks</div>
          {tasks.map((task) => (
            <div
              key={task.id}
              className={cn(
                "p-6 bg-white border border-black/10 rounded-xl flex items-center gap-6 transition-all animate-in slide-in-from-top-2 duration-300",
                task.status === 'completed' ? "opacity-50 grayscale" : "shadow-sm hover:border-[#F0197A]/30"
              )}
            >
              <button
                onClick={() => {
                  setTasks(prev => prev.map(t =>
                    t.id === task.id ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' } : t
                  ));
                }}
                className={cn(
                  "w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-colors",
                  task.status === 'completed' ? "bg-[#8DA68E] border-[#8DA68E]" : "border-black/10 hover:border-[#F0197A]"
                )}
              >
                {task.status === 'completed' && <CheckCircle2 size={18} className="text-white" />}
              </button>
              <div className="flex-1">
                <div className={cn("text-lg font-bold", task.status === 'completed' && "line-through opacity-60")}>{task.text}</div>
                <div className="text-xs font-medium opacity-40 uppercase tracking-widest">{task.date}</div>
              </div>
              <button
                onClick={() => setTasks(prev => prev.filter(t => t.id !== task.id))}
                className="p-3 text-black/5 hover:text-red-500 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DriverView({ isDemo }: { isDemo?: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [expandedDriver, setExpandedDriver] = useState<number | null>(null);

  const indianCities = [
    "Mumbai, MH", "Delhi, DL", "Bangalore, KA", "Hyderabad, TS",
    "Ahmedabad, GJ", "Chennai, TN", "Kolkata, WB", "Surat, GJ",
    "Pune, MH", "Jaipur, RJ", "Lucknow, UP", "Kanpur, UP",
    "Nagpur, MH", "Indore, MP", "Thane, MH"
  ];

  const driverNames = [
    "Arjun Singh", "Vikram Mehra", "Rahul Sharma", "Sanjay Gupta",
    "Amit Patel", "Priya Kumari", "Rohan Das", "Anjali Rao",
    "Karthik S.", "Deepak Jha", "Sunil Verma", "Manoj Tiwari",
    "Suresh Raina", "Rajesh Kumar", "Vijay Yadav"
  ];

  useEffect(() => {
    if (!isDemo) return;

    let isCancelled = false;
    const runDemo = async () => {
      if (isCancelled) return;
      await new Promise(r => setTimeout(r, 2000));
      if (isCancelled) return;
      setExpandedDriver(0);
      await new Promise(r => setTimeout(r, 3000));
      if (isCancelled) return;
      setExpandedDriver(null);
      await new Promise(r => setTimeout(r, 1000));
      if (isCancelled) return;
      setExpandedDriver(2);
      await new Promise(r => setTimeout(r, 3000));
      if (isCancelled) return;
      setExpandedDriver(null);

      if (!isCancelled) runDemo();
    };

    runDemo();
    return () => { isCancelled = true; };
  }, [isDemo]);

  useEffect(() => {
    if (!isDemo || !scrollRef.current || expandedDriver !== null) return;
    const scroll = () => {
      if (scrollRef.current) {
        if (scrollRef.current.scrollTop + scrollRef.current.clientHeight >= scrollRef.current.scrollHeight) {
          scrollRef.current.scrollTop = 0;
        } else {
          scrollRef.current.scrollTop += 1;
        }
      }
    };
    const interval = setInterval(scroll, 50);
    return () => clearInterval(interval);
  }, [isDemo, expandedDriver]);

  return (
    <div className="h-full flex flex-col p-8 bg-[#FFFFFF] animate-in fade-in duration-300">
      <h2 className="text-2xl font-extrabold text-[#00031F] mb-10 tracking-tight">Driver Behaviour</h2>
      <div className="grid grid-cols-3 gap-8 mb-10">
        <div className="p-8 bg-[#FFFFFF] border border-black/10 rounded-2xl text-center shadow-sm">
          <div className="text-3xl font-black text-[#F0197A] mb-1">98.2</div>
          <div className="text-[11px] font-bold uppercase tracking-widest opacity-40">Avg Safety Score</div>
        </div>
        <div className="p-8 bg-[#FFFFFF] border border-black/10 rounded-2xl text-center shadow-sm">
          <div className="text-3xl font-black text-[#7292B5] mb-1">1,240</div>
          <div className="text-[11px] font-bold uppercase tracking-widest opacity-40">Total Trips</div>
        </div>
        <div className="p-8 bg-[#FFFFFF] border border-black/10 rounded-2xl text-center shadow-sm">
          <div className="text-3xl font-black text-[#8DA68E] mb-1">0</div>
          <div className="text-[11px] font-bold uppercase tracking-widest opacity-40">Incidents</div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto no-scrollbar space-y-3"
      >
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="flex flex-col">
            <button
              onClick={() => setExpandedDriver(expandedDriver === i ? null : i)}
              className={cn(
                "p-5 bg-white border border-black/10 rounded-xl flex items-center gap-6 hover:shadow-md transition-all text-left w-full",
                expandedDriver === i && "border-[#F0197A] shadow-md"
              )}
            >
              <span className="w-6 text-sm font-black opacity-20">{i + 1}</span>
              <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-xs font-black">
                D{i + 1}
              </div>
              <div className="flex-1">
                <div className="text-base font-bold text-[#00031F]">Driver ID: {882 + i}</div>
                <div className="text-xs font-medium opacity-40 uppercase tracking-wider">Scania Heavy Hauler</div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-lg font-black text-[#F0197A]">{100 - i * 0.5}</div>
                  <div className="text-[9px] font-bold uppercase opacity-40 tracking-tighter">Score</div>
                </div>
                <ChevronDown size={18} className={cn("text-black/20 transition-transform", expandedDriver === i && "rotate-180")} />
              </div>
            </button>

            <div className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out bg-[#FFFFFF] border-x border-b border-black/10 rounded-b-2xl -mt-2",
              expandedDriver === i ? "max-h-60 opacity-100 p-6" : "max-h-0 opacity-0 p-0"
            )}>
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div>
                  <span className="block font-bold text-black/40 uppercase text-[10px] tracking-widest mb-1">Name</span>
                  <span className="font-bold text-[#00031F] text-base">{driverNames[i % driverNames.length]}</span>
                </div>
                <div>
                  <span className="block font-bold text-black/40 uppercase text-[10px] tracking-widest mb-1">Current Location</span>
                  <span className="font-bold text-[#00031F] text-base">{indianCities[i % indianCities.length]}</span>
                </div>
                <div>
                  <span className="block font-bold text-black/40 uppercase text-[10px] tracking-widest mb-1">Total Hours</span>
                  <span className="font-bold text-[#00031F] text-base">{120 + i * 5} hrs</span>
                </div>
                <div>
                  <span className="block font-bold text-black/40 uppercase text-[10px] tracking-widest mb-1">Vehicle</span>
                  <span className="font-bold text-[#00031F] text-base">SCANIA-{1000 + i}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface DispatchTask {
  id: string;
  vehicle: string;
  driver: string;
  origin: string;
  destination: string;
  status: 'in-transit' | 'pending' | 'completed' | 'delayed';
  eta: string;
}

const MOCK_DISPATCH_TASKS: DispatchTask[] = [
  { id: "DSP-001", vehicle: "SCANIA 5463-T-1", driver: "Arjun Singh", origin: "Mumbai, MH", destination: "Pune, MH", status: "in-transit", eta: "2h 15m" },
  { id: "DSP-002", vehicle: "VOLVO 2291-B-2", driver: "Vikram Mehra", origin: "Delhi, DL", destination: "Jaipur, RJ", status: "pending", eta: "5h 30m" },
  { id: "DSP-003", vehicle: "TATA 1102-X-4", driver: "Rahul Sharma", origin: "Bangalore, KA", destination: "Chennai, TN", status: "in-transit", eta: "3h 45m" },
  { id: "DSP-004", vehicle: "SCANIA 48913-B-7", driver: "Sanjay Gupta", origin: "Ahmedabad, GJ", destination: "Surat, GJ", status: "completed", eta: "—" },
  { id: "DSP-005", vehicle: "AL7-992", driver: "Amit Patel", origin: "Hyderabad, TS", destination: "Nagpur, MH", status: "delayed", eta: "6h 10m" },
];

function DispatchView() {
  const [tasks, setTasks] = useState<DispatchTask[]>(MOCK_DISPATCH_TASKS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTask, setNewTask] = useState({ vehicle: "", driver: "", origin: "", destination: "" });

  const handleCreateTask = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!newTask.vehicle.trim() || !newTask.destination.trim()) return;
    setTasks(prev => [{
      id: `DSP-${String(prev.length + 1).padStart(3, '0')}`,
      vehicle: newTask.vehicle,
      driver: newTask.driver || "Unassigned",
      origin: newTask.origin || "Depot",
      destination: newTask.destination,
      status: 'pending',
      eta: "TBD"
    }, ...prev]);
    setNewTask({ vehicle: "", driver: "", origin: "", destination: "" });
    setShowCreateModal(false);
  };

  const statusColor = (status: DispatchTask['status']) => {
    switch (status) {
      case 'in-transit': return 'text-[#7292B5] bg-[#F0197A]/10';
      case 'pending': return 'text-[#F0197A] bg-[#F0197A]/10';
      case 'completed': return 'text-[#8DA68E] bg-[#8DA68E]/10';
      case 'delayed': return 'text-red-500 bg-red-500/10';
    }
  };

  return (
    <div className="h-full flex flex-col p-8 bg-[#FFFFFF] animate-in fade-in duration-300 relative">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-extrabold text-[#00031F] tracking-tight">Dispatch Board</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-3 bg-[#F0197A] text-white rounded-xl text-base font-bold flex items-center gap-2 shadow-lg hover:scale-105 transition-all"
        >
          <Plus size={20} /> Create Task
        </button>
      </div>

      {showCreateModal && (
        <div className="absolute inset-0 bg-[#FFFFFF]/80 backdrop-blur-sm z-20 flex items-center justify-center p-8 animate-in fade-in zoom-in-95 duration-200">
          <form onSubmit={handleCreateTask} className="w-full max-w-lg bg-white border border-black/10 rounded-2xl shadow-2xl p-10 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-extrabold text-[#00031F]">Create Dispatch Task</h3>
              <button type="button" onClick={() => setShowCreateModal(false)} className="text-black/20 hover:text-black transition-colors">
                <Plus size={32} className="rotate-45" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em]">Vehicle</label>
                <input type="text" value={newTask.vehicle} onChange={(e) => setNewTask(p => ({ ...p, vehicle: e.target.value }))} placeholder="e.g. SCANIA 5463-T-1" className="w-full h-14 bg-black/5 rounded-xl px-6 text-base font-medium text-[#00031F] focus:outline-none focus:ring-2 focus:ring-[#F0197A]/20 border-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em]">Driver</label>
                <input type="text" value={newTask.driver} onChange={(e) => setNewTask(p => ({ ...p, driver: e.target.value }))} placeholder="e.g. Arjun Singh" className="w-full h-14 bg-black/5 rounded-xl px-6 text-base font-medium text-[#00031F] focus:outline-none focus:ring-2 focus:ring-[#F0197A]/20 border-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em]">Origin</label>
                  <input type="text" value={newTask.origin} onChange={(e) => setNewTask(p => ({ ...p, origin: e.target.value }))} placeholder="e.g. Mumbai, MH" className="w-full h-14 bg-black/5 rounded-xl px-6 text-sm font-medium text-[#00031F] focus:outline-none focus:ring-2 focus:ring-[#F0197A]/20 border-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em]">Destination</label>
                  <input type="text" value={newTask.destination} onChange={(e) => setNewTask(p => ({ ...p, destination: e.target.value }))} placeholder="e.g. Pune, MH" className="w-full h-14 bg-black/5 rounded-xl px-6 text-sm font-medium text-[#00031F] focus:outline-none focus:ring-2 focus:ring-[#F0197A]/20 border-none" />
                </div>
              </div>
            </div>
            <button type="submit" disabled={!newTask.vehicle.trim() || !newTask.destination.trim()} className="w-full h-14 bg-[#F0197A] text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all hover:bg-[#C0106A] disabled:opacity-50 shadow-[0_4px_16px_rgba(240,25,122,0.3)]">
              Create Task
            </button>
          </form>
        </div>
      )}

      <div className="flex-1 overflow-auto">
        <div className="bg-white border border-black/10 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/[0.02] border-b border-black/10">
                {["Task ID", "Vehicle", "Driver", "Origin", "Destination", "Status", "ETA"].map((h) => (
                  <th key={h} className="px-6 py-4 text-xs font-bold text-[#00031F]/65 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-black/[0.01] transition-colors animate-in slide-in-from-top-2 duration-300">
                  <td className="px-6 py-5 text-sm font-bold text-[#F0197A]">{task.id}</td>
                  <td className="px-6 py-5 text-sm font-bold text-[#00031F]">{task.vehicle}</td>
                  <td className="px-6 py-5 text-sm font-medium text-[#00031F]/80">{task.driver}</td>
                  <td className="px-6 py-5 text-sm font-medium text-[#00031F]/80">{task.origin}</td>
                  <td className="px-6 py-5 text-sm font-medium text-[#00031F]/80">{task.destination}</td>
                  <td className="px-6 py-5">
                    <span className={cn("px-3 py-1 rounded-full text-xs font-bold capitalize", statusColor(task.status))}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm font-bold text-[#00031F]">{task.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const CAMERA_FEEDS = [
  { id: "front", label: "Front Dash", vehicle: "SCANIA 5463-T-1", videoSrc: "/video1.mp4" },
  { id: "cabin", label: "Cabin", vehicle: "SCANIA 5463-T-1", videoSrc: "/video3.mp4" },
  // { id: "rear", label: "Rear Cargo", vehicle: "VOLVO 2291-B-2" },
  // { id: "side", label: "Side View", vehicle: "VOLVO 2291-B-2" },
];

const CAMERA_EVENTS = [
  { id: 1, message: "Hard Braking Event", vehicle: "VOLVO 2291-B-2", time: "2 min ago", severity: "warning" as const },
  { id: 2, message: "Drowsy Driver Detected", vehicle: "SCANIA 5463-T-1", time: "8 min ago", severity: "critical" as const },
  { id: 3, message: "Tailgating Alert", vehicle: "TATA 1102-X-4", time: "15 min ago", severity: "warning" as const },
  { id: 4, message: "Lane Departure", vehicle: "AL7-992", time: "32 min ago", severity: "info" as const },
];

const MOCK_TELEMATIC_ALERTS = [
  { id: 1, vehicleId: "MBHCZC63SJA105819", alertType: "Speed", alertType2: null, dateTime: "22 Apr 2026, 11:37:45 am", fleetName: "Smartwheels Fleet", address: "Sohawal, Ayodhya, Uttar Pradesh, 224001, India" },
  { id: 2, vehicleId: "MBHCZC63SJA105819", alertType: "Speed", alertType2: null, dateTime: "22 Apr 2026, 11:36:06 am", fleetName: "Smartwheels Fleet", address: "NH27, Sohawal, Ayodhya, Uttar Pradesh, 224001, India" },
  { id: 3, vehicleId: "MBHCZC63SJA105819", alertType: "Speed", alertType2: null, dateTime: "22 Apr 2026, 11:35:05 am", fleetName: "Smartwheels Fleet", address: "Sohawal, Ayodhya, Uttar Pradesh, 224001, India" },
  { id: 4, vehicleId: "MBHEWB22SKA232607", alertType: "Harsh Acceleration", alertType2: null, dateTime: "22 Apr 2026, 11:18:57 am", fleetName: "Smartwheels Fleet", address: "Sohawal, Ayodhya, Uttar Pradesh, 224001, India" },
  { id: 5, vehicleId: "MBHEWB22SKA232607", alertType: "Speed", alertType2: null, dateTime: "22 Apr 2026, 11:17:58 am", fleetName: "Smartwheels Fleet", address: "Sohawal, Ayodhya, Uttar Pradesh, 224001, India" },
  { id: 6, vehicleId: "MBHEWB22SKA232607", alertType: "Speed", alertType2: null, dateTime: "22 Apr 2026, 11:16:51 am", fleetName: "Smartwheels Fleet", address: "Sohawal, Ayodhya, Uttar Pradesh, 224001, India" },
  { id: 7, vehicleId: "MBHEWB22SKA232607", alertType: "Speed", alertType2: null, dateTime: "22 Apr 2026, 11:15:42 am", fleetName: "Smartwheels Fleet", address: "NH27, Sohawal, Ayodhya, Uttar Pradesh, 224001, India" },
  { id: 8, vehicleId: "MBHEWB22SKA232607", alertType: "Harsh Acceleration", alertType2: null, dateTime: "22 Apr 2026, 11:14:06 am", fleetName: "Smartwheels Fleet", address: "NH27, Sohawal, Ayodhya, Uttar Pradesh, 224001, India" },
];

const MOCK_DASHCAM_ALERTS = [
  { id: 1, alertType: "About To Sleep", severity: "Critical", vehicleId: "860112070431939", dateTime: "22 Apr 2026, 04:39:43 pm", address: "1567, 27th Main Road, Sector 2, HSR Layout, Bangalore South", videoUrl: "/video1.mp4", channel: "CH 1" },
  { id: 2, alertType: "Storage Failure", severity: "Critical", vehicleId: "860112070431940", dateTime: "22 Apr 2026, 04:39:25 pm", address: "NH27, Sohawal, Ayodhya, Uttar Pradesh, 224001", videoUrl: "/video2.mp4", channel: "CH 2" },
  { id: 3, alertType: "Device Normal", severity: "Medium", vehicleId: "860112070431941", dateTime: "22 Apr 2026, 04:34:53 pm", address: "1568, 27th Main Road, Sector 2, HSR Layout, Bangalore South", videoUrl: "/video1.mp4", channel: "CH 1" },
  { id: 4, alertType: "Ignition Off", severity: "Medium", vehicleId: "860112070431939", dateTime: "22 Apr 2026, 03:21:28 pm", address: "MG Road, Bengaluru, Karnataka, 560001", videoUrl: "/video2.mp4", channel: "CH 2" },
  { id: 5, alertType: "Ignition On", severity: "Low", vehicleId: "860112070431942", dateTime: "22 Apr 2026, 03:02:31 pm", address: "1568, 27th Main Road, Sector 2, HSR Layout, Bangalore South", videoUrl: "/video1.mp4", channel: "CH 1" },
  { id: 6, alertType: "Device Normal", severity: "Low", vehicleId: "860112070431939", dateTime: "22 Apr 2026, 10:10:11 am", address: "1568, 27th Main Road, Sector 2, HSR Layout, Bangalore South", videoUrl: "/video2.mp4", channel: "CH 2" },
  { id: 7, alertType: "About To Sleep", severity: "Critical", vehicleId: "860112070431943", dateTime: "22 Apr 2026, 09:45:22 am", address: "Whitefield, Bengaluru, Karnataka, 560066", videoUrl: "/video1.mp4", channel: "CH 1" },
];

function AllAlertsView() {
  const [activeTab, setActiveTab] = useState<"telematic" | "dashcam">("dashcam");
  const [searchQuery, setSearchQuery] = useState("");
  const [alertFilter, setAlertFilter] = useState("All Alerts");
  const [severityFilter, setSeverityFilter] = useState("All Severity");
  const [videoModal, setVideoModal] = useState<{ url: string; vehicleId: string; channel: string } | null>(null);

  const alertTypeColor = (type: string) => {
    if (type === "Speed") return "bg-orange-100 text-orange-600";
    if (type === "Harsh Acceleration") return "bg-orange-100 text-orange-500";
    if (type === "Harsh Braking") return "bg-red-100 text-red-500";
    return "bg-gray-100 text-gray-500";
  };

  const severityColor = (s: string) => {
    if (s === "Critical") return "bg-red-100 text-red-600";
    if (s === "Medium") return "bg-yellow-100 text-yellow-600";
    return "bg-green-100 text-green-600";
  };

  return (
    <div className="h-full flex flex-col bg-white animate-in fade-in duration-300 overflow-hidden">
      {/* Header */}
      <div className="px-8 pt-6 pb-0 shrink-0">
        {/* <h2 className="text-2xl font-extrabold text-[#00031F] mb-1">All Alerts</h2>
        <p className="text-lg font-bold text-[#D97757] mb-4">Alert History</p> */}
        <p className="text-sm font-bold text-[#D97757] mb-3">Alert History</p>

        {/* Tabs + Date */}
        <div className="flex items-center justify-between border-b border-black/5">
          <div className="flex gap-0">
            {[
              { key: "dashcam", label: "Dashcam Alerts & Video Media" },
              { key: "telematic", label: "Telematic Alerts" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={cn(
                  "px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all",
                  activeTab === tab.key
                    ? "border-[#00031F] text-[#00031F]"
                    : "border-transparent text-[#00031F]/40 hover:text-[#00031F]/70"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {/* <div className="flex items-center gap-2 text-xs font-bold text-[#00031F]/50 border border-black/10 px-3 py-2 rounded-lg mb-1">
            <Calendar size={14} /> 2026-04-22
          </div> */}
        </div>
      </div>

      {/* Controls */}
      <div className="px-8 py-3 flex items-center gap-3 shrink-0 border-b border-black/5">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black/20" size={14} />
          <input
            type="text"
            placeholder={activeTab === "telematic" ? "Search by vehicle ID, device name, alert type..." : activeTab === "dashcam" ? "Search by alert type, vehicle ID, address..." : "Search by..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 bg-white border border-black/10 rounded-lg pl-9 pr-4 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#D97757]/30"
          />
        </div>
        {activeTab === "telematic" && (
          <select value={alertFilter} onChange={(e) => setAlertFilter(e.target.value)} className="h-9 px-3 bg-white border border-black/10 rounded-lg text-xs font-bold focus:ring-0">
            <option>All Alerts</option>
            <option>Speed</option>
            <option>Idle Engine</option>
            <option>Harsh Braking</option>
            <option>Harsh Cornering</option>
            <option>Harsh Acceleration</option>
          </select>
        )}
        {activeTab === "dashcam" && (
          <select value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value)} className="h-9 px-3 bg-white border border-black/10 rounded-lg text-xs font-bold focus:ring-0">
            <option>All Severity</option>
            <option>Critical</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        )}
        <span className="text-xs font-bold text-[#00031F]/30 ml-auto">
          {activeTab === "telematic" ? `Alerts: ${MOCK_TELEMATIC_ALERTS.length} / ${MOCK_TELEMATIC_ALERTS.length}` :
            activeTab === "dashcam" ? `Alerts: ${MOCK_DASHCAM_ALERTS.length} / ${MOCK_DASHCAM_ALERTS.length}` :
              `Alerts: ${MOCK_DASHCAM_ALERTS.length} / ${MOCK_DASHCAM_ALERTS.length}`}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {/* Telematic Alerts Table */}
        {activeTab === "telematic" && (
          <table className="w-full text-left border-collapse text-xs">
            <thead className="sticky top-0 bg-white border-b border-black/5">
              <tr>
                {["Serial No.", "Vehicle ID", "Alert Type", "Alert Date/Time", "Fleet Name", "Address"].map(h => (
                  <th key={h} className="px-6 py-3 text-[10px] font-black text-[#00031F]/40 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {MOCK_TELEMATIC_ALERTS.filter(a =>
                a.vehicleId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                a.alertType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                a.fleetName.toLowerCase().includes(searchQuery.toLowerCase())
              ).filter(a => alertFilter === "All Alerts" || a.alertType === alertFilter).map((alert) => (
                <tr key={alert.id} className="hover:bg-black/[0.01] transition-colors">
                  <td className="px-6 py-4 font-bold text-[#00031F]/50">{alert.id}</td>
                  <td className="px-6 py-4 font-bold text-[#00031F]">{alert.vehicleId}</td>
                  <td className="px-6 py-4">
                    <span className={cn("px-2 py-1 rounded-md text-[10px] font-bold", alertTypeColor(alert.alertType))}>
                      {alert.alertType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#00031F]/60">{alert.dateTime}</td>
                  <td className="px-6 py-4 font-bold text-[#00031F]">{alert.fleetName}</td>
                  <td className="px-6 py-4 text-[#00031F]/50">{alert.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Dashcam Alerts Table */}
        {activeTab === "dashcam" && (
          <table className="w-full text-left border-collapse text-xs">
            <thead className="sticky top-0 bg-white border-b border-black/5">
              <tr>
                {["Serial No.", "Alert Type", "Severity", "Vehicle ID", "Alert Date/Time", "Address", "Attachment"].map(h => (
                  <th key={h} className="px-6 py-3 text-[10px] font-black text-[#00031F]/40 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {MOCK_DASHCAM_ALERTS.filter(a =>
                a.alertType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                a.vehicleId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                a.address.toLowerCase().includes(searchQuery.toLowerCase())
              ).filter(a => severityFilter === "All Severity" || a.severity === severityFilter).map((alert) => (
                <tr key={alert.id} className="hover:bg-black/[0.01] transition-colors">
                  <td className="px-6 py-4 font-bold text-[#00031F]/50">{alert.id}</td>
                  <td className="px-6 py-4 font-bold text-orange-500">{alert.alertType}</td>
                  <td className="px-6 py-4">
                    <span className={cn("px-2 py-1 rounded-full text-[10px] font-bold", severityColor(alert.severity))}>
                      {alert.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#00031F]/60">{alert.vehicleId}</td>
                  <td className="px-6 py-4 text-[#00031F]/60">{alert.dateTime}</td>
                  <td className="px-6 py-4 text-[#00031F]/50">{alert.address}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setVideoModal({ url: (alert as any).videoUrl, vehicleId: alert.vehicleId, channel: (alert as any).channel })}
                      className="w-7 h-7 rounded-md bg-[#D97757] flex items-center justify-center hover:bg-[#bf654a] transition-colors"
                    >
                      <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[7px] border-l-white ml-0.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Video Modal */}
      {videoModal && (
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-in fade-in duration-200"
          onClick={() => setVideoModal(null)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-black/5">
              <div className="flex items-center gap-3">
                <Video size={16} className="text-[#00031F]" />
                <span className="text-sm font-bold text-[#00031F]">Video Playback</span>
                <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-600 text-[10px] font-black">{videoModal.channel}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-[#00031F]/40">{videoModal.vehicleId}</span>
                <button onClick={() => setVideoModal(null)} className="text-black/30 hover:text-black transition-colors">
                  <Plus size={20} className="rotate-45" />
                </button>
              </div>
            </div>
            <video
              src={videoModal.url}
              controls
              autoPlay
              className="w-full bg-black"
              style={{ maxHeight: "400px" }}
            />
            <div className="flex items-center justify-between px-5 py-3 border-t border-black/5 bg-white">
              <span className="text-[10px] font-medium text-[#00031F]/40 truncate max-w-xs">{videoModal.url.split('/').pop()}</span>
              <a
                href={videoModal.url}
                download
                className="flex items-center gap-2 px-4 py-2 bg-[#D97757] text-white rounded-lg text-xs font-bold hover:bg-[#bf654a] transition-colors"
              >
                ↓ Download
              </a>
            </div>
          </div>
        </div>
      )
      }
    </div >
  );
}

function EventTimelineReports() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  if (selectedReport === "Video Telematics Trip Summary") {
    return (
      <div className="h-full flex flex-col bg-[#FFFFFF] animate-in fade-in duration-300">
        <div className="p-6 border-b border-black/10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSelectedReport(null)} className="p-2 hover:bg-black/5 rounded-full transition-colors text-[#00031F]/65">
              <Plus size={20} className="rotate-45" />
            </button>
            <h2 className="text-lg font-bold text-[#00031F]">Video Telematics Trip Summary</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 bg-white border border-black/10 rounded-lg text-xs font-bold text-[#00031F]/65">All Fleets</div>
            <div className="px-3 py-1.5 bg-white border border-black/10 rounded-lg text-xs font-bold text-[#00031F]/65">2026-04-18 to 2026-04-24</div>
            <button className="px-4 py-1.5 bg-white border border-black/10 rounded-lg text-xs font-bold text-[#00031F]/80 hover:bg-black/5">Export CSV</button>
            <button className="px-4 py-1.5 bg-[#F0197A] text-white rounded-lg text-xs font-bold hover:bg-[#C0106A]">Export XLSX</button>
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="sticky top-0 bg-white border-b border-black/10">
              <tr>
                {["VIN", "Fleet", "Distance", "Start Address", "End Address", "Ignition ON", "Ignition OFF", "Idle Time", "Max Speed", "Avg Speed", "Running Time", "GPS Signal"].map(h => (
                  <th key={h} className="px-4 py-3 text-[10px] font-black text-[#00031F]/40 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              <tr className="hover:bg-black/[0.01]">
                <td className="px-4 py-4 font-bold text-[#00031F]">KA02KZ9010</td>
                <td className="px-4 py-4 text-[#00031F]/60">Internal</td>
                <td className="px-4 py-4 text-[#00031F]/60">1 kms</td>
                <td className="px-4 py-4 text-[#00031F]/60">HSR Layout, India</td>
                <td className="px-4 py-4 text-[#00031F]/60">HSR Layout, India</td>
                <td className="px-4 py-4 text-[#00031F]/60">22</td>
                <td className="px-4 py-4 text-[#00031F]/60">49</td>
                <td className="px-4 py-4 text-[#00031F]/60">0mins 40secs</td>
                <td className="px-4 py-4 font-bold text-red-500">151 kmph</td>
                <td className="px-4 py-4 text-[#00031F]/60">3 kmph</td>
                <td className="px-4 py-4 text-[#00031F]/60">26mins 54secs</td>
                <td className="px-4 py-4 font-bold text-yellow-600">6 sats</td>
              </tr>
            </tbody>
          </table>
          <div className="px-6 py-4 text-xs text-[#00031F]/40 font-medium">Showing 1 to 1 of 1 items</div>
        </div>
      </div>
    );
  }

  if (selectedReport === "Video Alert Summary") {
    return (
      <div className="h-full flex flex-col bg-[#FFFFFF] animate-in fade-in duration-300">
        <div className="p-6 border-b border-black/10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSelectedReport(null)} className="p-2 hover:bg-black/5 rounded-full transition-colors text-[#00031F]/65">
              <Plus size={20} className="rotate-45" />
            </button>
            <h2 className="text-lg font-bold text-[#00031F]">Video Alert Summary</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 bg-white border border-black/10 rounded-lg text-xs font-bold text-[#00031F]/65">All Devices</div>
            <div className="px-3 py-1.5 bg-white border border-black/10 rounded-lg text-xs font-bold text-[#00031F]/65">2026-04-18 to 2026-04-24</div>
            <button className="px-4 py-1.5 bg-white border border-black/10 rounded-lg text-xs font-bold text-[#00031F]/80 hover:bg-black/5">Export CSV</button>
            <button className="px-4 py-1.5 bg-[#F0197A] text-white rounded-lg text-xs font-bold hover:bg-[#C0106A]">Export XLSX</button>
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="sticky top-0 bg-white border-b border-black/10">
              <tr>
                {["Device Name", "IMEI", "Manufacturer", "Device Status", "Total Alerts", "Critical", "Medium", "Low", "Device Health Events", "Alert Types Seen", "First Alert", "Last Alert"].map(h => (
                  <th key={h} className="px-4 py-3 text-[10px] font-black text-[#00031F]/40 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              <tr className="hover:bg-black/[0.01]">
                <td className="px-4 py-4 font-bold text-[#00031F]">JC181-31939</td>
                <td className="px-4 py-4 text-[#00031F]/60">860112070431939</td>
                <td className="px-4 py-4 text-[#00031F]/60">JIMI</td>
                <td className="px-4 py-4"><span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded-full text-[10px] font-bold">Sleep</span></td>
                <td className="px-4 py-4 font-bold text-[#00031F]">86</td>
                <td className="px-4 py-4 font-bold text-red-500">1</td>
                <td className="px-4 py-4 font-bold text-orange-500">1</td>
                <td className="px-4 py-4 text-[#00031F]/60">84</td>
                <td className="px-4 py-4 text-[#00031F]/60">49</td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-1">
                    {["Device Normal", "Ignition On", "About To Sleep", "Hard Braking", "Emergency SOS", "Ignition Off", "Storage Failure"].map(t => (
                      <span key={t} className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${t === "About To Sleep" || t === "Hard Braking" || t === "Emergency SOS" ? "text-red-500" : t === "Storage Failure" ? "bg-yellow-100 text-yellow-600" : "text-green-600"}`}>{t}</span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-4 text-[#00031F]/60">04/18/2026</td>
                <td className="px-4 py-4 text-[#00031F]/60">04/23/2026</td>
              </tr>
            </tbody>
          </table>
          <div className="px-6 py-4 text-xs text-[#00031F]/40 font-medium">Showing 1 to 1 of 1 items</div>
        </div>
      </div>
    );
  }

  // return (
  //   <div className="h-full flex flex-col p-8 bg-[#FFFFFF] animate-in fade-in duration-300 overflow-y-auto no-scrollbar">
  //     <h2 className="text-2xl font-extrabold text-[#00031F] tracking-tight mb-8">Event Timeline Reports</h2>
  //     <div className="space-y-12">
  //       <div className="space-y-4">
  //         <h3 className="text-sm font-black text-[#00031F] uppercase tracking-[0.2em] border-l-4 border-[#F0197A] pl-4">Activity</h3>
  //         <button
  //           onClick={() => setSelectedReport("Video Telematics Trip Summary")}
  //           className="w-full p-6 bg-white border border-black/10 rounded-2xl text-left hover:shadow-xl hover:border-[#F0197A]/30 transition-all group flex flex-col gap-3"
  //         >
  //           <h4 className="font-extrabold text-base text-[#00031F] group-hover:text-[#F0197A] transition-colors">Video Telematics Trip Summary</h4>
  //           <p className="text-xs text-[#00031F]/65 leading-relaxed font-medium">Trip history with video telematics events and camera footage</p>
  //         </button>
  //       </div>
  //       <div className="space-y-4">
  //         <h3 className="text-sm font-black text-[#00031F] uppercase tracking-[0.2em] border-l-4 border-[#F0197A] pl-4">Device Health and Status</h3>
  //         <button
  //           onClick={() => setSelectedReport("Video Alert Summary")}
  //           className="w-full p-6 bg-white border border-black/10 rounded-2xl text-left hover:shadow-xl hover:border-[#F0197A]/30 transition-all group flex flex-col gap-3"
  //         >
  //           <h4 className="font-extrabold text-base text-[#00031F] group-hover:text-[#F0197A] transition-colors">Video Alert Summary</h4>
  //           <p className="text-xs text-[#00031F]/65 leading-relaxed font-medium">Summary of video alerts with event type and severity</p>
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="h-full flex flex-col bg-[#FFFFFF] animate-in fade-in duration-300 overflow-y-auto no-scrollbar">
      <div className="p-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <h2 className="text-[#F0197A] font-extrabold text-2xl tracking-tight">Overall Insight Reports</h2>
        </div>
        <div className="space-y-16">
          <div className="space-y-8">
            <h3 className="text-sm font-black text-[#00031F] uppercase tracking-[0.2em] border-l-4 border-[#F0197A] pl-4">Activity</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => setSelectedReport("Video Telematics Trip Summary")}
                className="p-8 bg-white border border-black/10 rounded-2xl text-left hover:shadow-xl hover:border-[#F0197A]/30 transition-all group flex flex-col gap-4 min-h-[180px]"
              >
                <h4 className="font-extrabold text-lg text-[#00031F] group-hover:text-[#F0197A] transition-colors leading-tight">Video Telematics Trip Summary</h4>
                <p className="text-sm text-[#00031F]/65 leading-relaxed font-medium">Trip history with video telematics events and camera footage</p>
              </button>
            </div>
          </div>
          <div className="space-y-8">
            <h3 className="text-sm font-black text-[#00031F] uppercase tracking-[0.2em] border-l-4 border-[#F0197A] pl-4">Device Health and Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => setSelectedReport("Video Alert Summary")}
                className="p-8 bg-white border border-black/10 rounded-2xl text-left hover:shadow-xl hover:border-[#F0197A]/30 transition-all group flex flex-col gap-4 min-h-[180px]"
              >
                <h4 className="font-extrabold text-lg text-[#00031F] group-hover:text-[#F0197A] transition-colors leading-tight">Video Alert Summary</h4>
                <p className="text-sm text-[#00031F]/65 leading-relaxed font-medium">Summary of video alerts with event type and severity</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CamerasView({ externalFeature, onShowAllAlerts, showAllAlerts }: { externalFeature?: string; onShowAllAlerts?: (v: boolean) => void; showAllAlerts?: boolean }) {
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const [alertPanel, setAlertPanel] = useState<string | null>(null);
  const [highlightedEvent, setHighlightedEvent] = useState<number | null>(null);

  // Default auto-demo when no feature is selected
  useEffect(() => {
    if (showAllAlerts || externalFeature) return;
    const timer = setTimeout(() => setAlertPanel("cabin"), 3000);
    return () => clearTimeout(timer);
  }, [externalFeature]);

  // React to external feature selection
  useEffect(() => {
    if (!externalFeature) return;

    setSelectedCamera(null);
    setAlertPanel(null);
    setHighlightedEvent(null);

    let isCancelled = false;

    if (externalFeature === "dashcam") {
      // Cycle through selecting each camera
      const run = async () => {
        const cams = ["front", "cabin", "rear", "side"];
        for (const cam of cams) {
          if (isCancelled) return;
          setSelectedCamera(cam);
          await new Promise(r => setTimeout(r, 1200));
        }
        if (!isCancelled) {
          await new Promise(r => setTimeout(r, 800));
          setSelectedCamera(null);
          if (!isCancelled) run();
        }
      };
      run();
    } else if (externalFeature === "ai-alerts") {
      // Trigger alerts on different panels in sequence
      const run = async () => {
        const alerts: [string, string][] = [
          ["cabin", "Drowsy Driver"],
          ["front", "Hard Braking"],
          ["side", "Tailgating"],
        ];
        for (const [cam] of alerts) {
          if (isCancelled) return;
          setAlertPanel(cam);
          setSelectedCamera(cam);
          await new Promise(r => setTimeout(r, 2000));
          if (isCancelled) return;
          setAlertPanel(null);
          await new Promise(r => setTimeout(r, 500));
        }
        if (!isCancelled) run();
      };
      run();
    } else if (externalFeature === "event-timeline") {
      // No animation needed - handled by early return below
    } else if (externalFeature === "live-streaming") {
      // Select front camera with streaming emphasis
      setSelectedCamera("front");
    }

    return () => { isCancelled = true; };
  }, [externalFeature]);

  if (showAllAlerts) {
    return <AllAlertsView />;
  }

  if (externalFeature === "event-timeline") {
    return <EventTimelineReports />;
  }

  return (
    <div className="h-full flex flex-col p-8 bg-[#FFFFFF] animate-in fade-in duration-300">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-extrabold text-[#00031F] tracking-tight">Live Camera Feeds</h2>
        <div className="flex items-center gap-2 text-[10px] font-bold text-[#00031F]/55 uppercase tracking-widest">
          <div className="w-2 h-2 bg-[#8DA68E] rounded-full animate-pulse" />
          4 Cameras Online
        </div>
      </div>

      {/* 2x2 Camera Grid */}
      <div className="grid grid-cols-2 gap-4 flex-1 min-h-0 mb-6">
        {CAMERA_FEEDS.map((cam) => (
          <button
            key={cam.id}
            onClick={() => setSelectedCamera(cam.id === selectedCamera ? null : cam.id)}
            className={cn(
              "relative bg-[#00031F] rounded-2xl overflow-hidden transition-all duration-300 text-left",
              selectedCamera === cam.id
                ? "ring-2 ring-[#F0197A] shadow-lg"
                : "ring-1 ring-black/10 hover:ring-[#F0197A]/30"
            )}
          >
            {/* Dark feed area */}
            {/* Video feed */}
            <div className="absolute inset-0 flex items-center justify-center">
              {cam.videoSrc ? (
                <video
                  src={cam.videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover opacity-80"
                />
              ) : (
                <Camera size={32} className="text-white/10" />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent" />
            </div>

            {/* LIVE indicator */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
              <div className="w-2 h-2 bg-[#8DA68E] rounded-full animate-pulse" />
              <span className="text-[#8DA68E] text-[9px] font-black uppercase tracking-wider">Live</span>
            </div>

            {/* Camera label */}
            <div className="absolute bottom-3 left-3">
              <div className="text-white text-xs font-bold">{cam.label}</div>
              <div className="text-white/30 text-[9px] font-bold">{cam.vehicle}</div>
            </div>

            {/* AI Alert */}
            {alertPanel === cam.id && (
              <div className="absolute top-3 right-3 bg-red-500 text-white px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg animate-in fade-in slide-in-from-right-2 duration-300">
                <AlertTriangle size={12} />
                <span className="text-[9px] font-black uppercase tracking-wider">Drowsy Driver</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* View All Alerts Button */}
      <div className="shrink-0 mb-3 flex justify-end">
        <button
          onClick={() => onShowAllAlerts?.(true)}
          className="text-xs font-bold text-[#F0197A] hover:text-[#C0106A] transition-colors uppercase tracking-wider"
        >
          View All Alerts →
        </button>
      </div>

      {/* Event Timeline */}
      <div className="shrink-0">
        <div className="flex items-center gap-2 mb-3">
          <div className="text-[11px] font-black text-[#00031F]/45 uppercase tracking-[0.2em]">Recent AI Events</div>
        </div>
        <div className="space-y-2">
          {CAMERA_EVENTS.map((event) => (
            <div key={event.id} className={cn("p-4 bg-white border rounded-xl flex items-center gap-4 transition-all", highlightedEvent === event.id ? "border-[#F0197A] shadow-md" : "border-black/10 hover:border-[#F0197A]/20")}>
              <div className={cn(
                "w-2.5 h-2.5 rounded-full shrink-0",
                event.severity === "critical" && "bg-red-500",
                event.severity === "warning" && "bg-yellow-500",
                event.severity === "info" && "bg-[#F0197A]"
              )} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-[#00031F] truncate">{event.message}</div>
                <div className="text-[10px] font-bold text-[#00031F]/55 uppercase tracking-widest">{event.vehicle}</div>
              </div>
              <span className="text-[10px] font-bold text-[#00031F]/55 uppercase tracking-widest shrink-0">{event.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Helper Components ---

function SidebarItem({
  icon,
  label,
  active = false,
  hasSubmenu = false,
  onClick,
  badge
}: {
  icon: React.ReactNode,
  label: string,
  active?: boolean,
  hasSubmenu?: boolean,
  onClick?: () => void,
  badge?: string
}) {
  return (
    <button onClick={onClick} className={cn("w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group text-left relative", active ? "bg-[#F0197A] text-white shadow-none" : "text-white/70 hover:bg-white/5 hover:text-white")}>
      <div className="flex items-center gap-4">
        {icon}
        <div className="flex flex-col">
          <span className="text-[15px] font-bold tracking-tight hidden lg:inline">{label}</span>
          {badge && <span className="text-[10px] font-black text-[#F0197A] bg-white/10 px-2 py-0.5 rounded-full uppercase tracking-tighter lg:inline hidden">{badge}</span>}
        </div>
      </div>
      {hasSubmenu && <Plus size={16} className="opacity-40 hidden lg:inline" />}
    </button>
  );
}

function HistoryItem({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-[#FFFFFF] border border-black/10 hover:border-black/10 transition-all cursor-pointer group">
      <span className="text-[14px] text-[#00031F]/80 truncate font-bold">{label}</span>
      <button className="p-2 text-[#00031F]/45 hover:text-[#F0197A] hover:bg-[#F0197A]/5 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
        <Trash2 size={16} />
      </button>
    </div>
  );
}

function SuggestionChip({ label, onClick }: { label: string, onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-6 py-3 rounded-full bg-white border border-black/10 text-sm text-[#00031F]/80 font-bold hover:border-black/20 hover:bg-black/5 transition-all truncate max-w-full"
    >
      {label}
    </button>
  );
}

function MapMarker({
  top,
  left,
  count,
  type,
  isHovered,
  onClick
}: {
  top: string,
  left: string,
  count: number,
  type: "main" | "secondary",
  isHovered?: boolean,
  onClick?: () => void
}) {
  return (
    <div
      className="absolute flex flex-col items-center gap-1 cursor-pointer group"
      style={{ top, left }}
      onClick={onClick}
    >
      <div className={cn(
        "w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-[10px] lg:text-xs font-bold transition-all shadow-lg relative",
        type === "main" ? "bg-[#F0197A]/80 text-white" : "bg-[#F0197A]/80 text-white",
        isHovered && "scale-125 ring-4 ring-white shadow-xl"
      )}>
        {count}
        {isHovered && (
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-[#00031F] px-3 py-1.5 rounded-lg border border-black/10 text-[10px] font-bold whitespace-nowrap shadow-xl animate-in fade-in slide-in-from-bottom-1 duration-200">
            {count} Active Units
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-r border-b border-black/10 rotate-45" />
          </div>
        )}
      </div>
      <div className="w-1.5 h-1.5 bg-[#FFFFFF] rounded-full border-2 border-black/20" />
    </div>
  );
}

interface AlertDetail {
  impactAnalysis: {
    financial: string;
    operational: string;
    compliance: string;
  };
  thresholdBreach: {
    metric: string;
    current: string;
    target: string;
    deviation: string;
    percentage: string;
  };
  rootCause: string;
  recommendedActions: string[];
  priorityScore: number;
  resolveWithin: number;
}

interface Alert {
  id: string;
  agent: string;
  title: string;
  criticality: 'red' | 'yellow' | 'green';
  timestamp: string;
  details: AlertDetail;
}

const AGENTS = [
  "fleet operations intelligence",
  "maintenance and reliability system",
  "safety and compliance monitor",
  "driver and workforce management",
  "financial analytics and optimisation",
  "strategic planning and sustainability",
  "fraud detection and prevention"
];

const MOCK_ALERTS: Alert[] = [
  {
    id: "1",
    agent: "maintenance and reliability system",
    title: "Unexpected Fuel Consumption Spike - Truck 42",
    criticality: "red",
    timestamp: "Just now",
    details: {
      impactAnalysis: {
        financial: "Estimated $450/week additional fuel cost if unresolved.",
        operational: "Potential engine failure within 72 hours.",
        compliance: "No immediate compliance risk."
      },
      thresholdBreach: {
        metric: "Fuel Economy",
        current: "4.2 MPG",
        target: "6.5 MPG",
        deviation: "-2.3 MPG",
        percentage: "-35.4%"
      },
      rootCause: "Fuel injector leak in cylinder 4 causing inefficient combustion.",
      recommendedActions: [
        "Schedule immediate inspection for Truck 42",
        "Replace fuel injector assembly",
        "Review maintenance logs for similar issues in the batch"
      ],
      priorityScore: 92,
      resolveWithin: 6
    }
  },
  {
    id: "2",
    agent: "safety and compliance monitor",
    title: "Harsh Braking Pattern Detected - Route B4",
    criticality: "yellow",
    timestamp: "5 mins ago",
    details: {
      impactAnalysis: {
        financial: "Increased wear and tear on brake assemblies.",
        operational: "Minor delivery delays due to safety-forced stops.",
        compliance: "Potential safety policy violation."
      },
      thresholdBreach: {
        metric: "Harsh Braking Events",
        current: "12 / 100km",
        target: "2 / 100km",
        deviation: "+10 events",
        percentage: "+500%"
      },
      rootCause: "Slippery road conditions on Route B4 combined with aggressive driving.",
      recommendedActions: [
        "Issue advisory for Route B4",
        "Assign driver safety coaching module",
        "Monitor next 3 trips for this driver"
      ],
      priorityScore: 65,
      resolveWithin: 24
    }
  },
  {
    id: "3",
    agent: "fraud detection and prevention",
    title: "Unusual Fuel Card Transaction Location",
    criticality: "red",
    timestamp: "12 mins ago",
    details: {
      impactAnalysis: {
        financial: "$1,200 potential fraudulent charge.",
        operational: "Driver currently unable to use card.",
        compliance: "Corporate policy violation."
      },
      thresholdBreach: {
        metric: "Transaction Distance from Vehicle",
        current: "450km",
        target: "< 5km",
        deviation: "445km",
        percentage: "N/A"
      },
      rootCause: "Fuel card used at a station significantly far from the vehicle's GPS location.",
      recommendedActions: [
        "Freeze fuel card ending in 4921",
        "Verify driver identity",
        "Flag for internal audit"
      ],
      priorityScore: 98,
      resolveWithin: 2
    }
  },
  {
    id: "4",
    agent: "fleet operations intelligence",
    title: "Idling Time Exceeding Threshold - Warehouse 7",
    criticality: "green",
    timestamp: "1 hour ago",
    details: {
      impactAnalysis: {
        financial: "$12/hour fuel waste.",
        operational: "Inefficient turnaround at Warehouse 7.",
        compliance: "Environmental policy warning."
      },
      thresholdBreach: {
        metric: "Idle Time",
        current: "45 mins",
        target: "10 mins",
        deviation: "+35 mins",
        percentage: "+350%"
      },
      rootCause: "Congestion at loading dock 4 causing queue build-up.",
      recommendedActions: [
        "Notify warehouse manager",
        "Suggest rerouting next 2 trucks to dock 6",
        "Review dock scheduling"
      ],
      priorityScore: 32,
      resolveWithin: 48
    }
  },
  {
    id: "5",
    agent: "driver and workforce management",
    title: "Shift Hour Limit Approaching - Driver R. Singh",
    criticality: "yellow",
    timestamp: "2 hours ago",
    details: {
      impactAnalysis: {
        financial: "Potential overtime pay.",
        operational: "Need to find replacement driver for next leg.",
        compliance: "HOS (Hours of Service) violation if shift continues > 45 mins."
      },
      thresholdBreach: {
        metric: "On-duty Hours",
        current: "10.25 hours",
        target: "11 hours",
        deviation: "-0.75 hours",
        percentage: "N/A"
      },
      rootCause: "Delayed departure from origin due to weather.",
      recommendedActions: [
        "Notify driver to find nearest safe rest stop",
        "Dispatch relief driver to meet at stop 4",
        "Adjust arrival ETA for customer"
      ],
      priorityScore: 78,
      resolveWithin: 1
    }
  },
  {
    id: "6",
    agent: "financial analytics and optimisation",
    title: "Cost Per Mile Spike - Region North",
    criticality: "yellow",
    timestamp: "6 hours ago",
    details: {
      impactAnalysis: {
        financial: "Projected $2,500 monthly budget overrun.",
        operational: "Inefficient asset allocation in Region North.",
        compliance: "N/A"
      },
      thresholdBreach: {
        metric: "Cost Per Mile",
        current: "$1.45",
        target: "$1.20",
        deviation: "+$0.25",
        percentage: "+20.8%"
      },
      rootCause: "Combination of rising local fuel prices and older fleet models in North region.",
      recommendedActions: [
        "Analyze route profitability",
        "Consider partial fleet swap with Region East",
        "Negotiate local fuel supplier contract"
      ],
      priorityScore: 54,
      resolveWithin: 72
    }
  },
  {
    id: "7",
    agent: "strategic planning and sustainability",
    title: "Emissions Target Deviation",
    criticality: "green",
    timestamp: "12 hours ago",
    details: {
      impactAnalysis: {
        financial: "Minor ESG rating impact.",
        operational: "N/A",
        compliance: "Reporting required for quarterly sustainability metrics."
      },
      thresholdBreach: {
        metric: "CO2 Emissions",
        current: "124g / km",
        target: "115g / km",
        deviation: "+9g / km",
        percentage: "+7.8%"
      },
      rootCause: "Reduced usage of electric vehicles due to charger maintenance.",
      recommendedActions: [
        "Prioritize charger repair",
        "Optimize EV routing",
        "Update quarterly ESG report"
      ],
      priorityScore: 28,
      resolveWithin: 168
    }
  }
];

function VirtualManagerView({ externalAgent }: { externalAgent?: string }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAgent, setFilterAgent] = useState("all");
  const [sortBy, setSortBy] = useState("priority-high");
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [checkedAlerts, setCheckedAlerts] = useState<Set<string>>(new Set());
  const alertsScrollRef = useRef<HTMLDivElement>(null);
  const alertRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // When an external agent is selected, scroll to its alert then open it
  useEffect(() => {
    if (!externalAgent) {
      setFilterAgent("all");
      setSelectedAlert(null);
      return;
    }
    // Keep showing all alerts — don't filter
    setFilterAgent("all");
    setSelectedAlert(null);

    const agentAlert = MOCK_ALERTS.find(a => a.agent === externalAgent);
    if (agentAlert) {
      // Scroll within the alerts container only (not the page)
      const scrollTimer = setTimeout(() => {
        const el = alertRefs.current[agentAlert.id];
        const container = alertsScrollRef.current;
        if (el && container) {
          const elTop = el.offsetTop - container.offsetTop;
          const center = elTop - container.clientHeight / 2 + el.clientHeight / 2;
          container.scrollTo({ top: center, behavior: 'smooth' });
        }
      }, 200);
      // Then open it
      const openTimer = setTimeout(() => setSelectedAlert(agentAlert), 800);
      return () => { clearTimeout(scrollTimer); clearTimeout(openTimer); };
    }
  }, [externalAgent]);

  // Auto-demo: cycle through selecting alerts (only when no external agent is controlling)
  useEffect(() => {
    if (externalAgent) return;
    let isCancelled = false;
    const runDemo = async () => {
      if (isCancelled) return;
      await new Promise(r => setTimeout(r, 2000));
      if (isCancelled) return;
      setSelectedAlert(MOCK_ALERTS[0]);
      await new Promise(r => setTimeout(r, 4000));
      if (isCancelled) return;
      setSelectedAlert(null);
      await new Promise(r => setTimeout(r, 1500));
      if (isCancelled) return;
      setSelectedAlert(MOCK_ALERTS[1]);
      await new Promise(r => setTimeout(r, 4000));
      if (isCancelled) return;
      setSelectedAlert(null);
      await new Promise(r => setTimeout(r, 1500));
      if (isCancelled) return;
      setSelectedAlert(MOCK_ALERTS[2]);
      await new Promise(r => setTimeout(r, 4000));
      if (isCancelled) return;
      setSelectedAlert(null);
      await new Promise(r => setTimeout(r, 1500));
      if (!isCancelled) runDemo();
    };
    runDemo();
    return () => { isCancelled = true; };
  }, []);

  const filteredAlerts = MOCK_ALERTS
    .filter(alert => {
      const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.agent.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesAgent = filterAgent === "all" || alert.agent === filterAgent;
      return matchesSearch && matchesAgent;
    })
    .sort((a, b) => {
      if (sortBy === "priority-high") return b.details.priorityScore - a.details.priorityScore;
      if (sortBy === "priority-low") return a.details.priorityScore - b.details.priorityScore;
      return 0;
    });

  const toggleCheck = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = new Set(checkedAlerts);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setCheckedAlerts(next);
  };

  return (
    <div className="h-full flex flex-col bg-[#FFFFFF] animate-in fade-in duration-500 overflow-hidden">
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 pb-4">
        <div className="bg-white p-6 rounded-2xl border border-black/10 flex flex-col gap-2">
          <div className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em]">Active Agents</div>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-black text-[#00031F]">7</span>
            <span className="text-sm font-bold text-[#8DA68E] pb-1">+0 new</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-black/10 flex flex-col gap-2">
          <div className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em]">Sub-agents Running</div>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-black text-[#00031F]">24</span>
            <span className="text-sm font-bold text-[#F0197A] pb-1">3 flagged</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-black/10 flex flex-col gap-2">
          <div className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em]">Overall Fleet Status</div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#8DA68E]" />
            <span className="text-xl font-black text-[#8DA68E]">Operational</span>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="px-8 py-4 flex flex-col md:flex-row gap-4 items-center justify-between border-b border-black/10">
        <div className="relative flex-1 max-w-xl w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" size={18} />
          <input
            type="text"
            placeholder="Search alerts or agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 bg-black/5 rounded-xl pl-12 pr-6 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#F0197A]/20 border-none"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={filterAgent}
            onChange={(e) => setFilterAgent(e.target.value)}
            className="h-12 px-4 bg-black/5 border-none rounded-xl text-xs font-bold uppercase tracking-wider focus:ring-0"
          >
            <option value="all">All Agents</option>
            {AGENTS.map(agent => (
              <option key={agent} value={agent}>{agent}</option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-12 px-4 bg-black/5 border-none rounded-xl text-xs font-bold uppercase tracking-wider focus:ring-0"
          >
            <option value="priority-high">Priority: High to Low</option>
            <option value="priority-low">Priority: Low to High</option>
          </select>
        </div>
      </div>

      {/* Alerts List */}
      <div ref={alertsScrollRef} className="flex-1 overflow-y-auto p-8 pt-6 space-y-4 no-scrollbar">
        {filteredAlerts.map(alert => (
          <div
            key={alert.id}
            ref={el => { alertRefs.current[alert.id] = el; }}
            onClick={() => setSelectedAlert(alert)}
            className={cn(
              "p-6 bg-white border rounded-2xl flex items-center gap-6 hover:shadow-xl hover:border-[#F0197A]/20 transition-all cursor-pointer group animate-in slide-in-from-bottom-2 duration-300",
              externalAgent && alert.agent === externalAgent ? "border-[#F0197A]/40 shadow-md" : "border-black/10"
            )}
          >
            <button
              onClick={(e) => toggleCheck(alert.id, e)}
              className={cn(
                "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                checkedAlerts.has(alert.id) ? "bg-[#F0197A] border-[#F0197A]" : "border-black/10 hover:border-[#F0197A]"
              )}
            >
              {checkedAlerts.has(alert.id) && <CheckCircle2 size={14} className="text-white" />}
            </button>

            <div className={cn(
              "w-3 h-3 rounded-full shrink-0 shadow-lg",
              alert.criticality === 'red' ? "bg-red-500 shadow-red-500/20" :
                alert.criticality === 'yellow' ? "bg-yellow-500 shadow-yellow-500/20" :
                  "bg-green-500 shadow-green-500/20"
            )} />

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black text-[#F0197A] uppercase tracking-[0.2em]">{alert.agent}</span>
                <span className="text-[10px] font-bold text-black/20 uppercase tracking-widest">• {alert.timestamp}</span>
              </div>
              <h3 className="text-lg font-extrabold text-[#00031F] truncate group-hover:text-[#F0197A] transition-colors">
                {alert.title}
              </h3>
            </div>

            <div className="flex flex-col items-end shrink-0">
              <div className="text-2xl font-black text-[#00031F]">{alert.details.priorityScore}</div>
              <div className="text-[10px] font-black text-black/30 uppercase tracking-tighter">Priority Score</div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Hovering Element (Modal/Slide-over) */}
      {selectedAlert && (
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-end p-6 animate-in fade-in duration-300"
          onClick={() => setSelectedAlert(null)}
        >
          <div
            className="w-full max-w-xl bg-[#FFFFFF] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right-8 duration-500"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-8 pb-6 flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    selectedAlert.criticality === 'red' ? "bg-red-500" :
                      selectedAlert.criticality === 'yellow' ? "bg-yellow-500" :
                        "bg-green-500"
                  )} />
                  <span className="text-xs font-black text-[#F0197A] uppercase tracking-[0.2em]">{selectedAlert.agent}</span>
                </div>
                <h2 className="text-3xl font-black text-[#00031F] leading-tight">
                  {selectedAlert.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedAlert(null)}
                className="p-3 hover:bg-black/5 rounded-2xl text-black/20 hover:text-black transition-all"
              >
                <Plus size={32} className="rotate-45" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto px-8 pb-8 space-y-8 no-scrollbar">
              {/* Priority & Time Summary */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#00031F] p-6 rounded-2xl text-white">
                  <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-2">Priority Score</div>
                  <div className="text-4xl font-black">{selectedAlert.details.priorityScore}<span className="text-xl text-white/40">/100</span></div>
                </div>
                <div className="bg-[#F2F0E4] p-6 rounded-2xl border border-black/10">
                  <div className="text-[10px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">Target Resolution</div>
                  <div className="text-2xl font-black text-[#00031F]">{selectedAlert.details.resolveWithin} Hours</div>
                  <div className="text-[10px] font-bold text-black/20 uppercase tracking-widest mt-1">SLA Deadline</div>
                </div>
              </div>

              {/* Impact Analysis */}
              <div className="space-y-4">
                <div className="text-[11px] font-black text-[#00031F] uppercase tracking-[0.2em]">Impact Analysis</div>
                <div className="space-y-3">
                  <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/10 flex gap-4">
                    <div className="w-1.5 h-auto bg-red-500 rounded-full shrink-0" />
                    <div className="space-y-1">
                      <div className="text-[10px] font-black text-red-500 uppercase tracking-widest">Financial Impact</div>
                      <div className="text-sm font-bold text-[#00031F]">{selectedAlert.details.impactAnalysis.financial}</div>
                    </div>
                  </div>
                  <div className="p-4 bg-orange-500/5 rounded-xl border border-orange-500/10 flex gap-4">
                    <div className="w-1.5 h-auto bg-orange-500 rounded-full shrink-0" />
                    <div className="space-y-1">
                      <div className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Operational Impact</div>
                      <div className="text-sm font-bold text-[#00031F]">{selectedAlert.details.impactAnalysis.operational}</div>
                    </div>
                  </div>
                  <div className="p-4 bg-[#F0197A]/5 rounded-xl border border-[#7292B5]/10 flex gap-4">
                    <div className="w-1.5 h-auto bg-[#F0197A] rounded-full shrink-0" />
                    <div className="space-y-1">
                      <div className="text-[10px] font-black text-[#7292B5] uppercase tracking-widest">Compliance Risk</div>
                      <div className="text-sm font-bold text-[#00031F]">{selectedAlert.details.impactAnalysis.compliance}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Threshold Breach */}
              <div className="space-y-4">
                <div className="text-[11px] font-black text-[#00031F] uppercase tracking-[0.2em]">Threshold Breach Analysis</div>
                <div className="bg-white border border-black/10 rounded-2xl overflow-hidden">
                  <div className="p-6 bg-black/5 flex justify-between items-center">
                    <span className="text-xs font-black uppercase tracking-widest text-black/40">Metric</span>
                    <span className="text-sm font-extrabold text-[#F0197A]">{selectedAlert.details.thresholdBreach.metric}</span>
                  </div>
                  <div className="p-6 grid grid-cols-2 gap-8">
                    <div>
                      <div className="text-[10px] font-black text-black/20 uppercase tracking-widest mb-1">Current Value</div>
                      <div className="text-2xl font-black text-[#00031F]">{selectedAlert.details.thresholdBreach.current}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-black/20 uppercase tracking-widest mb-1">Target Value</div>
                      <div className="text-2xl font-black text-black/20">{selectedAlert.details.thresholdBreach.target}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-black/20 uppercase tracking-widest mb-1">Nominal Deviation</div>
                      <div className="text-2xl font-black text-red-500">{selectedAlert.details.thresholdBreach.deviation}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-black/20 uppercase tracking-widest mb-1">Percentage Deviation</div>
                      <div className="text-2xl font-black text-red-500">{selectedAlert.details.thresholdBreach.percentage}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Root Cause */}
              <div className="space-y-4">
                <div className="text-[11px] font-black text-[#00031F] uppercase tracking-[0.2em]">Root Cause Analysis</div>
                <div className="p-6 bg-[#F2F0E4] rounded-2xl border border-black/10">
                  <p className="text-lg font-bold text-[#00031F]/80 italic">
                    "{selectedAlert.details.rootCause}"
                  </p>
                </div>
              </div>

              {/* Recommended Actions */}
              <div className="space-y-4">
                <div className="text-[11px] font-black text-[#00031F] uppercase tracking-[0.2em]">Recommended Actions</div>
                <div className="space-y-3">
                  {selectedAlert.details.recommendedActions.map((action, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-white border border-black/10 rounded-xl hover:border-[#F0197A]/40 transition-all group">
                      <div className="w-8 h-8 rounded-lg bg-[#F0197A]/10 flex items-center justify-center text-[#F0197A] font-black shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-base font-bold text-[#00031F]/85">{action}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-8 flex gap-4">
                <button className="flex-1 h-14 bg-[#F0197A] text-white rounded-xl font-bold text-sm hover:bg-[#C0106A] transition-all shadow-[0_4px_14px_rgba(240,25,122,0.3)]">
                  Approve & Execute Actions
                </button>
                <button className="flex-1 h-14 bg-white border border-black/10 text-black/40 rounded-xl font-bold text-sm hover:bg-black/5 transition-all">
                  Escalate to Human Agent
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Overview Dashboard View ──────────────────────────────────────────────────

const OV_DAYS = ["Apr 21", "Apr 22", "Apr 23", "Apr 24", "Apr 25", "Apr 26", "Apr 27"];

const ovTripDistance = [
  { date: "Apr 21", km: 510 }, { date: "Apr 22", km: 250 }, { date: "Apr 23", km: 235 },
  { date: "Apr 24", km: 480 }, { date: "Apr 25", km: 580 }, { date: "Apr 26", km: 430 }, { date: "Apr 27", km: 115 },
];
const ovIdleTime = [
  { date: "Apr 21", min: 8 }, { date: "Apr 22", min: 33 }, { date: "Apr 23", min: 1 },
  { date: "Apr 24", min: 11 }, { date: "Apr 25", min: 6 }, { date: "Apr 26", min: 2 }, { date: "Apr 27", min: 2 },
];
const ovStopDuration = [
  { date: "Apr 21", min: 3800 }, { date: "Apr 22", min: 6200 }, { date: "Apr 23", min: 11200 },
  { date: "Apr 24", min: 14500 }, { date: "Apr 25", min: 10100 }, { date: "Apr 26", min: 7800 }, { date: "Apr 27", min: 6100 },
];
const ovTrips = [
  { date: "Apr 21", count: 55 }, { date: "Apr 22", count: 28 }, { date: "Apr 23", count: 42 },
  { date: "Apr 24", count: 47 }, { date: "Apr 25", count: 40 }, { date: "Apr 26", count: 46 }, { date: "Apr 27", count: 23 },
];
const ovFuelConsumption = [
  { date: "Apr 21", L: 25 }, { date: "Apr 22", L: 13 }, { date: "Apr 23", L: 16 },
  { date: "Apr 24", L: 25 }, { date: "Apr 25", L: 31 }, { date: "Apr 26", L: 21 }, { date: "Apr 27", L: 5 },
];
const ovIdleFuel = [
  { date: "Apr 21", L: 0.08 }, { date: "Apr 22", L: 0.55 }, { date: "Apr 23", L: 0.02 },
  { date: "Apr 24", L: 0.22 }, { date: "Apr 25", L: 0.12 }, { date: "Apr 26", L: 0.04 }, { date: "Apr 27", L: 0.01 },
];
const ovDistanceFuel = [
  { date: "Apr 21", km: 510 }, { date: "Apr 22", km: 250 }, { date: "Apr 23", km: 235 },
  { date: "Apr 24", km: 480 }, { date: "Apr 25", km: 580 }, { date: "Apr 26", km: 430 }, { date: "Apr 27", km: 115 },
];
const ovFleetUtilDonut = [
  { name: "Active trips", value: 11, color: "#4F6EF7" },
  { name: "Idling", value: 0, color: "#F5A623" },
  { name: "Parked / off", value: 29, color: "#D1D5DB" },
];
const ovVehicleAlerts = [
  { rank: 1, id: "MBHEWB22SKA232607", rate: 100, count: 486, color: "#EF4444" },
  { rank: 2, id: "MA3NYFJ1SLC641713", rate: 92, count: 449, color: "#F5A623" },
  { rank: 3, id: "MBHCZC63SJA105819", rate: 47, count: 228, color: "#F5A623" },
  { rank: 4, id: "MBHEWB22SMK783757", rate: 35, count: 171, color: "#F5A623" },
  { rank: 5, id: "MA3CZF03SHC100322", rate: 22, count: 106, color: "#F5A623" },
];
const ovDriverScores = [
  { name: "Nithya Gupta", id: "MA3CZF63SHF132239", initials: "NG", score: 64, color: "#F5A623", bg: "#FEF3C7", tc: "#92400E" },
  { name: "Abinav", id: "MA3NYFJ1SLC641713", initials: "A", score: 66, color: "#F5A623", bg: "#FEF3C7", tc: "#92400E" },
  { name: "Unknown", id: "MBHCZC63SJA105819", initials: "U", score: 71, color: "#F5A623", bg: "#FEF3C7", tc: "#92400E" },
  { name: "Venu Madhav", id: "MA3CZF03SHC100322", initials: "VM", score: 83, color: "#22C55E", bg: "#DCFCE7", tc: "#166534" },
  { name: "Arav Basha", id: "MBHEWB22SMK783757", initials: "AB", score: 83, color: "#22C55E", bg: "#DCFCE7", tc: "#166534" },
];
const ovServiceOverdue = [
  { id: "15616511...", days: 220, color: "#EF4444" },
  { id: "156165116a...", days: 215, color: "#F87171" },
  { id: "156165116b...", days: 210, color: "#F97316" },
  { id: "1C4BU000...", days: 200, color: "#F5A623" },
  { id: "MAIAJPC...", days: 90, color: "#FDE68A" },
  { id: "MATAJPC...", days: 85, color: "#FEF08A" },
];

function OvProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="bg-gray-200 rounded h-1.5 w-full overflow-hidden">
      <div style={{ width: `${pct}%`, background: color }} className="h-full rounded" />
    </div>
  );
}

function OvSeeMore() {
  return (
    <div className="text-right mt-3">
      <span className="text-xs text-blue-500 cursor-pointer font-medium">See more →</span>
    </div>
  );
}

function OvAxisTag({ label }: { label: string }) {
  return (
    <span className="inline-block bg-gray-100 border border-gray-200 rounded text-[10px] px-2 py-0.5 text-gray-500 mr-1">{label}</span>
  );
}

function OvCard({ title, subtitle, children, className }: { title: string; subtitle?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("bg-white border border-black/10 rounded-xl p-4", className)}>
      <div className="font-bold text-sm text-[#00031F] mb-0.5">{title}</div>
      {subtitle && <div className="text-[11px] text-gray-400 mb-3">{subtitle}</div>}
      {children}
    </div>
  );
}

function OvSectionHeader({ title, color }: { title: string; color: string }) {
  return (
    <div className="flex items-center gap-2 my-5">
      <div style={{ background: color }} className="w-1 h-5 rounded" />
      <h2 className="font-extrabold text-base text-[#00031F]">{title}</h2>
    </div>
  );
}

function OvDonut({ data, total, label }: { data: { name: string; value: number; color: string }[]; total: number; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative w-24 h-24 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={28} outerRadius={44} dataKey="value" startAngle={90} endAngle={-270} strokeWidth={0}>
              {data.map((d, i) => <Cell key={i} fill={d.color} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-black text-[#00031F]">{total}</span>
          <span className="text-[9px] text-gray-400">{label}</span>
        </div>
      </div>
      <div className="flex-1 space-y-2">
        {data.map((d, i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <div style={{ background: d.color }} className="w-2 h-2 rounded-sm" />
              <span className="text-[11px] text-gray-500">{d.name}</span>
            </div>
            <span className="text-xs font-bold text-[#00031F]">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OvKpiCard({ label, value, sub, subColor, borderColor }: { label: string; value: React.ReactNode; sub: string; subColor: string; borderColor: string }) {
  return (
    <div style={{ borderTop: `3px solid ${borderColor}` }} className="flex-1 bg-white border border-black/10 rounded-lg p-3 min-w-0">
      <div className="text-[9px] font-black uppercase tracking-wider text-gray-400 mb-1">{label}</div>
      <div className="text-lg font-black text-[#00031F] leading-tight">{value}</div>
      <div style={{ color: subColor }} className="text-[11px] font-medium mt-1">{sub}</div>
    </div>
  );
}

export function OverviewDashboardView() {
  return (
    <div className="h-full overflow-y-auto bg-[#FAFAFA] no-scrollbar">
      <div className="p-6">

        {/* Live Bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs font-bold text-[#00031F]">Live · Last 24 hours</span>
            <span className="text-xs text-gray-400">Updated Apr 27, 2026</span>
          </div>
          <span className="text-[11px] text-gray-400 italic">Charts below reflect the selected date range</span>
        </div>

        {/* KPI Cards */}
        <div className="flex gap-3 mb-6">
          <OvKpiCard label="Total Active Vehicles" value="7" sub="▲ 6 vs yesterday" subColor="#22C55E" borderColor="#4F6EF7" />
          <OvKpiCard label="Active Alerts" value={<span className="text-orange-500">266</span>} sub="🚩 Critical" subColor="#9CA3AF" borderColor="#EF4444" />
          <OvKpiCard label="Fleet Utilization" value="12 hrs 6 mins" sub="▼ 2% vs yesterday" subColor="#EF4444" borderColor="#22C55E" />
          <OvKpiCard label="Total Distance Driven" value="467.92 km" sub="▲ 4% vs yesterday" subColor="#22C55E" borderColor="#F5A623" />
          <OvKpiCard label="Total Fuel Consumption" value="21 km/L" sub="▼ 3% improved" subColor="#22C55E" borderColor="#8B5CF6" />
        </div>

        {/* KPI Header */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-black text-[#00031F]">Key Performance KPI's</h2>
          <div className="flex items-center gap-2 bg-white border border-black/10 rounded-lg px-3 py-1.5 text-xs text-gray-600">
            📅 From 2026-04-21 to 2026-04-27
          </div>
        </div>

        {/* ── Location & Movement ── */}
        <OvSectionHeader title="Location & Movement" color="#4F6EF7" />
        <div className="grid grid-cols-2 gap-4 mb-4">

          {/* Trip Distance */}
          <OvCard title="Trip Distance (km)" subtitle="Fleet total km per day">
            <div className="mb-2"><OvAxisTag label="X Date" /><OvAxisTag label="Y Distance (km)" /></div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ovTripDistance} barSize={22}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="km" fill="#4F6EF7" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <OvSeeMore />
          </OvCard>

          {/* Fleet Utilisation Donut */}
          <OvCard title="Fleet Utilisation Rate" subtitle="Total Fleet Utilisation Rate Per Day">
            <div className="mb-2"><OvAxisTag label="Type Donut" /></div>
            <OvDonut data={ovFleetUtilDonut} total={40} label="Total" />
            <div className="mt-3 border-t border-gray-100 pt-3 space-y-2">
              {[["Heavy trucks", 0, "#4F6EF7"], ["Medium", 0, "#F5A623"], ["Light", 100, "#F5A623"]].map(([label, val, color]) => (
                <div key={String(label)} className="flex items-center gap-2">
                  <span className="text-[11px] text-gray-500 w-20 shrink-0">{label}</span>
                  <OvProgressBar value={Number(val)} max={100} color={String(color)} />
                  <span className="text-[11px] font-bold text-[#00031F] w-8 text-right">{val}%</span>
                </div>
              ))}
            </div>
            <OvSeeMore />
          </OvCard>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Idle Time */}
          <OvCard title="Idle Time (min)" subtitle="Fleet total idle minutes per day">
            <div className="mb-2"><OvAxisTag label="X Date" /><OvAxisTag label="Y Idle minutes" /></div>
            <div className="flex gap-2 mb-3">
              <div className="flex-1 bg-gray-50 rounded-lg p-2">
                <div className="text-[9px] font-black uppercase tracking-wider text-gray-400">Total Idle</div>
                <div className="text-base font-black text-orange-500">63 min</div>
              </div>
              <div className="flex-1 bg-gray-50 rounded-lg p-2">
                <div className="text-[9px] font-black uppercase tracking-wider text-gray-400">Avg / Vehicle</div>
                <div className="text-base font-black text-orange-500">6 min/day</div>
              </div>
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ovIdleTime} barSize={18}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="min" fill="#F5A623" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <OvSeeMore />
          </OvCard>

          {/* Stop Duration */}
          <OvCard title="Stop Duration" subtitle="Fleet total stop duration per day">
            <div className="mb-2"><OvAxisTag label="X Date" /><OvAxisTag label="Y Stop minutes" /></div>
            <div className="flex gap-2 mb-3">
              <div className="flex-1 bg-gray-50 rounded-lg p-2">
                <div className="text-[9px] font-black uppercase tracking-wider text-gray-400">Total Stop Duration</div>
                <div className="text-base font-black text-[#2ABFBF]">65,962 min</div>
              </div>
              <div className="flex-1 bg-gray-50 rounded-lg p-2">
                <div className="text-[9px] font-black uppercase tracking-wider text-gray-400">Avg Stops / Vehicle</div>
                <div className="text-base font-black text-[#2ABFBF]">5997 min/day</div>
              </div>
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ovStopDuration} barSize={18}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => v >= 1000 ? `${(v/1000).toFixed(0)}k` : String(v)} />
                  <Tooltip />
                  <Bar dataKey="min" fill="#2ABFBF" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <OvSeeMore />
          </OvCard>
        </div>

        {/* Vehicle Alerts + Trips */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Vehicle Alerts Table */}
          <OvCard title="Vehicle Alerts" subtitle="Alert rate · Top 5 vehicles">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="text-gray-400 border-b border-gray-100">
                  <th className="py-1.5 text-left font-semibold">#</th>
                  <th className="py-1.5 text-left font-semibold">VEHICLE</th>
                  <th className="py-1.5 text-left font-semibold">ALERT RATE</th>
                  <th className="py-1.5 text-right font-semibold">COUNT</th>
                </tr>
              </thead>
              <tbody>
                {ovVehicleAlerts.map((v) => (
                  <tr key={v.rank} className="border-b border-gray-50">
                    <td className="py-2 font-bold" style={{ color: v.rank === 1 ? "#EF4444" : "#9CA3AF" }}>{v.rank}</td>
                    <td className="py-2 font-mono text-[10px] text-[#00031F]">{v.id}</td>
                    <td className="py-2">
                      <div className="flex items-center gap-1">
                        <div style={{ width: `${(v.rate / 110) * 64}px`, background: v.color }} className="h-1.5 rounded" />
                        <div className="flex-1 h-1.5 bg-gray-200 rounded" />
                      </div>
                    </td>
                    <td className="py-2 text-right font-bold" style={{ color: v.rank === 1 ? "#EF4444" : "#374151" }}>{v.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <OvSeeMore />
          </OvCard>

          {/* No. of Trips */}
          <OvCard title="No. of Trips" subtitle="Fleet total trips completed per day">
            <div className="mb-2"><OvAxisTag label="X Date" /><OvAxisTag label="Y Trip count" /></div>
            <div className="flex gap-2 mb-3">
              <div className="flex-1 bg-gray-50 rounded-lg p-2">
                <div className="text-lg font-black text-blue-500">299</div>
                <div className="text-[9px] text-gray-400">Total trips</div>
              </div>
              <div className="flex-1 bg-gray-50 rounded-lg p-2">
                <div className="text-lg font-black text-green-500">43</div>
                <div className="text-[9px] text-gray-400">Avg/day</div>
              </div>
              <div className="flex-1 bg-gray-50 rounded-lg p-2">
                <div className="text-lg font-black text-orange-500">23</div>
                <div className="text-[9px] text-gray-400">Today</div>
              </div>
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ovTrips} barSize={22}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#2ABFBF" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <OvSeeMore />
          </OvCard>
        </div>

        {/* ── Fuel & Energy ── */}
        <OvSectionHeader title="Fuel & Energy" color="#F5A623" />
        <OvCard title="Distance Driven (km)" subtitle="Fleet total km per day · Selected date range" className="mb-4">
          <div className="mb-2"><OvAxisTag label="X Date" /><OvAxisTag label="Y km" /></div>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ovDistanceFuel} barSize={44}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="km" fill="#4F6EF7" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <OvSeeMore />
        </OvCard>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <OvCard title="Fuel Consumption" subtitle="Fleet total litres per day">
            <div className="mb-2"><OvAxisTag label="X Date / Trip" /><OvAxisTag label="Y Litres" /></div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ovFuelConsumption} barSize={22}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="L" fill="#F5A623" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <OvSeeMore />
          </OvCard>

          <OvCard title="Idle Fuel Waste (L)" subtitle="Fleet idle fuel burned per day">
            <div className="mb-2"><OvAxisTag label="X Date" /><OvAxisTag label="Y Waste litres" /></div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ovIdleFuel}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="L" stroke="#EF4444" strokeWidth={2} dot={{ fill: "#EF4444", r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <OvSeeMore />
          </OvCard>
        </div>

        {/* ── Driver Behaviour ── */}
        <OvSectionHeader title="Driver Behaviour" color="#22C55E" />
        <div className="grid grid-cols-3 gap-4 mb-4">

          {/* Driver Score */}
          <OvCard title="Driver Score (Overall)" subtitle="Least Five Drivers">
            <div className="mb-2"><OvAxisTag label="X Driver" /><OvAxisTag label="Y Score" /></div>
            <div className="space-y-3">
              {ovDriverScores.map((d) => (
                <div key={d.id} className="flex items-center gap-2">
                  <div style={{ background: d.bg }} className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-black shrink-0">
                    <span style={{ color: d.tc }}>{d.initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-bold text-[#00031F] truncate">{d.name}</div>
                    <div className="text-[9px] text-gray-400 font-mono truncate">{d.id}</div>
                    <OvProgressBar value={d.score} max={100} color={d.color} />
                  </div>
                  <div style={{ borderColor: d.color, color: d.color }} className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-[11px] font-black shrink-0">{d.score}</div>
                </div>
              ))}
            </div>
            <OvSeeMore />
          </OvCard>

          {/* Eco Driver Score */}
          <OvCard title="Eco Driver Score" subtitle="Fuel-efficient driving behaviour">
            <div className="mb-2"><OvAxisTag label="Type Gauge + breakdown" /><OvAxisTag label="Y Score 0–100" /></div>
            <div className="text-center py-2">
              <div className="text-3xl font-black text-green-500">60</div>
              <div className="text-[11px] text-gray-400 mb-2">Fleet avg eco score</div>
              <OvProgressBar value={60} max={100} color="#F5A623" />
            </div>
            <div className="mt-3 space-y-2">
              {[["Smooth accel.", 62, "#F5A623"], ["Smooth braking", 65, "#F5A623"], ["Speed mgmt.", 87, "#22C55E"], ["Idle avoidance", 80, "#22C55E"]].map(([label, val, color]) => (
                <div key={String(label)} className="flex items-center gap-2">
                  <span className="text-[11px] text-gray-500 w-24 shrink-0">{label}</span>
                  <OvProgressBar value={Number(val)} max={100} color={String(color)} />
                  {Number(val) >= 80 && <span className="text-[11px] font-bold text-[#00031F] w-6">{val}</span>}
                </div>
              ))}
            </div>
            <OvSeeMore />
          </OvCard>

          {/* Driving Hours */}
          <OvCard title="Driving Hours" subtitle="Total drive time per driver per day">
            <div className="mb-2"><OvAxisTag label="X Date" /><OvAxisTag label="Y Hours" /></div>
            <div className="h-40 flex items-center justify-center">
              <span className="text-xs text-gray-400 italic">No data available for selected date range</span>
            </div>
            <OvSeeMore />
          </OvCard>
        </div>

        {/* ── Safety & Alerts ── */}
        <OvSectionHeader title="Safety & Alerts" color="#EF4444" />
        <div className="grid grid-cols-2 gap-4 mb-4">
          <OvCard title="AI Dashcam Events" subtitle="AI-detected Events by category per day">
            <div className="mb-2"><OvAxisTag label="X Date" /><OvAxisTag label="Y Count" /></div>
            <div className="h-40 flex items-center justify-center">
              <span className="text-xs text-gray-400 italic">No data available for selected date range</span>
            </div>
            <OvSeeMore />
          </OvCard>

          <OvCard title="Alert Severity" subtitle="Distribution of alert severity levels">
            <div className="mb-2"><OvAxisTag label="Type Pie" /><OvAxisTag label="Series Severity level" /></div>
            <div className="flex items-center justify-center gap-6">
              <div className="relative w-32 h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={[{ value: 105, name: "Low" }]} cx="50%" cy="50%" outerRadius={60} dataKey="value" strokeWidth={0}>
                      <Cell fill="#1D9E75" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-black text-sm">105</div>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1D9E75]" />
                <span className="text-xs text-gray-600">Low</span>
              </div>
            </div>
            <OvSeeMore />
          </OvCard>
        </div>

        {/* ── Maintenance ── */}
        <OvSectionHeader title="Maintenance" color="#8B5CF6" />
        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Maintenance Status */}
          <OvCard title="Maintenance Status" subtitle="Fleet vehicle health status at a glance · Daily · Maintenance system">
            <div className="mb-2"><OvAxisTag label="Type Donut" /><OvAxisTag label="Y Vehicle count" /></div>
            <div className="flex items-center gap-4 mb-3">
              <div className="relative w-24 h-24 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[{ name: "Overdue", value: 6, color: "#EF4444" }, { name: "Due Soon", value: 0.01, color: "#F5A623" }]}
                      cx="50%" cy="50%" innerRadius={28} outerRadius={44} dataKey="value" strokeWidth={0}
                    >
                      <Cell fill="#EF4444" />
                      <Cell fill="#F5A623" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-black text-[#00031F]">6</span>
                  <span className="text-[9px] text-gray-400">Vehicles</span>
                </div>
              </div>
              <div className="flex-1 space-y-2">
                {[["Due Soon", 0, "#F5A623"], ["Overdue", 6, "#EF4444"]].map(([label, val, color]) => (
                  <div key={String(label)} className="flex justify-between">
                    <div className="flex items-center gap-1.5">
                      <div style={{ background: String(color) }} className="w-2 h-2 rounded-sm" />
                      <span className="text-[11px] text-gray-500">{label}</span>
                    </div>
                    <span style={{ color: String(color) }} className="text-xs font-bold">{val}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-gray-100 pt-2 space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-gray-400">Next service due</span><span className="text-gray-300">—</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-gray-400">Most overdue</span>
                <span className="text-red-500 font-bold">156165116115616ZZ - 230 days</span>
              </div>
            </div>
            <OvSeeMore />
          </OvCard>

          {/* Service Overdue Count */}
          <OvCard title="Service Overdue Count" subtitle="Vehicles past service date · Y = days overdue">
            <div className="mb-2"><OvAxisTag label="X Vehicle" /><OvAxisTag label="Y Overdue days" /></div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ovServiceOverdue} layout="vertical" barSize={18}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="id" tick={{ fontSize: 9, fill: "#9CA3AF" }} axisLine={false} tickLine={false} width={65} />
                  <Tooltip />
                  <Bar dataKey="days" radius={[0, 3, 3, 0]}>
                    {ovServiceOverdue.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <OvSeeMore />
          </OvCard>
        </div>

      </div>
    </div>
  );
}

