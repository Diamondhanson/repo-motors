import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { AdminNav } from "./AdminNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-background)] lg:flex-row">
      <Toaster position="top-center" />
      <AdminNav />
      <main className="flex-1 p-6 lg:pl-8">{children}</main>
    </div>
  );
}
