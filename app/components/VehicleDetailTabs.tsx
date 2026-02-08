"use client";

import { useState } from "react";
import { VehicleSpecsTable } from "./VehicleSpecsTable";
import type { InventoryVehicle } from "../data/inventory";

type TabId = "features" | "specs" | "location";

interface VehicleDetailTabsProps {
  vehicle: InventoryVehicle;
}

const tabs: { id: TabId; label: string }[] = [
  { id: "features", label: "Features" },
  { id: "specs", label: "Technical Specs" },
  { id: "location", label: "Location" },
];

export function VehicleDetailTabs({ vehicle }: VehicleDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("features");

  return (
    <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white">
      <div className="flex border-b border-[var(--color-border)]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "border-b-2 border-[var(--color-primary)] text-[var(--color-primary)]"
                : "text-[var(--color-primary)] opacity-70 hover:opacity-100"
            }`}
            style={{
              borderBottomColor:
                activeTab === tab.id ? "var(--color-primary)" : undefined,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-6">
        {activeTab === "features" && (
          <ul className="grid gap-2 sm:grid-cols-2">
            {(vehicle.features ?? []).map((f) => (
              <li
                key={f}
                className="flex items-center gap-2 text-[var(--color-primary)]"
              >
                <span className="text-[var(--color-success)]">✓</span>
                {f}
              </li>
            ))}
            {(!vehicle.features || vehicle.features.length === 0) && (
              <li className="text-[var(--color-primary)] opacity-80">
                Contact us for feature details.
              </li>
            )}
          </ul>
        )}
        {activeTab === "specs" && <VehicleSpecsTable vehicle={vehicle} />}
        {activeTab === "location" && (
          <div>
            <p className="font-medium text-[var(--color-primary)]">
              {vehicle.location || "Contact us for viewing location."}
            </p>
            <p className="mt-2 text-sm text-[var(--color-primary)] opacity-80">
              Schedule an inspection to view this vehicle in person.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
