/**
 * Portfolio case studies.
 * IMPORTANT (per brand brief): present only genuine projects. Do not invent
 * client names, testimonials, results or performance statistics. Technology
 * lists below must be verified against what was actually used before launch,
 * and approved screenshots should replace the placeholder visuals.
 */
export type VisualKind = "mobile" | "web" | "dashboard" | "crm" | "ar";

export interface Project {
  slug: string;
  title: string;
  category: string;
  industry: string;
  featured: boolean;
  visual: VisualKind;
  overview: string;
  challenge: string;
  solution: string;
  features: string[];
  /** Verify against the stack actually used on the project before publishing. */
  technologies: string[];
  demoUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "healthcare-therapy-app",
    title: "Healthcare & Therapy Application",
    category: "Mobile App Development",
    industry: "Healthcare",
    featured: true,
    visual: "mobile",
    overview:
      "A completed healthcare application supporting therapy-related care. The app gives patients and care providers a simple, structured digital space for sessions, progress and communication.",
    challenge:
      "Therapy-related care involved scattered paper records, phone calls and reminders. Patients needed a private, easy-to-use way to stay connected with their care plan between sessions, without exposing sensitive personal information.",
    solution:
      "We designed and built a mobile application with careful attention to privacy and simplicity. Appointment scheduling, session tracking and secure in-app communication were combined in a calm, accessible interface suitable for all age groups.",
    features: [
      "Secure accounts with role-based access for patients and providers",
      "Appointment scheduling and reminders",
      "Session and progress tracking",
      "Private, structured communication channels",
      "Privacy-first design with no exposed personal data",
    ],
    technologies: [
      "React Native",
      "Node.js",
      "PostgreSQL",
      "REST API",
      "Firebase Cloud Messaging",
    ],
  },
  {
    slug: "business-website-platform",
    title: "Responsive Business Website",
    category: "Web Development",
    industry: "Professional Services",
    featured: true,
    visual: "web",
    overview:
      "A fast, fully responsive company website built to present services clearly, rank well in search engines and turn visitors into enquiries.",
    challenge:
      "The existing online presence was outdated, slow on mobile and difficult to update. Important service information was hard to find and there was no clear path from visitor to enquiry.",
    solution:
      "We rebuilt the site on a modern framework with a clean content structure, mobile-first layouts, SEO-friendly metadata and prominent enquiry calls-to-action on every page.",
    features: [
      "Mobile-first responsive layouts",
      "SEO-friendly page structure and metadata",
      "Clear service hierarchy and internal linking",
      "Enquiry forms connected to the business inbox",
      "Easy content updates for the internal team",
    ],
    technologies: ["Next.js", "React", "Tailwind CSS", "Vercel"],
  },
  {
    slug: "erp-management-system",
    title: "Business Management ERP",
    category: "ERP Solutions",
    industry: "Wholesale & Distribution",
    featured: true,
    visual: "dashboard",
    overview:
      "A custom ERP system that brings inventory, purchasing, sales and reporting into a single management platform for a distribution business.",
    challenge:
      "Daily operations ran on spreadsheets and manual entry across departments. Stock levels, purchase orders and invoices frequently disagreed, causing delays and rework.",
    solution:
      "We delivered a modular ERP with role-based dashboards, connected workflows from purchase to invoice, and reporting that reflects the real state of the business in real time.",
    features: [
      "Inventory and stock movement tracking",
      "Purchase order and supplier management",
      "Sales orders, invoicing and customer accounts",
      "Role-based dashboards and approval workflows",
      "Real-time operational reporting",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "REST API"],
  },
  {
    slug: "crm-sales-platform",
    title: "Sales & Customer CRM",
    category: "CRM Solutions",
    industry: "Professional Services",
    featured: false,
    visual: "crm",
    overview:
      "A customer relationship management platform that keeps every lead, conversation and follow-up in one organised pipeline.",
    challenge:
      "Customer conversations lived in personal inboxes and notebooks. Follow-ups were missed, ownership was unclear and management had no view of the sales pipeline.",
    solution:
      "We built a CRM with a visual pipeline, automated reminders and activity history so every customer relationship has a single owner and a complete record.",
    features: [
      "Visual lead and deal pipeline",
      "Automated follow-up reminders and tasks",
      "Complete activity and communication history",
      "Team ownership and permission controls",
      "Pipeline and activity reporting",
    ],
    technologies: ["React", "Node.js", "PostgreSQL"],
  },
  {
    slug: "3d-ar-virtual-store",
    title: "3D & AR Virtual Store",
    category: "3D & AR Experiences",
    industry: "Retail & E-commerce",
    featured: false,
    visual: "ar",
    overview:
      "An interactive virtual store demonstration where customers explore products in 3D and place them in their own space through augmented reality.",
    challenge:
      "Static product photos could not communicate size, detail or feel. Customers hesitated before buying products they could not properly examine online.",
    solution:
      "We created a browser-based 3D product experience with an augmented reality view, letting customers inspect and place products without installing any app.",
    features: [
      "Interactive 3D product viewer in the browser",
      "Augmented reality placement via device camera",
      "Virtual store walkthrough experience",
      "No app install required (WebGL)",
      "Smooth performance on mobile devices",
    ],
    technologies: ["Three.js", "WebGL", "React", "WebXR"],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = projects.filter((p) => p.featured);
