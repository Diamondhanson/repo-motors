"use client";

import { useState, useEffect } from "react";
import type { Contact } from "@/app/lib/types";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  });

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/contacts", { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(setContacts)
      .catch(() => setError("Failed to load contacts"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div>
        <p className="text-[var(--color-primary)] opacity-80">
          Loading contacts...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--color-primary)]">
        Contacts
      </h1>
      <p className="mt-2 text-[var(--color-primary)] opacity-80">
        Contact form submissions from the website
      </p>

      <div className="mt-8 overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white">
        {contacts.length === 0 ? (
          <p className="p-8 text-center text-[var(--color-primary)] opacity-80">
            No contact submissions yet.
          </p>
        ) : (
          <div className="divide-y divide-[var(--color-border)]">
            {contacts.map((c) => (
              <div
                key={c.id}
                className="p-6"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-bold text-[var(--color-primary)]">
                      {c.name}
                    </p>
                    <a
                      href={`mailto:${c.email}`}
                      className="text-sm text-[var(--color-primary)] opacity-80 hover:underline"
                    >
                      {c.email}
                    </a>
                    {c.phone ? (
                      <a
                        href={`tel:${c.phone.replace(/\s/g, "")}`}
                        className="mt-1 block text-sm text-[var(--color-primary)] opacity-80 hover:underline"
                      >
                        {c.phone}
                      </a>
                    ) : null}
                    <p className="mt-1 text-sm font-medium text-[var(--color-primary)]">
                      {c.subject}
                    </p>
                    <p className="mt-2 whitespace-pre-wrap text-sm text-[var(--color-primary)] opacity-90">
                      {c.message}
                    </p>
                  </div>
                  <p className="text-xs text-[var(--color-primary)] opacity-60 sm:flex-shrink-0">
                    {formatDate(c.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
