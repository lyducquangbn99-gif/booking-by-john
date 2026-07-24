import nodemailer from "nodemailer";

const MAX_BODY_BYTES = 16_384;
const MIN_FORM_TIME_MS = 1_500;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const ALLOWED_LOCALES = new Set(["en", "es", "vi", "it", "id"]);
const ALLOWED_MODES = new Set([
  "FTL",
  "LTL",
  "Drayage",
  "Intermodal",
  "Expedited",
  "Courier",
  "Ocean Freight",
  "Other",
  "Unspecified",
]);

type RateEntry = { count: number; resetAt: number };
const rateStore = new Map<string, RateEntry>();

const customerStrings: Record<
  string,
  { subject: string; greeting: string; body: string; urgentLabel: string }
> = {
  en: {
    subject: "Request received — John's on it.",
    greeting: "Hi",
    body: "Your freight inquiry has been received. Expect a personal follow-up from Mr. John within <strong>2 hours</strong> during business hours.",
    urgentLabel: "For urgent requests, call directly:",
  },
  es: {
    subject: "Solicitud recibida — John está en ello.",
    greeting: "Hola",
    body: "Su consulta de carga ha sido recibida. Espere una respuesta personal de Mr. John dentro de <strong>2 horas</strong> durante el horario laboral.",
    urgentLabel: "Para solicitudes urgentes, llame directamente:",
  },
  vi: {
    subject: "Yêu cầu đã nhận — John đang xử lý.",
    greeting: "Xin chào",
    body: "Yêu cầu vận chuyển của bạn đã được nhận. Mr. John sẽ liên hệ cá nhân với bạn trong vòng <strong>2 giờ</strong> trong giờ làm việc.",
    urgentLabel: "Đối với các yêu cầu khẩn cấp, gọi trực tiếp:",
  },
  it: {
    subject: "Richiesta ricevuta — John ci pensa.",
    greeting: "Salve",
    body: "La tua richiesta di spedizione è stata ricevuta. Aspetta una risposta personale da Mr. John entro <strong>2 ore</strong> durante l'orario lavorativo.",
    urgentLabel: "Per richieste urgenti, chiama direttamente:",
  },
  id: {
    subject: "Permintaan diterima — John sedang menanganinya.",
    greeting: "Halo",
    body: "Permintaan pengiriman Anda telah diterima. Tunggu tindak lanjut pribadi dari Mr. John dalam <strong>2 jam</strong> selama jam kerja.",
    urgentLabel: "Untuk permintaan mendesak, hubungi langsung:",
  },
};

const PHONE = "+84 352 193 969";

function getClientIp(req: Request) {
  return (
    req.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = rateStore.get(key);

  if (!current || current.resetAt <= now) {
    rateStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX;
}

function text(value: unknown, maxLength: number) {
  return typeof value === "string"
    ? value.replace(/\0/g, "").trim().slice(0, maxLength)
    : "";
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character]!,
  );
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value) && value.length <= 254;
}

export async function POST(req: Request) {
  try {
    if (!req.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
      return Response.json({ status: "error", message: "Invalid content type" }, { status: 415 });
    }

    const declaredLength = Number(req.headers.get("content-length") || 0);
    if (declaredLength > MAX_BODY_BYTES) {
      return Response.json({ status: "error", message: "Request too large" }, { status: 413 });
    }

    const rawBody = await req.text();
    if (new TextEncoder().encode(rawBody).length > MAX_BODY_BYTES) {
      return Response.json({ status: "error", message: "Request too large" }, { status: 413 });
    }

    let data: Record<string, unknown>;
    try {
      data = JSON.parse(rawBody) as Record<string, unknown>;
    } catch {
      return Response.json({ status: "error", message: "Invalid request" }, { status: 400 });
    }

    if (text(data.website, 200)) {
      return Response.json({ status: "success" });
    }

    const formStartedAt =
      typeof data.formStartedAt === "number" && Number.isFinite(data.formStartedAt)
        ? data.formStartedAt
        : 0;
    if (formStartedAt <= 0 || Date.now() - formStartedAt < MIN_FORM_TIME_MS) {
      return Response.json({ status: "error", message: "Please try again" }, { status: 400 });
    }

    if (isRateLimited(getClientIp(req))) {
      return Response.json(
        { status: "error", message: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": "600" } },
      );
    }

    const mode = text(data.mode, 40);
    const origin = text(data.origin, 120);
    const destination = text(data.destination, 120);
    const weightRange = text(data.weightRange, 80);
    const cargoType = text(data.cargoType, 80);
    const urgency = text(data.urgency, 40);
    const name = text(data.name, 120);
    const email = text(data.email, 254).toLowerCase();
    const phone = text(data.phone, 50);
    const company = text(data.company, 160);
    const notes = text(data.notes, 2_000);
    const localeInput = text(data.locale, 5);
    const locale = ALLOWED_LOCALES.has(localeInput) ? localeInput : "en";

    if (!name || (!email && !phone) || !ALLOWED_MODES.has(mode)) {
      return Response.json({ status: "error", message: "Missing required fields" }, { status: 400 });
    }
    if (email && !isValidEmail(email)) {
      return Response.json({ status: "error", message: "Invalid email address" }, { status: 400 });
    }
    if (!origin && !destination) {
      return Response.json({ status: "error", message: "Origin or destination is required" }, { status: 400 });
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_PASS;
    if (!gmailUser || !gmailPass) {
      console.error("Booking email environment variables are not configured.");
      return Response.json({ status: "error", message: "Service unavailable" }, { status: 503 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailPass },
      disableFileAccess: true,
      disableUrlAccess: true,
    });
    const strings = customerStrings[locale];
    const safe = Object.fromEntries(
      Object.entries({
        mode,
        origin: origin || "—",
        destination: destination || "—",
        weightRange: weightRange || "—",
        cargoType: cargoType || "—",
        urgency: urgency || "—",
        name,
        email: email || "—",
        phone: phone || "—",
        company: company || "—",
        notes: notes || "—",
        locale,
      }).map(([key, value]) => [key, escapeHtml(value)]),
    );

    await transporter.sendMail({
      from: `"Booking by John" <${gmailUser}>`,
      to: gmailUser,
      subject: `New Freight Request from ${name.replace(/[\r\n]/g, " ")} — ${mode}`,
      html: `
        <div style="font-family:Arial,sans-serif;color:#172033;max-width:680px;margin:0 auto;">
          <h2 style="color:#0B6E4F;">New Freight Request</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;width:150px;"><strong>Mode</strong></td><td>${safe.mode}</td></tr>
            <tr><td style="padding:8px 0;"><strong>Origin</strong></td><td>${safe.origin}</td></tr>
            <tr><td style="padding:8px 0;"><strong>Destination</strong></td><td>${safe.destination}</td></tr>
            <tr><td style="padding:8px 0;"><strong>Weight</strong></td><td>${safe.weightRange}</td></tr>
            <tr><td style="padding:8px 0;"><strong>Cargo Type</strong></td><td>${safe.cargoType}</td></tr>
            <tr><td style="padding:8px 0;"><strong>Urgency</strong></td><td>${safe.urgency}</td></tr>
            <tr><td style="padding:8px 0;"><strong>Name</strong></td><td>${safe.name}</td></tr>
            <tr><td style="padding:8px 0;"><strong>Email</strong></td><td>${safe.email}</td></tr>
            <tr><td style="padding:8px 0;"><strong>Phone</strong></td><td>${safe.phone}</td></tr>
            <tr><td style="padding:8px 0;"><strong>Company</strong></td><td>${safe.company}</td></tr>
            <tr><td style="padding:8px 0;"><strong>Notes</strong></td><td>${safe.notes}</td></tr>
            <tr><td style="padding:8px 0;"><strong>Locale</strong></td><td>${safe.locale}</td></tr>
          </table>
        </div>
      `,
    });

    if (email) {
      await transporter.sendMail({
        from: `"Booking by John" <${gmailUser}>`,
        to: email,
        subject: strings.subject,
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.6;color:#333;max-width:560px;margin:0 auto;">
            <h2 style="color:#0B6E4F;">Request received</h2>
            <p>${strings.greeting} <strong>${safe.name}</strong>,</p>
            <p>${strings.body}</p>
            <p>${strings.urgentLabel} <strong>${PHONE}</strong></p>
            <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
            <p style="color:#666;font-size:13px;">Booking by John · BookingbyJohnly@gmail.com</p>
          </div>
        `,
      });
    }

    return Response.json({ status: "success" });
  } catch (error) {
    console.error("Booking request failed:", error);
    return Response.json({ status: "error", message: "Something went wrong" }, { status: 500 });
  }
}
