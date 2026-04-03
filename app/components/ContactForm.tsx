"use client";

import { useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface ContactFormProps {
  searchParams: Promise<{ type?: string; stockId?: string; vehicle?: string }>;
}

export function ContactForm({ searchParams }: ContactFormProps) {
  const [params, setParams] = useState<{
    type?: string;
    stockId?: string;
    vehicle?: string;
  }>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [phone, setPhone] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    searchParams.then(setParams);
  }, [searchParams]);

  useEffect(() => {
    const type = params.type;
    const stockId = params.stockId;
    const vehicle = params.vehicle;

    if (type === "interest" && vehicle) {
      setFormData((prev) => ({
        ...prev,
        subject: `Interest: ${vehicle}`,
        message: stockId
          ? `I'm interested in the vehicle:\n${vehicle}\nStock ID: ${stockId}\n\nPlease contact me to discuss next steps.`
          : `I'm interested in the vehicle:\n${vehicle}\n\nPlease contact me to discuss next steps.`,
      }));
    } else if (type === "inspection") {
      setFormData((prev) => ({
        ...prev,
        subject: vehicle ? `Book Inspection: ${vehicle}` : "Book Vehicle Inspection",
        message: vehicle
          ? (stockId
            ? `I would like to book a physical inspection for:\n${vehicle}\nStock ID: ${stockId}\n\nPlease provide available dates and location.`
            : `I would like to book a physical inspection for:\n${vehicle}\n\nPlease provide available dates and location.`)
          : "I would like to book a physical inspection.\n\nPlease provide available dates and vehicle options.",
      }));
    }
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "Contact from Repo Motors",
          message: formData.message,
          phone: phone || undefined,
          vehicle: params.vehicle,
          stockId: params.stockId,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        const msg = data.error || "Failed to send message";
        setErrorMessage(msg);
        throw new Error(msg);
      }
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setPhone(undefined);
    } catch (err) {
      setStatus("error");
      console.error(err);
    }
  };

  return (
    <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-6">
      <h2 className="text-xl font-bold text-[var(--color-primary)]">
        Send a Message
      </h2>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-1 block text-sm font-medium text-[var(--color-primary)]"
          >
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white px-4 py-2 text-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            placeholder="Your name"
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="mb-1 block text-sm font-medium text-[var(--color-primary)]"
          >
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            className="w-full rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white px-4 py-2 text-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label
            htmlFor="contact-phone"
            className="mb-1 block text-sm font-medium text-[var(--color-primary)]"
          >
            Phone <span className="font-normal opacity-70">(optional)</span>
          </label>
          <PhoneInput
            international
            defaultCountry="US"
            limitMaxLength
            value={phone}
            onChange={(value) => setPhone(value)}
            numberInputProps={{
              id: "contact-phone",
              autoComplete: "tel",
              placeholder: "Phone number",
            }}
          />
        </div>
        <div>
          <label
            htmlFor="contact-subject"
            className="mb-1 block text-sm font-medium text-[var(--color-primary)]"
          >
            Subject
          </label>
          <input
            id="contact-subject"
            type="text"
            value={formData.subject}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, subject: e.target.value }))
            }
            className="w-full rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white px-4 py-2 text-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            placeholder="e.g. Interest in 2019 Toyota Camry"
          />
        </div>
        <div>
          <label
            htmlFor="contact-message"
            className="mb-1 block text-sm font-medium text-[var(--color-primary)]"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            rows={5}
            required
            value={formData.message}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, message: e.target.value }))
            }
            className="w-full rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white px-4 py-2 text-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            placeholder="Tell us about the vehicle you're interested in or your enquiry..."
          />
        </div>
        {status === "success" && (
          <p className="rounded-[var(--radius-button)] bg-green-100 p-3 text-sm text-green-800">
            Message sent successfully. We&apos;ll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="rounded-[var(--radius-button)] bg-red-100 p-3 text-sm text-red-800">
            {errorMessage ||
              "Failed to send message. Please try again or email us directly."}
          </p>
        )}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-[var(--radius-button)] bg-[var(--color-primary)] px-4 py-3 text-base font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-70"
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
