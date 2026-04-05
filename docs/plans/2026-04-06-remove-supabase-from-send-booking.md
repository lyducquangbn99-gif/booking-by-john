# Remove Supabase from send-booking Route Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remove Supabase dependency from the `/api/send-booking` route so the build succeeds on Vercel without any Supabase environment variables.

**Architecture:** Delete the Supabase insert call and its import from the route. The route will only send two emails (admin notification + customer confirmation). The Supabase lib file is left untouched for future use.

**Tech Stack:** Next.js App Router API route, Nodemailer, Gmail SMTP

---

### Task 1: Remove Supabase from the send-booking route

**Files:**
- Modify: `app/api/send-booking/route.ts`

**Step 1: Remove the supabase import and insert block**

Replace the current file contents with the following (removes line 3 import and lines 21–38 insert block):

```ts
// app/api/send-booking/route.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      mode, origin, destination, weightRange, cargoType,
      urgency, name, email, phone, company, notes,
    } = data;

    // Admin notification
    await transporter.sendMail({
      from: '"Booking by John" <bookingbyjohnly@gmail.com>',
      to: "bookingbyjohnly@gmail.com",
      subject: `New Freight Request from ${name} — ${mode}`,
      html: `
        <div style="font-family:monospace;background:#0C0F12;color:#F0F2F5;padding:32px;border-radius:8px;">
          <h2 style="color:#00E87B;margin-bottom:24px;">New Freight Request</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#8A93A6;width:140px;">Mode</td><td>${mode}</td></tr>
            <tr><td style="padding:8px 0;color:#8A93A6;">Origin</td><td>${origin || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#8A93A6;">Destination</td><td>${destination || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#8A93A6;">Weight</td><td>${weightRange || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#8A93A6;">Cargo Type</td><td>${cargoType || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#8A93A6;">Urgency</td><td>${urgency || "—"}</td></tr>
            <tr><td colspan="2" style="border-top:1px solid #1A1F28;padding:12px 0 0;"></td></tr>
            <tr><td style="padding:8px 0;color:#8A93A6;">Name</td><td>${name}</td></tr>
            <tr><td style="padding:8px 0;color:#8A93A6;">Email</td><td>${email || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#8A93A6;">Phone</td><td>${phone || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#8A93A6;">Company</td><td>${company || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#8A93A6;">Notes</td><td>${notes || "—"}</td></tr>
          </table>
        </div>
      `,
    });

    // Customer confirmation — only if email provided
    if (email) {
      await transporter.sendMail({
        from: '"Booking by John" <bookingbyjohnly@gmail.com>',
        to: email,
        subject: "Request received — John's on it.",
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.6;color:#333;max-width:560px;margin:0 auto;">
            <h2 style="color:#00E87B;">Request received ✅</h2>
            <p>Hi <strong>${name}</strong>,</p>
            <p>Your freight inquiry has been received. Expect a personal follow-up from Mr. John within <strong>2 hours</strong> during business hours.</p>
            <p>For urgent requests, call directly: <strong>+84 352 193 969</strong></p>
            <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
            <p style="color:#666;font-size:13px;">Booking by John · BookingbyJohnly@gmail.com</p>
          </div>
        `,
      });
    }

    return Response.json({ status: "success" });
  } catch (err) {
    console.error(err);
    return Response.json({ status: "error", message: "Something went wrong" }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ message: "API send-booking is live ✅" });
}
```

**Step 2: Verify build passes locally**

```bash
npm run build
```

Expected: no `supabaseUrl is required` error, build completes successfully.

**Step 3: Commit**

```bash
git add app/api/send-booking/route.ts
git commit -m "feat: remove supabase from send-booking route, email-only for now"
```

---

### Task 2: Add required env vars to Vercel

**This is a manual step in the Vercel dashboard.**

Go to: Vercel project → **Settings → Environment Variables**

Add:

| Variable | Value |
|---|---|
| `GMAIL_USER` | `bookingbyjohnly@gmail.com` |
| `GMAIL_PASS` | Gmail app password (not your account password — generate at myaccount.google.com → Security → App passwords) |

Then redeploy.

---

### Notes for future Supabase re-integration

When ready to save bookings to Supabase, add back:
1. `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to Vercel env vars
2. Re-import `supabase` from `@/lib/supabase` in the route
3. Add the insert block before the email sends
