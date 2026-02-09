import { Suspense } from "react";
import { getVehicles } from "@/app/data/inventory";
import { getFilterOptions } from "@/app/lib/services/vehicles";
import { InventoryContent } from "./InventoryContent";

export default async function InventoryPage() {
  const [vehicles, filterOptions] = await Promise.all([
    getVehicles(),
    getFilterOptions(),
  ]);

  return (
    <Suspense
      fallback={
        <main className="flex min-h-[50vh] items-center justify-center">
          <p className="text-[var(--color-primary)] opacity-80">
            Loading inventory...
          </p>
        </main>
      }
    >
      <InventoryContent vehicles={vehicles} filterOptions={filterOptions} />
    </Suspense>
  );
}
