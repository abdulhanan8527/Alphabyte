export interface PostSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface Post {
  slug: string;
  title: string;
  category: string;
  date: string; // ISO date
  readTime: string;
  excerpt: string;
  sections: PostSection[];
}

export const posts: Post[] = [
  {
    slug: "business-automation-where-to-start",
    title: "Business Automation: Where to Start Without Disrupting Everything",
    category: "Business Automation",
    date: "2026-09-14",
    readTime: "6 min read",
    excerpt:
      "Automation does not have to mean replacing your whole operation. Here is a practical way to find the first workflows worth automating.",
    sections: [
      {
        heading: "Start with the work nobody enjoys",
        paragraphs: [
          "Most businesses already know where their time disappears. It is the invoice that gets typed twice, the stock count written on paper then re-typed into a spreadsheet, the follow-up message copied from one chat into another. These repetitive tasks are the best first candidates for automation because they are frequent, rule-based and error-prone.",
          "The goal of a first automation project is not to transform the company overnight. It is to remove one painful, repeated task and prove that the approach works.",
        ],
      },
      {
        heading: "Map the workflow before automating it",
        paragraphs: [
          "Automation amplifies whatever process it is applied to. If the current process is confusing, automating it will produce confusion faster. Before writing any software, write down the workflow as it actually happens: who starts it, what triggers each step, what can go wrong and who approves the result.",
        ],
        bullets: [
          "Trigger: what event starts the workflow?",
          "Steps: what happens, in order, and by whom?",
          "Exceptions: what happens when something is unusual?",
          "Output: what record or message should exist at the end?",
        ],
      },
      {
        heading: "Automate one workflow end to end",
        paragraphs: [
          "A single workflow automated completely is worth more than five workflows automated halfway. Choose one, build it properly, and let the team live with it for a few weeks. The lessons from that first workflow shape everything that follows.",
          "This is also the point where a CRM or ERP system usually earns its place: once several workflows are automated, they need a shared home for data instead of separate tools that do not talk to each other.",
        ],
      },
      {
        heading: "Measure the change honestly",
        paragraphs: [
          "After the automation is live, compare against the old way: how long does the task take now, how often does it need rework, and who is responsible when something goes wrong? Honest measurement keeps automation accountable to the business rather than to technology for its own sake.",
        ],
      },
    ],
  },
  {
    slug: "erp-or-spreadsheets",
    title: "ERP or Spreadsheets? Five Signals It Is Time to Upgrade",
    category: "ERP",
    date: "2026-08-25",
    readTime: "5 min read",
    excerpt:
      "Spreadsheets are a perfectly good starting point. They become a liability at a predictable point — here is how to recognise it.",
    sections: [
      {
        heading: "Spreadsheets are not the enemy",
        paragraphs: [
          "Every serious business system we have replaced started as a spreadsheet, and that was the right choice at the time. Spreadsheets are flexible, familiar and free. The problem is not the tool; it is the moment when the business outgrows it.",
        ],
      },
      {
        heading: "Signal 1: The same number exists in several files",
        paragraphs: [
          "When stock levels live in one file, sales in another and finance in a third, every report becomes an argument about which version is correct. An ERP exists primarily to make each fact live in exactly one place.",
        ],
      },
      {
        heading: "Signal 2: One person is a single point of failure",
        paragraphs: [
          "If only one colleague understands the master spreadsheet — its hidden tabs, its macros, its conventions — the business carries an unmanaged risk. Systems with roles, permissions and audit trails remove that dependency.",
        ],
      },
      {
        heading: "Signal 3: Entries are re-typed between departments",
        paragraphs: [
          "Every manual re-entry is a chance for an error and a tax on someone's day. When sales orders are re-typed into inventory and again into invoicing, the workflow is asking to be connected.",
        ],
      },
      {
        heading: "Signal 4 and 5: Growth breaks the old way",
        paragraphs: [
          "Two more signals appear together: reporting takes days instead of minutes, and approval chains (discounts, purchases, credit) are enforced by habit rather than by the system. Both are signs that the business now needs structure, not more tabs.",
          "Upgrading to an ERP is not a rejection of the spreadsheet era. It is the natural next step when the business has proven its processes and is ready to run them with discipline.",
        ],
      },
    ],
  },
  {
    slug: "what-a-crm-actually-does",
    title: "What a CRM Actually Does for a Small Team",
    category: "CRM",
    date: "2026-08-03",
    readTime: "4 min read",
    excerpt:
      "A CRM is often described in buzzwords. In practice it answers four simple questions about every customer conversation.",
    sections: [
      {
        heading: "Four questions a CRM answers",
        paragraphs: [
          "Strip away the marketing and a CRM is a system for answering four questions at any moment: who are we talking to, what was last agreed, who on our side owns the next step, and when is that step due?",
        ],
        bullets: [
          "Who is the customer and what is their history with us?",
          "What happened in the last conversation?",
          "Who owns the next action?",
          "When is it due, and what happens if it is missed?",
        ],
      },
      {
        heading: "The real cost of missed follow-ups",
        paragraphs: [
          "Small teams rarely lose deals to competitors outright; they lose them to silence. A prospect asks for a quote, the week gets busy, and the conversation cools. Automated reminders and a visible pipeline turn follow-up from a memory task into a system task.",
        ],
      },
      {
        heading: "Ownership instead of inbox-dependence",
        paragraphs: [
          "When customer conversations live in personal inboxes, they leave the company when the person does. A CRM makes the relationship an asset of the business: complete history, clear owner, smooth handover.",
        ],
      },
      {
        heading: "Start small, but start structured",
        paragraphs: [
          "A small team does not need every CRM feature on day one. It needs a clean pipeline, complete contact records and reliable reminders. Everything else — automation, reporting, integrations — builds on that foundation once the habit is established.",
        ],
      },
    ],
  },
  {
    slug: "mobile-app-or-responsive-website-first",
    title: "Mobile App or Responsive Website: Which Should Come First?",
    category: "Mobile Development",
    date: "2026-07-12",
    readTime: "5 min read",
    excerpt:
      "The honest answer depends on what your customers need repeatedly. A simple decision framework for founders and managers.",
    sections: [
      {
        heading: "The website is the foundation",
        paragraphs: [
          "A responsive website is the minimum viable presence for any serious business: it is discoverable through search, shareable through a link, and it works on every device without installation. If you do not yet have a fast, mobile-friendly website, that is the first project.",
        ],
      },
      {
        heading: "When an app earns its place",
        paragraphs: [
          "Apps win when the relationship is repeated and personal. Notifications, offline access, device features and one-tap return make sense when customers interact with you weekly or daily — bookings, therapy plans, loyalty, field work.",
        ],
        bullets: [
          "Customers return frequently, not once a year",
          "You need push notifications or offline mode",
          "The experience benefits from camera, sensors or device storage",
          "The workflow is personal and ongoing (care, progress, subscriptions)",
        ],
      },
      {
        heading: "When an app is the wrong first step",
        paragraphs: [
          "If most traffic is one-off research before a purchase, an app adds friction: a download, an install, an update. A well-built responsive website with a smooth enquiry flow converts better in that case.",
        ],
      },
      {
        heading: "Design once, choose the shell later",
        paragraphs: [
          "The good news is that the decision is not irreversible. With a mobile-first design and a modern cross-platform stack, the same product thinking can serve the web first and ship as an app when the audience is ready.",
        ],
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
