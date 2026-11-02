import {
  Boxes,
  Globe,
  Smartphone,
  Workflow,
  Box,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  slug: string;
  title: string;
  icon: LucideIcon;
  summary: string;
  capabilities: string[];
  businessValue: string[];
}

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    icon: Globe,
    summary:
      "Fast, secure and SEO-friendly websites and web applications built on modern frameworks and designed to convert visitors into customers.",
    capabilities: [
      "Company websites and landing pages",
      "Custom web applications and portals",
      "E-commerce stores and payment integration",
      "Performance, security and SEO optimisation",
    ],
    businessValue: [
      "A professional online presence that builds trust",
      "Clean URLs and structure that search engines reward",
      "One codebase that works on every screen size",
    ],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    icon: Smartphone,
    summary:
      "Native-quality mobile applications for iOS and Android that extend your business into your customers' pockets.",
    capabilities: [
      "Cross-platform apps for iOS and Android",
      "Publishing support for App Store and Google Play",
      "Push notifications, offline mode and device features",
      "Clean, intuitive mobile-first interfaces",
    ],
    businessValue: [
      "Direct channel to your customers",
      "Higher engagement than mobile web alone",
      "One team from design to store release",
    ],
  },
  {
    slug: "erp-solutions",
    title: "ERP Solutions",
    icon: Boxes,
    summary:
      "Enterprise resource planning systems that connect inventory, finance, procurement and HR in one place, replacing scattered spreadsheets.",
    capabilities: [
      "Inventory and stock management modules",
      "Purchase, sales and order workflows",
      "Finance, accounting and reporting dashboards",
      "Role-based access and approval chains",
    ],
    businessValue: [
      "One source of truth for the whole business",
      "Fewer manual errors and duplicate entries",
      "Real-time visibility for faster decisions",
    ],
  },
  {
    slug: "crm-business-automation",
    title: "CRM & Business Automation",
    icon: Workflow,
    summary:
      "Customer relationship management and automation that keeps every lead, follow-up and task moving without anyone chasing spreadsheets.",
    capabilities: [
      "Lead, pipeline and deal management",
      "Automated follow-ups, reminders and notifications",
      "Workflow automation between your existing tools",
      "Reports on sales performance and activity",
    ],
    businessValue: [
      "No lead forgotten, no follow-up missed",
      "Hours of repetitive work removed every week",
      "Clear ownership of every customer conversation",
    ],
  },
  {
    slug: "3d-ar-experiences",
    title: "3D & AR Experiences",
    icon: Box,
    summary:
      "Interactive 3D product experiences and augmented reality that let customers explore your products before they buy.",
    capabilities: [
      "Virtual stores and showrooms in the browser",
      "3D product viewers and configurators",
      "Augmented reality product placement",
      "WebGL experiences without app installs",
    ],
    businessValue: [
      "Memorable experiences competitors don't offer",
      "Better product understanding before purchase",
      "Modern brand perception in retail and beyond",
    ],
  },
];

export const erpModulesIcon = Boxes;
