import { NextResponse } from "next/server";
import { createContact } from "@/app/lib/services/contacts";
import { Resend } from "resend";
import { ContactNotificationEmail } from "@/app/lib/email-templates/contact-notification";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, vehicle, stockId } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Save to database
    const contact = await createContact({
      name: String(name).trim(),
      email: String(email).trim(),
      subject: String(subject || "Contact from Repo Motors").trim(),
      message: String(message).trim(),
    });

    // Send email notification via Resend
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "Repo Motors <onboarding@resend.dev>",
        to: process.env.RESEND_TO_EMAIL || "barnessvene@gmail.com",
        subject: `New Contact: ${subject || "General Inquiry"}`,
        react: ContactNotificationEmail({
          name: String(name).trim(),
          email: String(email).trim(),
          subject: String(subject || "Contact from Repo Motors").trim(),
          message: String(message).trim(),
          vehicle,
          stockId,
        }),
      });
    } catch (emailError: unknown) {
      // Log error but don't fail the request - contact is still saved to database
      const err = emailError as { message?: string; statusCode?: number };
      console.error("[Resend] Failed to send contact email:", {
        message: err?.message,
        statusCode: err?.statusCode,
        error: emailError,
      });
    }

    return NextResponse.json({ success: true, id: contact.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to submit contact" },
      { status: 500 }
    );
  }
}
