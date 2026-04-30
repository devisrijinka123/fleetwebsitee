"use client";

import { useState } from "react";
import { FixedDashboard } from "@/components/dashboard/FixedDashboard";
import { View } from "@/components/dashboard/DashboardDemo";
import { Footer } from "@/components/Footer";
import {
  FLEET_INTELLIGENCE_QUESTIONS,
  FMS_FEATURES,
  AGENTS,
  CAMERAS_VIDEO_FEATURES,
  PRODUCT_SECTIONS,
} from "@/constants/products";
import { ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  // Fleet Intelligence state
  const [activeQuestion, setActiveQuestion] = useState<string>("");
  const [currentPrompt, setCurrentPrompt] = useState<string>("");

  const handleQuestionClick = (questionId: string, question: string) => {
    if (activeQuestion === questionId) {
      setActiveQuestion("");
    } else {
      setActiveQuestion(questionId);
      setCurrentPrompt(question);
    }
  };

  // FMS state
  const [activeFMS, setActiveFMS] = useState<string>("");
  const [currentFMSView, setCurrentFMSView] = useState<View>("monitor_overview");

  const handleFMSClick = (featureId: string, view: View) => {
    if (activeFMS === featureId) {
      setActiveFMS("");
    } else {
      setActiveFMS(featureId);
      setCurrentFMSView(view);
    }
  };

  // Virtual Manager / AI Fleet Manager state
  const [activeAgent, setActiveAgent] = useState<string>("");

  const AGENT_DESCRIPTIONS: Record<string, string> = {
    "fleet optimizer": "Identifies underused and overworked vehicles, balances fleet workload, and maximizes asset utilization across your entire operation.",
    "driver safety and performance": "Tracks harsh braking, acceleration, overspeeding, and safety scores - flagging at-risk drivers and enabling coaching before incidents occur.",
    "maintenance monitor": "Predicts maintenance needs using fault codes, engine hours, and alert history - reducing unplanned breakdowns and extending vehicle life.",
    "fraud detection": "Detects suspicious fuel drain events, phantom fill-ups, and unauthorized asset use using multi-signal anomaly detection.",
    "safety and compliance": "Monitors driver safety scores, regulatory deadlines, and policy adherence - keeping your fleet audit-ready at all times.",
    "cost and finance tracker": "Tracks cost-per-mile, budget variances, and fuel spend - giving you clear visibility into where your fleet money is going.",
    "strategic planner": "Provides long-term insights on fleet expansion, electrification readiness, and sustainability targets to support smarter business decisions."
  };

  // Camera features state
  const [activeCameraFeature, setActiveCameraFeature] = useState<string>("");

  return (
    <main className="min-h-screen bg-[#FFFFFF] font-sans relative">
      <div>
        {/* Hero Section */}
        <div className="bg-[#FFFFFF] pt-36">
          <div className="max-w-5xl mx-auto px-6 py-16 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-[#00031F] tracking-[-0.04em] leading-[1.1]">
              The only fleet management <br />
              platform that <span className="text-[#F0197A]">does work for you</span>.
            </h1>
            <p className="mt-8 text-lg md:text-xl text-[#00031F]/80 max-w-3xl mx-auto font-medium tracking-tight leading-relaxed">
              Ravity Fleet provides end-to-end automation of complex fleet workloads,
              leveraging AI to automate planning, operation, and compliance.
            </p>
          </div>

          <section className="pb-20 px-6 flex justify-center">
            <div className="w-full max-w-7xl aspect-[16/8.5] relative overflow-hidden shadow-2xl border border-black/10 bg-[#E8F4FA]">
              <div
                className="absolute inset-0 bg-[url('/bckg2.png')] bg-cover bg-center scale-125 opacity-10"
              />
              <div className="absolute inset-0 bg-white/5" />
              <div className="absolute inset-0 flex items-center justify-center py-8 md:py-12 lg:py-16 px-4 md:px-6 lg:px-8">
                <FixedDashboard
                  url="rfleet.ai/fleetSage"
                  maxWidth="1150px"
                  aspectRatio="1150/600"
                  canvasWidth={1404}
                  initialView="copilot"
                  interactive={true}
                />
              </div>
            </div>
          </section>
        </div>

        {/* Logos Section */}
        <div className="bg-[#FFFFFF] py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-[#00031F] leading-tight text-center">
              Ravity platforms are used by the world&apos;s largest fleet companies.
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'maruti1', ext: '.png', noFilter: true },
                { name: 'renault', ext: '.png' },
                { name: 'aivis', ext: '.svg', noFilter: true },
                { name: 'volvo', ext: '.png', noFilter: true },
              ].map((logo) => (
                <div key={logo.name} className="bg-gray-50 aspect-[3/2] flex items-center justify-center p-8">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={`/${logo.name}${logo.ext}`}
                      alt={logo.name}
                      className={`max-w-full max-h-full object-contain ${(logo as any).noFilter ? '' : 'brightness-0'}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== PRODUCT SECTIONS ===== */}
        <div className="bg-[#FFFFFF] pt-24 pb-24">
          <div className="max-w-7xl mx-auto px-6 space-y-24">
            {/* 1. Fleet Intelligence */}
            <section id="fleet-sage" className="scroll-mt-32">
              <div className="bg-[#FFFFFF] p-4 lg:p-6 flex flex-col lg:flex-row lg:aspect-[9/5] gap-6 lg:gap-8 rounded-none overflow-hidden">
                <div className="lg:w-[39%] flex flex-col text-left h-full">
                  <div className="mb-4">
                    <div className="text-xs font-black text-[#F0197A] uppercase tracking-[0.2em] mb-2">{PRODUCT_SECTIONS[0].label}</div>
                    <h3 className="text-3xl font-bold text-[#00031F] leading-tight mb-2">{PRODUCT_SECTIONS[0].heading}</h3>
                    <p className="text-sm text-[#00031F]/65 font-medium leading-relaxed mb-3">{PRODUCT_SECTIONS[0].subtitle}</p>
                    <p className="text-xs text-[#00031F]/80 font-medium">Click a question to see how Fleet Sage answers in real time.</p>
                  </div>
                  <div className="flex-1 flex flex-col gap-2 overflow-y-auto no-scrollbar">
                    {FLEET_INTELLIGENCE_QUESTIONS.map((q) => (
                      <div
                        key={q.id}
                        className={cn(
                          "rounded-none transition-all duration-300 overflow-hidden",
                          activeQuestion === q.id ? "bg-[#FFFFFF] shadow-sm" : "bg-transparent hover:bg-black/5"
                        )}
                      >
                        <button
                          onClick={() => handleQuestionClick(q.id, q.question)}
                          className="w-full flex items-center justify-between p-4 text-left"
                        >
                          <span className={cn(
                            "font-medium text-base transition-colors leading-snug",
                            activeQuestion === q.id ? "text-[#F0197A]" : "text-[#00031F]"
                          )}>
                            {q.question}
                          </span>
                          <div className={cn("transition-transform duration-300 shrink-0 ml-2", activeQuestion === q.id ? "rotate-180" : "rotate-0")}>
                            <ChevronDown size={16} />
                          </div>
                        </button>
                        <div className={cn(
                          "grid transition-all duration-300 ease-in-out",
                          activeQuestion === q.id ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        )}>
                          <div className="overflow-hidden">

                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:w-[61%] w-full bg-[#E8F4FA] h-full flex items-center justify-center relative overflow-hidden shadow-sm rounded-none">
                  <div className="absolute inset-0 bg-[url('/bckg2.png')] bg-cover bg-center scale-110 opacity-10" />
                  <div className="relative z-10 w-full h-full flex items-center justify-center p-6 lg:p-12">
                    <FixedDashboard
                      initialView="copilot"
                      hideSidebar
                      maxWidth="100%"
                      aspectRatio="6/5"
                      canvasWidth={1000}
                      externalPrompt={activeQuestion ? currentPrompt : ""}
                      interactive={true}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* 2. AI Fleet Manager (Coming Soon) */}
            <section id="ai-fleet-manager" className="scroll-mt-32">
              <div className="bg-[#FFFFFF] p-4 lg:p-6 flex flex-col lg:flex-row-reverse lg:aspect-[9/5] gap-6 lg:gap-8 rounded-none overflow-hidden">
                <div className="lg:w-[39%] flex flex-col text-left h-full">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-[10px] font-black text-[#F0197A] uppercase tracking-[0.2em]">{PRODUCT_SECTIONS[2].label}</div>
                      {/* <span className="px-2 py-0.5 bg-[#F0197A] text-white text-[8px] font-bold uppercase tracking-wider rounded-full">Coming Soon</span> */}
                    </div>
                    <h3 className="text-3xl font-bold text-[#00031F] leading-tight mb-2">{PRODUCT_SECTIONS[2].heading}</h3>
                    <p className="text-sm text-[#00031F]/65 font-medium leading-relaxed mb-2">{PRODUCT_SECTIONS[2].subtitle}</p>
                    <p className="text-xs text-[#00031F]/80 font-medium">Click an agent to see its alerts and actions.</p>
                  </div>
                  <div className="flex-1 flex flex-col gap-1 overflow-y-auto no-scrollbar">
                    {AGENTS.map((agent, idx) => (
                      <div
                        key={agent}
                        className={cn(
                          "rounded-none transition-all duration-300 overflow-hidden",
                          activeAgent === agent ? "bg-[#FFFFFF] shadow-sm" : "bg-transparent hover:bg-black/5"
                        )}
                      >
                        <button
                          onClick={() => setActiveAgent(activeAgent === agent ? "" : agent)}
                          className="w-full flex items-center justify-between p-4 text-left"
                        >
                          <div className="flex items-center gap-4">
                            <span className="text-xs font-black text-black/20 font-mono">0{idx + 1}</span>
                            <span className={cn(
                              "font-medium text-base transition-colors capitalize",
                              activeAgent === agent ? "text-[#F0197A]" : "text-[#00031F]"
                            )}>
                              {agent}
                            </span>
                          </div>
                          <div className={cn("transition-transform duration-300", activeAgent === agent ? "rotate-180" : "rotate-0")}>
                            <ChevronDown size={20} />
                          </div>
                        </button>
                        <div className={cn(
                          "grid transition-all duration-300 ease-in-out",
                          activeAgent === agent ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        )}>
                          <div className="overflow-hidden">
                            <div className="px-4 pb-4">
                              <p className="text-sm text-[#00031F]/80 leading-relaxed font-medium">
                                {AGENT_DESCRIPTIONS[agent]}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:w-[61%] w-full bg-[#E8F4FA] h-full flex items-center justify-center relative overflow-hidden shadow-sm rounded-none">
                  <div className="absolute inset-0 bg-[url('/bckg3.png')] bg-cover bg-center scale-110 opacity-10" />
                  <div className="relative z-10 w-full h-full flex items-center justify-center p-6 lg:p-12">
                    <FixedDashboard
                      initialView="overview"
                      hideSidebar
                      maxWidth="100%"
                      aspectRatio="6/5"
                      canvasWidth={1000}
                      externalAgent={activeAgent || undefined}
                      demoMode="none"
                      interactive={false}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Cameras & Video */}
            <section id="cameras-video" className="scroll-mt-32">
              <div className="bg-[#FFFFFF] p-4 lg:p-6 flex flex-col lg:flex-row lg:aspect-[9/5] gap-6 lg:gap-8 rounded-none overflow-hidden">
                <div className="lg:w-[39%] flex flex-col text-left h-full">
                  <div className="mb-4">
                    <div className="text-xs font-black text-[#F0197A] uppercase tracking-[0.2em] mb-2">{PRODUCT_SECTIONS[3].label}</div>
                    <h3 className="text-3xl font-bold text-[#00031F] leading-tight mb-2">{PRODUCT_SECTIONS[3].heading}</h3>
                    <p className="text-sm text-[#00031F]/65 font-medium leading-relaxed mb-3">{PRODUCT_SECTIONS[3].subtitle}</p>
                    <p className="text-xs text-[#00031F]/80 font-medium">See how AI monitors your cameras in real time.</p>
                  </div>
                  <div className="flex-1 flex flex-col gap-2 overflow-y-auto no-scrollbar">
                    {CAMERAS_VIDEO_FEATURES.map((feature) => (
                      <div
                        key={feature.id}
                        className={cn(
                          "rounded-none transition-all duration-300 overflow-hidden",
                          activeCameraFeature === feature.id ? "bg-[#FFFFFF] shadow-sm" : "bg-transparent hover:bg-black/5"
                        )}
                      >
                        <button
                          onClick={() => setActiveCameraFeature(activeCameraFeature === feature.id ? "" : feature.id)}
                          className="w-full flex items-center justify-between p-4 text-left"
                        >
                          <span className={cn(
                            "font-medium text-base transition-colors",
                            activeCameraFeature === feature.id ? "text-[#F0197A]" : "text-[#00031F]"
                          )}>
                            {feature.title}
                          </span>
                          <div className={cn("transition-transform duration-300", activeCameraFeature === feature.id ? "rotate-180" : "rotate-0")}>
                            <ChevronDown size={20} />
                          </div>
                        </button>
                        <div className={cn(
                          "grid transition-all duration-300 ease-in-out",
                          activeCameraFeature === feature.id ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        )}>
                          <div className="overflow-hidden">
                            <div className="px-4 pb-4">
                              <p className="text-sm text-[#00031F]/80 leading-relaxed font-medium">{feature.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:w-[61%] w-full bg-[#E8F4FA] h-full flex items-center justify-center relative overflow-hidden shadow-sm rounded-none">
                  <div className="absolute inset-0 bg-[url('/bckg3.png')] bg-cover bg-center scale-110 opacity-10" />
                  <div className="relative z-10 w-full h-full flex items-center justify-center p-6 lg:p-12">
                    <FixedDashboard
                      initialView="cameras"
                      hideSidebar
                      maxWidth="100%"
                      aspectRatio="6/5"
                      canvasWidth={1000}
                      externalCameraFeature={activeCameraFeature || undefined}
                      demoMode="none"
                      interactive={true}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* 4. Fleet Management System */}
            <section id="fms" className="scroll-mt-32">
              <div className="bg-[#FFFFFF] p-4 lg:p-6 flex flex-col lg:flex-row-reverse lg:aspect-[9/5] gap-6 lg:gap-8 rounded-none overflow-hidden">
                <div className="lg:w-[39%] flex flex-col text-left h-full">
                  <div className="mb-4">
                    <div className="text-xs font-black text-[#F0197A] uppercase tracking-[0.2em] mb-2">{PRODUCT_SECTIONS[1].label}</div>
                    <h3 className="text-3xl font-bold text-[#00031F] leading-tight mb-2">{PRODUCT_SECTIONS[1].heading}</h3>
                    <p className="text-sm text-[#00031F]/65 font-medium leading-relaxed mb-3">{PRODUCT_SECTIONS[1].subtitle}</p>
                    <p className="text-xs text-[#00031F]/80 font-medium">Explore our suite of fleet management tools.</p>
                  </div>
                  <div className="flex-1 flex flex-col gap-2 overflow-y-auto no-scrollbar">
                    {FMS_FEATURES.map((feature) => (
                      <div
                        key={feature.id}
                        className={cn(
                          "rounded-none transition-all duration-300 overflow-hidden",
                          activeFMS === feature.id ? "bg-[#FFFFFF] shadow-sm" : "bg-transparent hover:bg-black/5"
                        )}
                      >
                        <button
                          onClick={() => handleFMSClick(feature.id, feature.view)}
                          className="w-full flex items-center justify-between p-4 text-left"
                        >
                          <span className={cn(
                            "font-medium text-base transition-colors",
                            activeFMS === feature.id ? "text-[#F0197A]" : "text-[#00031F]"
                          )}>
                            {feature.title}
                          </span>
                          <div className={cn("transition-transform duration-300", activeFMS === feature.id ? "rotate-180" : "rotate-0")}>
                            <ChevronDown size={20} />
                          </div>
                        </button>
                        <div className={cn(
                          "grid transition-all duration-300 ease-in-out",
                          activeFMS === feature.id ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        )}>
                          <div className="overflow-hidden">
                            <div className="px-4 pb-4">
                              <p className="text-sm text-[#00031F]/80 leading-relaxed font-medium">{feature.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:w-[61%] w-full bg-[#E8F4FA] h-full flex items-center justify-center relative overflow-hidden shadow-sm rounded-none">
                  <div className="absolute inset-0 bg-[url('/bckg4.png')] bg-cover bg-center scale-110 opacity-10" />
                  <div className="relative z-10 w-full h-full flex items-center justify-center p-6 lg:p-12">
                    <FixedDashboard
                      key={activeFMS || "fms-default"}
                      initialView={currentFMSView}
                      hideSidebar
                      maxWidth="100%"
                      aspectRatio="6/5"
                      canvasWidth={1000}
                      demoMode="none"
                      interactive={true}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-[#FFFFFF] pt-8 pb-24">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 max-w-4xl leading-tight text-[#00031F] text-center mx-auto">
              See what our customers have to say.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { role: "Ops Director, Global Logistics", text: "The platform has completely transformed how we handle our maintenance. The AI agents identify risks before they become costly failures.", id: 1 },
                { role: "Fleet Manager, Tier 1 OEM", text: "The realtime insights enable my team to make decisions in minutes that used to take days of manual analysis.", id: 2 },
                { role: "Head of Mobility, Regional Transit", text: "Integrating the platform into our existing telematics stack was seamless. The automation of compliance alone saved us 40 hours a week.", id: 3 },
                { role: "Chief Safety Officer, EuroFreight", text: "The driver platform doesn't just track scores; it changes behavior. Our incident rates dropped by 22% in the first quarter.", id: 4 },
                { role: "VP Strategy, Automotive Group", text: "This is the first platform that feels like it was built for the modern era. It's intelligence-first, not just another dashboard.", id: 5 },
                { role: "Technical Lead, Connected Services", text: "The depth of telemetry data coupled with the agentic reasoning is unique. It's the most impactful mobility tool we've deployed.", id: 6 }
              ].map((testament, i) => (
                <div key={i} className="bg-[#FFFFFF] p-8 flex flex-col gap-6 shadow-sm ring-1 ring-black/5">
                  <div className="flex items-center gap-4">
                    {/* <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img
                        src={`https://i.pravatar.cc/150?u=${testament.id}`}
                        alt={testament.name}
                        className="w-full h-full object-cover"
                      />
                    </div> */}
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-2 font-black text-lg",
                      i === 0 && "bg-blue-50 border-blue-300 text-blue-600",
                      i === 1 && "bg-purple-50 border-purple-300 text-purple-600",
                      i === 2 && "bg-orange-50 border-orange-300 text-orange-600",
                      i === 3 && "bg-green-50 border-green-300 text-green-600",
                      i === 4 && "bg-pink-50 border-pink-300 text-pink-600",
                      i === 5 && "bg-teal-50 border-teal-300 text-teal-600",
                    )}>
                      {testament.role.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-[#00031F]">{testament.name}</div>
                      <div className="text-[13px] font-bold text-[#00031F]/65 uppercase tracking-widest">{testament.role}</div>
                    </div>
                  </div>
                  <p className="text-[#00031F]/80 text-[15px] font-medium leading-relaxed italic">
                    &quot;{testament.text}&quot;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Book a Demo CTA */}
        <div className="max-w-7xl mx-auto px-6 mb-24 pt-12">
          <div className="flex flex-col items-center text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-[#00031F] max-w-4xl leading-tight">
              Ready to see Ravity Fleet in action?
            </h2>
            <button
              onClick={() => {
                const event = new CustomEvent('open-book-demo');
                window.dispatchEvent(event);
              }}
              className="group flex items-center gap-2 bg-[#F0197A] text-white px-8 py-3 rounded-lg font-bold text-base transition-all hover:bg-[#C0106A] shadow-[0_4px_20px_rgba(240,25,122,0.35)]"
            >
              Book a Demo
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
