"use client";

import { useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    setStatus("Sending...");

    const res = await fetch("/api/send-booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.status === "success") {
      setStatus("✅ Booking sent!");
      e.target.reset();
    } else {
      setStatus("❌ Failed to send");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-[400px]"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Booking By John
        </h1>

        <input
          name="name"
          placeholder="Your Name"
          className="w-full border p-3 mb-4"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Your Email"
          className="w-full border p-3 mb-4"
          required
        />

        <textarea
          name="message"
          placeholder="Booking Details"
          className="w-full border p-3 mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded"
        >
          Send Booking
        </button>

        <p className="mt-4 text-center">{status}</p>
      </form>
    </main>
  );
}