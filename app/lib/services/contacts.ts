import { supabaseServer } from "../supabase/server";
import type { Contact } from "../types";

// Transform snake_case database fields to camelCase TypeScript
function dbToContact(dbRow: any): Contact {
  return {
    id: dbRow.id,
    name: dbRow.name,
    email: dbRow.email,
    subject: dbRow.subject,
    message: dbRow.message,
    createdAt: dbRow.created_at,
  };
}

export async function getContacts(): Promise<Contact[]> {
  const { data, error } = await supabaseServer
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching contacts:", error);
    throw new Error("Failed to fetch contacts");
  }

  return data ? data.map(dbToContact) : [];
}

export async function createContact(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<Contact> {
  const { data: inserted, error } = await supabaseServer
    .from("contacts")
    .insert({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating contact:", error);
    throw new Error("Failed to create contact");
  }

  return dbToContact(inserted);
}
