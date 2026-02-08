import Link from "next/link";
import { ProductForm } from "../ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <Link
        href="/admin/products"
        className="mb-6 inline-block text-sm font-medium text-[var(--color-primary)] hover:opacity-80"
      >
        ← Back to Products
      </Link>
      <h1 className="text-2xl font-bold text-[var(--color-primary)]">
        Add Vehicle
      </h1>
      <p className="mt-2 text-[var(--color-primary)] opacity-80">
        Enter vehicle details. Slug will be auto-suggested from make, model, and year.
      </p>
      <div className="mt-8">
        <ProductForm mode="create" />
      </div>
    </div>
  );
}
