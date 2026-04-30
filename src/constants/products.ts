import { View } from "@/components/dashboard/DashboardDemo";

export const FLEET_INTELLIGENCE_QUESTIONS = [
  {
    id: "fuel-waste",
    question: "Which vehicles are wasting fuel today?",
    answer: "Currently, **4 vehicles** are showing excessive idling (over 45 mins). **SCANIA 5463-T-1** and **VOLVO 2291-B-2** are the highest contributors, costing approximately **$42 in wasted fuel** since 6 AM."
  },
  {
    id: "truck-breakdown",
    question: "Why did Truck 21 break down last week?",
    answer: "Diagnostic logs for **Truck 21 (AL7-992)** show a **sudden drop in oil pressure** followed by a **critical coolant temperature spike**. The root cause was a **failed water pump gasket** which had been flagged for inspection 3 days prior."
  },
  {
    id: "failure-risk",
    question: "Show vehicles at risk of failure?",
    answer: "I've identified **3 high-risk assets**: \n1. **SCANIA 48913-B-7**: High transmission vibration detected.\n2. **TATA 1102-X-4**: Brake pad thickness below 15%.\n3. **VOLVO 2291-B-2**: Unusual battery voltage fluctuations."
  },
  {
    id: "driver-attention",
    question: "Which drivers need attention now?",
    answer: "Two drivers require immediate attention: \n- **Driver 882**: Has exceeded legal driving hours by 22 mins. \n- **Driver 901**: Triggered 3 'Hard Braking' alerts in the last hour on Highway 4."
  },
  {
    id: "compliance",
    question: "Generate a compliance summary for North region.",
    answer: "**Compliance across the North region is at 94%**. Two drivers (Driver ID: 882, 901) have **exceeded driving hours** by 15 mins. Logs have been **flagged** for your review."
  },
  {
    id: "kpis",
    question: "What are the top 5 KPIs for last month?",
    answer: "1. **Fleet Uptime**: 98.2%\n2. **Fuel Efficiency**: 14.4 MPG (avg)\n3. **On-time Delivery**: 92%\n4. **Safety Score**: 88/100\n5. **Cost per mile**: $1.14"
  }
];

export const FMS_FEATURES: { id: string; title: string; description: string; view: View }[] = [
  {
    id: "dashboard",
    title: "Overview",
    description: "Centralized overview of fleet health, key performance indicators, and real-time operational metrics at a glance.",
    view: "monitor_overview"
  },
  {
    id: "telemetry",
    title: "My Fleet",
    description: "Real-time tracking of every asset with high-fidelity GPS, status updates, and route history.",
    view: "fleet"
  },
  {
    id: "driver",
    title: "Driver Leaderboard",
    description: "Gamified leaderboards, safety scores, and performance metrics to incentivize safe driving behaviors.",
    view: "driver"
  },
  {
    id: "maintenance",
    title: "Vehicle Maintenance",
    description: "Scheduled servicing, engine health alerts, and digital repair logs in one centralized platform.",
    view: "maintenance"
  },
  {
    id: "dispatch",
    title: "Dispatch Management",
    description: "Assign vehicles and drivers to tasks, manage routes, and track delivery progress in real time.",
    view: "dispatch"
  }
];

export const AGENTS = [
  "fleet optimizer",
  "driver safety and performance",
  "maintenance monitor",
  "fraud detection",
  "safety and compliance",
  "cost and finance tracker",
  "strategic planner"
];

export const VIRTUAL_MANAGER_FEATURES = {
  title: "AI Fleet Manager",
  description: "A world's first agentic fleet manager, using agentic AI to convert decades of fleet management knowledge into actionable checkpoints to maximally optimise your fleet.",
  benefits: ["Proactive KPI Monitoring", "Efficiency Trend Analysis", "Automated Issue Detection"]
};

export const CAMERAS_VIDEO_FEATURES: { id: string; title: string; description: string }[] = [
  {
    id: "dashcam",
    title: "Multi-Angle Dashcams",
    description: "Front, cabin camera feeds with continuous recording and cloud backup."
  },
  {
    id: "ai-alerts",
    title: "AI-Powered Alerts",
    description: "Real-time monitoring of driver behaviour, including harsh acceleration, hard braking, collision and tailgating."
  },
  {
    id: "event-timeline",
    title: "Reports",
    description: "Access trip summaries and video alert insights, all in one place."
  },
  {
    id: "live-streaming",
    title: "Live Streaming",
    description: "Monitor any vehicle camera feed in real time from your dashboard with low-latency streaming."
  }
];

export const PRODUCT_SECTIONS = [
  {
    id: "fleet-intelligence",
    label: "Fleet Sage",
    heading: "Less Dashboards. More Decisions. Powered by AI.",
    subtitle: "Your AI teammate that cuts through the noise. No digging through dashboards - just clear answers and smart next steps.",
    status: "live" as const
  },
  {
    id: "fms",
    label: "Fleet Management System",
    heading: "Does What Others Do. Thinks Like Others Don\u2019t.",
    subtitle: "Full fleet capabilities - with AI that sees what\u2019s coming before you do.",
    status: "live" as const
  },
  {
    id: "ai-fleet-manager",
    label: "AI Fleet Manager",
    heading: "It\u2019s Like Having a Buddy Who Never Sleeps.",
    subtitle: "24/7 monitoring. Early warnings. Problems handled before they matter.",
    status: "coming-soon" as const
  },
  {
    id: "cameras-video",
    label: "Cameras & Video",
    heading: "Your Fleet, Always in View.",
    subtitle: "Live footage, smart alerts, and AI that flags what actually matters.",
    status: "live" as const
  }
];
