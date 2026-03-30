import nodemailer from "nodemailer";
import { supabase } from "@/lib/supabase";
// Gmail config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const data = await req.json(); // dữ liệu từ form
    const { name, email, message } = data;
// lưu booking vào Supabase
const { error } = await supabase
  .from("bookings")
  .insert([
    {
      name,
      email,
      message,
    },
  ]);

if (error) {
  console.error("Supabase error:", error);
  return Response.json({ error: "Database error" }, { status: 500 });
}
    // gửi email
    await transporter.sendMail({
      from: "bookingbyjohnly@gmail.com",
      to: "bookingbyjohnly@gmail.com", // có thể cùng Gmail để nhận
      subject: `New Booking from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });
    // gửi email xác nhận cho khách
await transporter.sendMail({
  from: '"BookingByJohn Logistics" <bookingbyjohnly@gmail.com>',
  to: email,
  subject: "✅ Booking Request Received | BookingByJohn Logistics",

  html: `
  <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333;">
    
    <h2 style="color:#0b5ed7;">Booking Received Successfully ✅</h2>

    <p>Dear <strong>${name}</strong>,</p>

    <p>
      Thank you for contacting <strong>BookingByJohn Logistics</strong>.
      We have successfully received your shipment inquiry.
    </p>

    <p>
      Our logistics specialist will review your request and get back to you
      within <strong>24 hours</strong>.
    </p>

    <hr />

    <h3>Your Submitted Information</h3>

    <p>
      <strong>Name:</strong> ${name}<br/>
      <strong>Email:</strong> ${email}<br/>
      <strong>Message:</strong><br/>
      ${message}
    </p>

    <hr />

    <p>
      If your shipment is urgent, feel free to contact me directly:
    </p>

    <p>
      <strong>John Ly</strong><br/>
      Logistics Specialist<br/>
      📧 bookingbyjohnly@gmail.com<br/>
      📱 WhatsApp: +84 352 193 969<br/>
      🌐 www.bookingbyjohn.com
    </p>

    <br/>

    <p style="color:gray;font-size:13px;">
      This is an automated confirmation email. No reply is required.
    </p>

  </div>
  `,
});

    return Response.json({ status: "success", message: "Booking sent ✅" });
  } catch (error) {
    console.error(error);
    return Response.json({ status: "error", message: "Something went wrong ❌" }, { status: 500 });
  }
}

// Optional: GET để test API
export async function GET() {
  return Response.json({ message: "API send-booking is live ✅" });
}