import type { InventoryVehicle } from "../data/inventory";

const formatMileage = (km: number) => `${(km / 1000).toFixed(0)}k km`;

interface VehicleBigSpecsProps {
  vehicle: InventoryVehicle;
}

function EngineIcon() {
  return (
    <svg className="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

function TransmissionIcon() {
  return (
    <svg className="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  );
}

function FuelIcon() {
  return (
    <svg className="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-3a2 2 0 00-2-2h-2h-2a2 2 0 00-2 2v3a2 2 0 002 2zm0 0V7a2 2 0 012-2h2a2 2 0 012 2v2" />
    </svg>
  );
}

function MileageIcon() {
  return (
    <svg className="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}

function YearIcon() {
  return (
    <svg className="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function ColorIcon() {
  return (
    <svg className="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  );
}

const specItems = [
  { icon: EngineIcon, label: "Engine", key: "engine" as const },
  { icon: TransmissionIcon, label: "Transmission", key: "transmission" as const },
  { icon: FuelIcon, label: "Fuel Type", key: "fuelType" as const },
  { icon: MileageIcon, label: "Mileage", key: "mileage" as const, format: (v: InventoryVehicle) => formatMileage(v.mileage) },
  { icon: YearIcon, label: "Year", key: "year" as const },
  { icon: ColorIcon, label: "Color", key: "color" as const },
];

export function VehicleBigSpecs({ vehicle }: VehicleBigSpecsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {specItems.map(({ icon: Icon, label, key, format }) => {
        const value = format ? format(vehicle) : String(vehicle[key]);
        return (
          <div
            key={key}
            className="flex flex-col items-center gap-2 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-4"
          >
            <Icon />
            <div className="text-center">
              <p className="text-xs font-medium text-[var(--color-primary)] opacity-80">
                {label}
              </p>
              <p className="mt-0.5 text-sm font-bold text-[var(--color-primary)]">
                {value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
