import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern use of the Alphabyte website and the basis on which we engage on projects.",
  alternates: { canonical: "/terms" },
};

const sections: { heading: string; body: string[] }[] = [
  {
    heading: "1. About these terms",
    body: [
      "These terms govern your use of the Alphabyte website. By browsing this website or submitting an enquiry, you accept these terms. Project-specific work is governed by a separate written agreement signed before development begins.",
    ],
  },
  {
    heading: "2. Enquiries and proposals",
    body: [
      "Submitting an enquiry does not create a contract. Proposals, estimates and timelines shared before a signed agreement are indicative and based on the information you provide during discovery.",
    ],
  },
  {
    heading: "3. Intellectual property",
    body: [
      "All content on this website — text, design, logo and code samples — is the property of Alphabyte unless stated otherwise. Portfolio case studies present client-approved information only; underlying client systems and data remain the property of their respective owners.",
      "On completed projects, ownership of delivered source code transfers to the client upon full payment, unless the signed agreement states otherwise.",
    ],
  },
  {
    heading: "4. Acceptable use",
    body: [
      "You agree not to misuse this website: no automated scraping at scale, no attempts to disrupt its operation, and no submission of unlawful or malicious content through our forms.",
    ],
  },
  {
    heading: "5. Third-party links and services",
    body: [
      "This website may link to third-party services (for example WhatsApp). We are not responsible for the content or privacy practices of external services.",
    ],
  },
  {
    heading: "6. Limitation of liability",
    body: [
      "This website and its content are provided \"as is\" for general information. To the maximum extent permitted by law, Alphabyte is not liable for decisions made solely on the basis of website content.",
    ],
  },
  {
    heading: "7. Governing law",
    body: [
      "These terms are governed by the laws of the Islamic Republic of Pakistan. Any dispute relating to this website will be subject to the jurisdiction of the courts of Pakistan.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        description="Effective date: 1 November 2026. The short version: this website is for information and enquiries; real work starts with a signed agreement."
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
