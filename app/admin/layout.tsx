import Link from "next/link";
import { AdminNav } from "./AdminNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-background)] lg:flex-row">
      <AdminNav />
      <main className="flex-1 p-6 lg:pl-0">{children}</main>
    </div>
  );
}
