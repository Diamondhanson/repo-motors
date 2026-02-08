import Link from "next/link";
import { getVehicles } from "@/app/lib/services/vehicles";
import { getContacts } from "@/app/lib/services/contacts";

export default async function AdminDashboardPage() {
  const [vehicles, contacts] = await Promise.all([
    getVehicles(),
    getContacts(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--color-primary)]">
        Dashboard
      </h1>
      <p className="mt-2 text-[var(--color-primary)] opacity-80">
        Overview of your inventory and enquiries
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/admin/products"
          className="block rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-6 transition-shadow hover:shadow-md"
        >
          <h2 className="text-lg font-bold text-[var(--color-primary)]">
            Products
          </h2>
          <p className="mt-2 text-3xl font-bold text-[var(--color-primary)]">
            {vehicles.length}
          </p>
          <p className="mt-1 text-sm text-[var(--color-primary)] opacity-80">
            Vehicles in inventory
          </p>
        </Link>
        <Link
          href="/admin/contacts"
          className="block rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-6 transition-shadow hover:shadow-md"
        >
          <h2 className="text-lg font-bold text-[var(--color-primary)]">
            Contacts
          </h2>
          <p className="mt-2 text-3xl font-bold text-[var(--color-primary)]">
            {contacts.length}
          </p>
          <p className="mt-1 text-sm text-[var(--color-primary)] opacity-80">
            Contact submissions
          </p>
        </Link>
      </div>
    </div>
  );
}
