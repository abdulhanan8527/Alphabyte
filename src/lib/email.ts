import { Resend } from "resend";
import { calendlyLink, whatsappLink } from "@/lib/site";

/**
 * Transactional email helpers for Alphabyte, powered by Resend.
 *
 * All functions fail gracefully: if RESEND_API_KEY is not configured they
 * return { ok: false, skipped: true } so the contact flow still succeeds and
 * the enquiry is logged server-side. This keeps local/dev builds working
 * before email credentials exist.
 */

export interface SendResult {
  ok: boolean;
  skipped?: boolean;
  error?: string;
}

export interface Enquiry {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

const FROM = process.env.EMAIL_FROM || "Alphabyte <onboarding@resend.dev>";
const ENQUIRY_TO =
  process.env.ENQUIRY_TO_EMAIL || process.env.NEXT_PUBLIC_BUSINESS_EMAIL || FROM;

let client: Resend | null = null;
function getClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!client) client = new Resend(key);
  return client;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const BRAND = "#16851D";
const BURGUNDY = "#A30D50";
const NIGHT = "#0e1011";

/** Shared email chrome so every message looks on-brand and professional. */
function layout(heading: string, body: string, cta?: { label: string; href: string }) {
  const ctaBlock = cta
    ? `<a href="${cta.href}" target="_blank" rel="noopener"
         style="display:inline-block;background:${BRAND};color:#ffffff;text-decoration:none;
                font-family:Poppins,Arial,sans-serif;font-size:15px;font-weight:600;
                padding:14px 30px;border-radius:999px;">${escapeHtml(cta.label)}</a>`
    : "";
  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#f4f5f4;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f4;padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${NIGHT};border-radius:20px;overflow:hidden;font-family:Poppins,Arial,sans-serif;">
        <tr><td style="padding:28px 32px;background:linear-gradient(90deg,${BURGUNDY},${BRAND});">
          <span style="color:#ffffff;font-size:20px;font-weight:700;letter-spacing:-0.02em;">Alphabyte</span>
          <span style="display:block;color:rgba(255,255,255,0.85);font-size:12px;margin-top:2px;">Build. Automate. Grow.</span>
        </td></tr>
        <tr><td style="padding:32px;">
          <h1 style="margin:0 0 16px;color:#ffffff;font-size:22px;font-weight:600;line-height:1.3;">${escapeHtml(heading)}</h1>
          <div style="color:#c7ccd0;font-size:15px;line-height:1.7;">${body}</div>
          ${ctaBlock ? `<div style="margin-top:28px;text-align:center;">${ctaBlock}</div>` : ""}
        </td></tr>
        <tr><td style="padding:20px 32px;border-top:1px solid rgba(255,255,255,0.08);">
          <p style="margin:0;color:#8b9299;font-size:12px;line-height:1.6;">
            You received this email because you contacted Alphabyte.<br/>
            Need help fast? <a href="${whatsappLink()}" style="color:${BRAND};text-decoration:none;">Message us on WhatsApp</a>.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

/**
 * Email sent to the visitor after a successful enquiry, containing their
 * personalised Calendly scheduling link.
 */
export async function sendSchedulingEmail(enquiry: Enquiry): Promise<SendResult> {
  const resend = getClient();
  if (!resend) return { ok: false, skipped: true };

  const bookingUrl = calendlyLink({ name: enquiry.name, email: enquiry.email });
  const firstName = enquiry.name.split(" ")[0] || "there";

  const bookingBody = bookingUrl
    ? `<p style="margin:0 0 16px;">Hi ${escapeHtml(firstName)}, thanks for reaching out about
         <strong style="color:#ffffff;">${escapeHtml(enquiry.service)}</strong>. We've received your
         enquiry and our team will review it shortly.</p>
       <p style="margin:0 0 8px;">To skip the back-and-forth, pick a time that suits you for a free
         discovery call. Choose any open slot and you'll get an instant calendar confirmation:</p>`
    : `<p style="margin:0 0 16px;">Hi ${escapeHtml(firstName)}, thanks for reaching out about
         <strong style="color:#ffffff;">${escapeHtml(enquiry.service)}</strong>. We've received your
         enquiry and our team will get back to you as soon as possible.</p>`;

  const html = layout(
    "Let's schedule your discovery call",
    bookingBody,
    bookingUrl ? { label: "Book a time on Calendly", href: bookingUrl } : undefined,
  );

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: [enquiry.email],
      replyTo: ENQUIRY_TO,
      subject: "Your Alphabyte discovery call — pick a time",
      html,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

/**
 * Internal notification so the Alphabyte team sees every new enquiry in their inbox.
 */
export async function sendEnquiryNotification(enquiry: Enquiry): Promise<SendResult> {
  const resend = getClient();
  if (!resend) return { ok: false, skipped: true };

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:6px 0;color:#8b9299;font-size:13px;width:120px;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:6px 0;color:#ffffff;font-size:14px;vertical-align:top;">${escapeHtml(value || "—")}</td>
    </tr>`;

  const body = `
    <p style="margin:0 0 16px;">A new project enquiry just came in through the website.</p>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
      ${row("Name", enquiry.name)}
      ${row("Email", enquiry.email)}
      ${row("Phone", enquiry.phone)}
      ${row("Company", enquiry.company)}
      ${row("Service", enquiry.service)}
    </table>
    <p style="margin:16px 0 0;color:#8b9299;font-size:13px;">Message</p>
    <p style="margin:6px 0 0;color:#ffffff;font-size:14px;line-height:1.7;">${escapeHtml(enquiry.message)}</p>`;

  const html = layout("New website enquiry", body);

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: [ENQUIRY_TO],
      replyTo: enquiry.email,
      subject: `New enquiry — ${enquiry.service} (${enquiry.name})`,
      html,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}
