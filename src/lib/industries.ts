import {
  Briefcase,
  GraduationCap,
  HeartPulse,
  ShoppingBag,
  Truck,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

export interface Industry {
  slug: string;
  name: string;
  icon: LucideIcon;
  description: string;
  solutions: string[];
}

export const industries: Industry[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    icon: HeartPulse,
    description:
      "Digital tools for clinics, therapists and care providers that respect patient privacy and reduce administrative load.",
    solutions: [
      "Patient and therapy management applications",
      "Appointment scheduling and reminders",
      "Secure records and role-based access",
    ],
  },
  {
    slug: "education",
    name: "Education",
    icon: GraduationCap,
    description:
      "Platforms that connect institutions, teachers and students with clear structure and simple workflows.",
    solutions: [
      "Learning platforms and student portals",
      "Admission and enrolment workflows",
      "Fee management and communication tools",
    ],
  },
  {
    slug: "retail-ecommerce",
    name: "Retail & E-commerce",
    icon: ShoppingBag,
    description:
      "Modern storefronts and immersive product experiences that help retailers sell online with confidence.",
    solutions: [
      "E-commerce stores with secure payments",
      "3D product viewers and AR try-before-you-buy",
      "Inventory-connected online catalogues",
    ],
  },
  {
    slug: "logistics-supply-chain",
    name: "Logistics & Supply Chain",
    icon: Truck,
    description:
      "Tracking and coordination systems that keep shipments, fleets and warehouses visible in real time.",
    solutions: [
      "Shipment and fleet tracking dashboards",
      "Route and delivery management tools",
      "Warehouse and stock synchronisation",
    ],
  },
  {
    slug: "wholesale-distribution",
    name: "Wholesale & Distribution",
    icon: Warehouse,
    description:
      "ERP-grade systems for distributors managing high stock volumes, credit sales and complex pricing.",
    solutions: [
      "Inventory and warehouse management",
      "Purchase, sales and credit workflows",
      "Distributor and dealer portals",
    ],
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    icon: Briefcase,
    description:
      "Websites, CRM and automation for consultancies, agencies and firms whose reputation is their product.",
    solutions: [
      "Professional websites and portfolios",
      "Client and pipeline management (CRM)",
      "Proposal, invoicing and follow-up automation",
    ],
  },
];
