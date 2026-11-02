import { NextResponse } from "next/server";
import { services } from "@/lib/services";
import { sendEnquiryNotification, sendSchedulingEmail } from "@/lib/email";
import { calendlyLink } from "@/lib/site";

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  website: string; // honeypot — must stay empty
}

/** In-memory store (replace with a database or email service in production). */
const submissions: ContactPayload[] = [];
const rateLimit = new Map<string, { count: number; resetAt: number }>();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const data = body as Partial<ContactPayload>;
  const name = (data.name || "").trim();
  const email = (data.email || "").trim();
  const phone = (data.phone || "").trim();
  const company = (data.company || "").trim();
  const service = (data.service || "").trim();
  const message = (data.message || "").trim();
  const honeypot = (data.website || "").trim();

  // Spam protection: honeypot must be empty
  if (honeypot) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your full name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid business email.";
  if (phone && !/^[+()\-\s\d]{7,20}$/.test(phone))
    errors.phone = "Please enter a valid phone number.";
  if (!services.some((s) => s.title === service) && service !== "Other")
    errors.service = "Please select the service you need.";
  if (message.length < 20)
    errors.message = "Please describe your project in at least 20 characters.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // Basic rate limit: 5 submissions per 10 minutes per IP
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (entry && entry.resetAt > now) {
    if (entry.count >= 5) {
      return NextResponse.json(
        { ok: false, error: "Too many submissions. Please try again later or use WhatsApp." },
        { status: 429 },
      );
    }
    entry.count += 1;
  } else {
    rateLimit.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 });
  }

  const payload: ContactPayload = { name, email, phone, company, service, message, website: "" };
  submissions.push(payload);
  // Server log so enquiries are visible during development / in host logs.
  console.info("[contact-enquiry]", JSON.stringify(payload));

  // Send the personalised Calendly scheduling link to the visitor and notify
  // the team internally. Both fail gracefully if email isn't configured yet,
  // so the enquiry always succeeds from the user's perspective.
  const enquiry = { name, email, phone, company, service, message };
  const [toUser, toTeam] = await Promise.allSettled([
    sendSchedulingEmail(enquiry),
    sendEnquiryNotification(enquiry),
  ]);

  const schedulingEmailSent =
    toUser.status === "fulfilled" && toUser.value.ok === true;
  if (toUser.status === "rejected") console.error("[contact-email-user]", toUser.reason);
  if (toTeam.status === "rejected") console.error("[contact-email-team]", toTeam.reason);
  if (toTeam.status === "fulfilled" && !toTeam.value.ok && !toTeam.value.skipped)
    console.error("[contact-email-team]", toTeam.value.error);

  return NextResponse.json({
    ok: true,
    schedulingEmailSent,
    calendlyUrl: calendlyLink({ name, email }),
  });
}
