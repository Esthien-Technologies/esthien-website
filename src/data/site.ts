import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Blocks,
  BrainCircuit,
  Camera,
  Car,
  CircuitBoard,
  Cpu,
  Crosshair,
  DatabaseZap,
  Gauge,
  GitBranch,
  HeartPulse,
  LockKeyhole,
  Layers3,
  Mail,
  Microchip,
  Network,
  Radar,
  Route,
  ScanLine,
  ShieldAlert,
  ShieldCheck,
  Stethoscope,
  Timer,
  Waypoints,
  Zap,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
};

export type Capability = {
  title: string;
  description: string;
  icon: LucideIcon;
  signal: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type DetailItem = {
  title: string;
  body: string;
  icon: LucideIcon;
};

export type UseCase = {
  key: string;
  label: string;
  title: string;
  body: string;
  points: string[];
  icon: LucideIcon;
};

export const site = {
  name: "ESTHIEN TECHNOLOGIES",
  shortName: "ESTHIEN",
  domain: "esthien.com",
  email: "contact@esthien.com",
  thesis: "FPGA-based intelligence chipsets for machines that move.",
  supporting:
    "Building reconfigurable edge-compute architectures for medical assistive systems and automotive sensing, where perception, deterministic control, and safety must happen on device.",
  socialLinks: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/esthien/",
      icon: Camera,
    },
  ] as SocialLink[],
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Vision", href: "/vision" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Contact", href: "/contact" },
];

export const capabilities: Capability[] = [
  {
    title: "FPGA Chipset Architecture",
    description:
      "Reconfigurable logic fabrics, SoC pathways, and edge accelerators shaped for low-latency sensor fusion and control.",
    icon: CircuitBoard,
    signal: "Fabric",
  },
  {
    title: "Medical Assistive Systems",
    description:
      "Hardware and control blocks for bionic arms, prosthetic control, joint support, and mobility systems that help people move.",
    icon: HeartPulse,
    signal: "Human",
  },
  {
    title: "Automotive Sensing and Radar",
    description:
      "On-device perception pipelines for radar, ADAS, and mobile platforms where signals must become safe response quickly.",
    icon: Radar,
    signal: "Vehicle",
  },
  {
    title: "Deterministic Control",
    description:
      "Real-time loops, safe fallback behavior, and hardware isolation for physical systems where a late answer can be wrong.",
    icon: Timer,
    signal: "Resolve",
  },
];

export const principles = [
  {
    title: "Human Capability",
    body: "The benchmark is whether a system helps people become safer, steadier, more mobile, or more effective in the physical world.",
    icon: Stethoscope,
  },
  {
    title: "Safety and Determinism",
    body: "Physical intelligence has to be predictable enough to trust, especially when FPGA loops, sensors, and actuators meet real machines.",
    icon: ShieldCheck,
  },
  {
    title: "Long Horizon",
    body: "The company is positioned as a durable technical institution, not a campaign around a single product wedge.",
    icon: Route,
  },
];

export const identitySignals = [
  {
    title: "Perception and Intellect",
    body: "The name Esthien is treated as a coined institutional name that points toward perception, thought, and action.",
    icon: BrainCircuit,
  },
  {
    title: "Conduit",
    body: "The visual language uses controlled channels to express low-latency translation from intent to physical response.",
    icon: Waypoints,
  },
  {
    title: "Strata",
    body: "The system language is layered: sensor front ends, FPGA fabric, inference, control, safety, and integration working as one stack.",
    icon: Layers3,
  },
  {
    title: "Human Capability",
    body: "The benchmark is whether physical systems become safer, steadier, more useful, and more capable for people.",
    icon: ShieldCheck,
  },
];

export const thesisChain = [
  {
    label: "Understand",
    title: "Perceive the world as it changes.",
    body: "Signals from medical interfaces, radar, machine state, and human intent become the first layer of intelligence.",
    icon: Radar,
  },
  {
    label: "Decide",
    title: "Reason under physical constraints.",
    body: "The system chooses action while respecting latency, stability, safety, privacy, and available edge compute.",
    icon: BrainCircuit,
  },
  {
    label: "Act",
    title: "Translate intelligence into motion.",
    body: "FPGA-based control and embedded hardware turn decisions into precise response in the physical world.",
    icon: Activity,
  },
];

export const doctrine = [
  {
    title: "Capability before spectacle",
    body: "The goal is not to decorate machines with intelligence. The goal is to make physical systems more useful, safer, steadier, and more capable for people.",
    icon: Crosshair,
  },
  {
    title: "Timing is part of truth",
    body: "In embodied systems, intelligence has a deadline. Perception, decision, and control only matter if they arrive in time to affect the world.",
    icon: Activity,
  },
  {
    title: "Architecture earns trust",
    body: "Reliable physical intelligence comes from the stack: hardware, FPGA logic, embedded compute, inference, control, failure behavior, and integration.",
    icon: GitBranch,
  },
];

export const futureLanes = [
  "FPGA-based chipset and reference hardware programs",
  "Bionic arms, prosthetic control, and mobility-assist systems",
  "Radar, ADAS, and vehicle edge-intelligence modules",
  "Safety-critical embedded control and sensor fusion",
  "Future custom silicon when scale justifies it",
];

export const systemLayers = [
  { label: "Sensing", detail: "Radar, biosignals, machine state, and environment inputs", icon: Radar },
  { label: "FPGA Fabric", detail: "Parallel logic for deterministic sensor and control paths", icon: CircuitBoard },
  { label: "Inference", detail: "Edge models that reason under latency, power, and safety limits", icon: Network },
  { label: "Control", detail: "Commands shaped by timing, stability, and safe fallback behavior", icon: Activity },
  { label: "Integration", detail: "Chipset, embedded software, and system interfaces made deployable", icon: Layers3 },
];

export const contactRoutes = [
  {
    label: "Partnerships",
    detail: "Technical and strategic collaboration",
    icon: Network,
  },
  {
    label: "Investors",
    detail: "Institutional and long-term company inquiries",
    icon: Activity,
  },
  {
    label: "Collaborators",
    detail: "Research, engineering, and systems work",
    icon: Mail,
  },
];

export const projectDetails: DetailItem[] = [
  {
    title: "Institution First",
    body: "Esthien is being built as a long-term deep-tech institution, broad enough for medical, mobility, embedded AI, and semiconductor work without being trapped by one early product.",
    icon: Blocks,
  },
  {
    title: "Chipset Center",
    body: "The technical center is FPGA-based edge intelligence: hardware close to sensors and actuators, built for deterministic timing rather than cloud-dependent response.",
    icon: Microchip,
  },
  {
    title: "Human Outcome",
    body: "The project stays tied to practical outcomes: safer vehicles, stronger assistive devices, steadier motion, and physical systems that improve human capability.",
    icon: ShieldCheck,
  },
];

export const chipsetReasons: DetailItem[] = [
  {
    title: "Timing Cannot Wait",
    body: "A bionic arm, radar stack, or safety controller cannot depend on a distant server before acting. On-device chipsets reduce the distance between signal and response.",
    icon: Zap,
  },
  {
    title: "Determinism Beats Averages",
    body: "FPGAs can run parallel, predictable pipelines for sensor I/O, control, and safety checks. Physical systems need bounded timing, not only average-case speed.",
    icon: Gauge,
  },
  {
    title: "Safety Needs Isolation",
    body: "Critical loops, emergency stops, and fallback behavior can be kept in dedicated hardware paths so AI inference never becomes the only layer of trust.",
    icon: ShieldAlert,
  },
  {
    title: "Data Stays Local",
    body: "Medical intent signals and vehicle perception data are sensitive. Edge hardware can keep more processing local while reducing bandwidth and power demands.",
    icon: DatabaseZap,
  },
];

export const useCases: UseCase[] = [
  {
    key: "medical",
    label: "Medical",
    title: "Assistive hardware for human motion.",
    body: "The medical lane focuses on the electronics and control intelligence behind bionic arms, prosthetic systems, joint assistance, and mobility support.",
    points: [
      "Low-latency intent detection for responsive movement",
      "Deterministic motor control for steadier assistive motion",
      "Local processing for sensitive human-interface signals",
    ],
    icon: Stethoscope,
  },
  {
    key: "automotive",
    label: "Automotive",
    title: "Radar and safety modules for moving platforms.",
    body: "The automotive lane treats radar, ADAS, and vehicle perception as timing-critical systems where sensor data must become bounded, safe action.",
    points: [
      "Radar preprocessing and sensor-fusion acceleration",
      "Edge decisions that reduce network and CPU bottlenecks",
      "Safety-aware fallback behavior for mobile environments",
    ],
    icon: Car,
  },
  {
    key: "fpga",
    label: "FPGA Fabric",
    title: "Reconfigurable chipsets before fixed silicon.",
    body: "The architecture begins with FPGA concepts because reconfigurable logic allows rapid iteration, parallel pipelines, and deterministic timing before any future custom silicon path.",
    points: [
      "Parallel sensor, inference, and control lanes",
      "Hardware isolation for safety-critical functions",
      "A realistic path from prototype boards to specialized chips",
    ],
    icon: Cpu,
  },
];

export const securityPosture: DetailItem[] = [
  {
    title: "Hardened Public Surface",
    body: "The site is configured with strict browser security headers, frame blocking, reduced browser permissions, and a conservative content policy for deployment.",
    icon: LockKeyhole,
  },
  {
    title: "Verified Infrastructure",
    body: "The company setup emphasizes clean domain ownership, authenticated email, two-factor protection, and a staged operational footprint before public scale.",
    icon: ShieldCheck,
  },
  {
    title: "Sensor Trust Path",
    body: "Future systems are framed around authenticated inputs, fault isolation, predictable failure modes, and hardware paths that remain safe under degraded conditions.",
    icon: ScanLine,
  },
];
