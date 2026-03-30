import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function BookingByJohnV2() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800">
      {/* Header */}
      <header className="sticky top-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-xl font-bold tracking-wide">Booking by John</h1>
          <nav className="space-x-6 text-sm font-medium">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#routes">Trade Lanes</a>
            <a href="#tracking">Tracking</a>
            <a href="#quote">Get Quote</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="text-center py-24 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-6"
        >
          Your Dedicated Freight Booking Partner
        </motion.h2>
        <p className="max-w-3xl mx-auto text-lg">
          Fast quotation. Transparent pricing. Personal logistics support.
          Built by a real logistics sales professional to simplify global shipping.
        </p>
        <Button className="mt-8">Request Instant Quote</Button>
      </section>

      {/* Trust Logos */}
      <section className="text-center py-10 bg-white">
        <p className="mb-4 font-semibold">Carrier Network Experience</p>
        <div className="flex justify-center gap-8 flex-wrap text-gray-500">
          <span>MSC</span>
          <span>CMA CGM</span>
          <span>ONE</span>
          <span>Hapag-Lloyd</span>
          <span>Maersk</span>
        </div>
      </section>

      {/* About */}
      <section id="about" className="max-w-6xl mx-auto py-16 px-6">
        <h3 className="text-3xl font-semibold mb-6">Who We Are</h3>
        <p className="text-lg leading-relaxed">
          Booking by John is a personal logistics brand created by a sales
          specialist at Ocean Trans. The goal is simple: help shippers and
          importers move cargo faster with direct communication, honest pricing,
          and proactive shipment monitoring.
        </p>
      </section>

      {/* Services */}
      <section id="services" className="bg-blue-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-semibold mb-8">Core Logistics Services</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Ocean Freight FCL/LCL",
              "Air Freight Express",
              "Door to Door Logistics",
              "Customs Clearance",
              "Cargo Consulting",
              "Project Cargo Handling",
            ].map((service, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h4 className="font-semibold text-lg">{service}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trade Lanes */}
      <section id="routes" className="max-w-6xl mx-auto py-16 px-6">
        <h3 className="text-3xl font-semibold mb-8">Major Trade Lanes</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <Card><CardContent className="p-6">Vietnam → Europe</CardContent></Card>
          <Card><CardContent className="p-6">Vietnam → USA</CardContent></Card>
          <Card><CardContent className="p-6">Vietnam → Mexico & LATAM</CardContent></Card>
        </div>
      </section>

      {/* Tracking Demo */}
      <section id="tracking" className="bg-blue-50 py-16 px-6">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-6">Shipment Tracking</h3>
          <input
            className="border p-3 rounded-xl w-full mb-4"
            placeholder="Enter Container / BL Number"
          />
          <Button>Track Shipment</Button>
        </div>
      </section>

      {/* Quote Lead Machine */}
      <section id="quote" className="max-w-4xl mx-auto py-16 px-6">
        <h3 className="text-3xl font-semibold mb-6 text-center">Get Freight Quote in 30 Minutes</h3>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="grid gap-4">
            <input className="border p-3 rounded-xl" placeholder="Company Name" required />
            <input className="border p-3 rounded-xl" placeholder="Email" required />
            <input className="border p-3 rounded-xl" placeholder="POL - POD" required />
            <input className="border p-3 rounded-xl" placeholder="Commodity" />
            <textarea className="border p-3 rounded-xl" placeholder="Shipment Details" />
            <Button type="submit">Submit RFQ</Button>
          </form>
        ) : (
          <div className="text-center text-green-600 font-semibold">
            Thank you! Your request has been received. John will contact you shortly.
          </div>
        )}
      </section>

      {/* Why Choose */}
      <section className="bg-gray-100 py-16 px-6 text-center">
        <h3 className="text-3xl font-semibold mb-6">Why Customers Choose Booking by John</h3>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card><CardContent className="p-6">Response within 30 minutes</CardContent></Card>
          <Card><CardContent className="p-6">Direct Sales Communication</CardContent></Card>
          <Card><CardContent className="p-6">Global Logistics Expertise</CardContent></Card>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 px-6 text-center">
        <h3 className="text-3xl font-semibold mb-6">Contact</h3>
        <p>Name: Mr. John</p>
        <p>Contact: +84 352193969</p>
        <p>Email: BookingbyJohnly@gmail.com</p>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Booking by John | Global Freight Booking Platform
      </footer>
    </div>
  );
}
