import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Alphabyte collects, uses and protects the information you share with us through this website.",
  alternates: { canonical: "/privacy-policy" },
};

const sections: { heading: string; body: string[] }[] = [
  {
    heading: "1. Information we collect",
    body: [
      "When you submit our contact or project enquiry form, we collect the details you provide: your name, business email address, phone number, optional company name, the service you are interested in and your project description.",
      "We also collect standard technical information such as pages visited and device type through analytics tools, in aggregated form, to understand how the website performs.",
    ],
  },
  {
    heading: "2. How we use your information",
    body: [
      "Enquiry details are used solely to respond to your request, discuss your project and provide a proposal. We do not sell, rent or trade your personal information to third parties.",
      "Analytics data is used to improve the website's content, speed and usability.",
    ],
  },
  {
    heading: "3. Data storage and protection",
    body: [
      "Enquiry submissions are stored securely and accessible only to the Alphabyte team members who handle client communication. We apply reasonable technical and organisational measures to protect your data against unauthorised access.",
    ],
  },
  {
    heading: "4. Cookies and analytics",
    body: [
      "This website may use privacy-friendly analytics cookies to measure traffic and performance. No advertising or cross-site tracking cookies are used.",
    ],
  },
  {
    heading: "5. Your rights",
    body: [
      "You may request access to, correction of, or deletion of the personal information you have submitted through this website at any time by contacting us through the enquiry form or WhatsApp. We will action valid requests without undue delay.",
    ],
  },
  {
    heading: "6. Children's privacy",
    body: [
      "Our services are not directed to children, and we do not knowingly collect personal information from children. Projects in sensitive sectors such as healthcare are handled with strict confidentiality and data-minimisation practices.",
    ],
  },
  {
    heading: "7. Changes to this policy",
    body: [
      "We may update this Privacy Policy as our services evolve. The current version is always published on this page with its effective date.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="Effective date: 1 November 2026. Plain-language summary: we collect only what you send us, use it only to answer you, and never sell it."
      />
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="space-y-9">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-xl font-semibold text-white">{s.heading}</h2>
              {s.body.map((p) => (
                <p key={p.slice(0, 32)} className="mt-3 text-base leading-relaxed text-mist">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
