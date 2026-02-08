import Link from "next/link";
import { notFound } from "next/navigation";
import { getVehicleBySlug } from "@/app/lib/services/vehicles";
import { ProductForm } from "../../ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);

  if (!vehicle) notFound();

  return (
    <div>
      <Link
        href="/admin/products"
        className="mb-6 inline-block text-sm font-medium text-[var(--color-primary)] hover:opacity-80"
      >
        ← Back to Products
      </Link>
      <h1 className="text-2xl font-bold text-[var(--color-primary)]">
        Edit {vehicle.year} {vehicle.make} {vehicle.model}
      </h1>
      <p className="mt-2 text-[var(--color-primary)] opacity-80">
        Stock ID: {vehicle.stockId}
      </p>
      <div className="mt-8">
        <ProductForm initial={vehicle} slug={slug} mode="edit" />
      </div>
    </div>
  );
}
