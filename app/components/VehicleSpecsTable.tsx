import type { InventoryVehicle } from "../data/inventory";

const formatMileage = (km: number) => `${(km / 1000).toFixed(0)}k km`;

interface VehicleSpecsTableProps {
  vehicle: InventoryVehicle;
}

const specs = [
  { label: "VIN Number", key: "vin" as const },
  { label: "Engine Capacity", key: "engineCapacity" as const },
  { label: "Transmission", key: "transmission" as const },
  { label: "Drive Train", key: "driveTrain" as const },
  { label: "Fuel Type", key: "fuelType" as const },
  { label: "Year", key: "year" as const },
  { label: "Mileage", key: "mileage" as const, format: (v: InventoryVehicle) => formatMileage(v.mileage) },
  { label: "Color", key: "color" as const },
  { label: "Stock ID", key: "stockId" as const },
];

export function VehicleSpecsTable({ vehicle }: VehicleSpecsTableProps) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)]">
      <table className="w-full text-left text-sm">
        <tbody>
          {specs.map(({ label, key, format }, i) => {
            const value = key === "mileage" && format
              ? format(vehicle)
              : String(vehicle[key]);
            return (
              <tr
                key={key}
                className={`border-b border-[var(--color-border)] last:border-b-0 ${
                  i % 2 === 1 ? "bg-[var(--color-background)]" : "bg-white"
                }`}
              >
                <td className="px-4 py-3 font-medium text-[var(--color-primary)] opacity-80">
                  {label}
                </td>
                <td className="px-4 py-3 font-medium text-[var(--color-primary)]">
                  {value}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
