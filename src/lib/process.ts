import {
  Compass,
  ClipboardList,
  PenTool,
  Code2,
  TestTube2,
  Rocket,
  type LucideIcon,
} from "lucide-react";

export interface ProcessStep {
  step: number;
  title: string;
  icon: LucideIcon;
  description: string;
  outcomes: string[];
}

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Discovery",
    icon: Compass,
    description:
      "We start by understanding your business, your customers and the problem you need solved. Goals, constraints and success criteria are agreed before anything is designed.",
    outcomes: [
      "Clear problem statement and goals",
      "Scope and priority definition",
      "Honest feasibility feedback",
    ],
  },
  {
    step: 2,
    title: "Planning",
    icon: ClipboardList,
    description:
      "Requirements become a concrete plan: sitemap, feature breakdown, technical architecture and a realistic timeline with milestones you can track.",
    outcomes: [
      "Sitemap and content structure",
      "Feature specification",
      "Timeline and milestone plan",
    ],
  },
  {
    step: 3,
    title: "UI/UX Design",
    icon: PenTool,
    description:
      "Wireframes and high-fidelity designs are produced in line with your brand. You review and approve the visual direction before development begins.",
    outcomes: [
      "Wireframes for key flows",
      "Approved visual design",
      "Responsive layout definitions",
    ],
  },
  {
    step: 4,
    title: "Development",
    icon: Code2,
    description:
      "Approved designs are built with modern, maintainable technology. You see working progress regularly, not just a reveal at the end.",
    outcomes: [
      "Working software in reviewable increments",
      "Clean, documented codebase",
      "Regular progress updates",
    ],
  },
  {
    step: 5,
    title: "Testing",
    icon: TestTube2,
    description:
      "Every release is tested across devices and browsers: functionality, responsiveness, performance, accessibility and security checks before anything goes live.",
    outcomes: [
      "Cross-device test report",
      "Performance and SEO checks",
      "Security and form spam protection",
    ],
  },
  {
    step: 6,
    title: "Launch & Support",
    icon: Rocket,
    description:
      "We handle deployment, domain and SSL configuration, analytics and monitoring — then stay available for support, updates and growth.",
    outcomes: [
      "Production deployment and SSL",
      "Analytics and search console setup",
      "Ongoing support and improvements",
    ],
  },
];
