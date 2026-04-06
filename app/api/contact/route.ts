import { NextResponse } from "next/server";
import { isValidPhoneNumber } from "libphonenumber-js/min";
import { createContact } from "@/app/lib/services/contacts";
import { Resend } from "resend";
import { ContactNotificationEmail } from "@/app/lib/email-templates/contact-notification";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, vehicle, stockId, phone: phoneRaw } =
      body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    let phone: string | null = null;
    if (phoneRaw != null && String(phoneRaw).trim() !== "") {
      const trimmed = String(phoneRaw).trim();
      if (!isValidPhoneNumber(trimmed)) {
        return NextResponse.json(
          { error: "Invalid phone number" },
          { status: 400 }
        );
      }
      phone = trimmed;
    }

    // Save to database
    const contact = await createContact({
      name: String(name).trim(),
      email: String(email).trim(),
      subject: String(subject || "Contact from Repo Motors").trim(),
      message: String(message).trim(),
      phone,
    });

    // Send email notification via Resend (SDK returns { data, error }; it does not throw on API errors)
    let emailSent = false;
    try {
      if (!process.env.RESEND_API_KEY?.trim()) {
        console.error(
          "[Resend] RESEND_API_KEY is missing; set it in the deployment environment."
        );
      } else {
        const { data: emailData, error: emailError } = await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "Repo Motors <onboarding@resend.dev>",
          to: process.env.RESEND_TO_EMAIL || "barnessvene@gmail.com",
          subject: `New Contact: ${subject || "General Inquiry"}`,
          react: ContactNotificationEmail({
            name: String(name).trim(),
            email: String(email).trim(),
            subject: String(subject || "Contact from Repo Motors").trim(),
            message: String(message).trim(),
            phone,
            vehicle,
            stockId,
          }),
        });
        if (emailError) {
          console.error("[Resend] Failed to send contact email:", emailError);
        } else {
          emailSent = true;
          console.info("[Resend] Contact notification sent:", emailData?.id);
        }
      }
    } catch (emailError: unknown) {
      const err = emailError as { message?: string; statusCode?: number };
      console.error("[Resend] Exception while sending contact email:", {
        message: err?.message,
        statusCode: err?.statusCode,
        error: emailError,
      });
    }

    return NextResponse.json({
      success: true,
      id: contact.id,
      emailSent,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to submit contact" },
      { status: 500 }
    );
  }
}
