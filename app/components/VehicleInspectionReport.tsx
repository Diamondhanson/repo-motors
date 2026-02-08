import Link from "next/link";
import type { InspectionReport } from "../data/inventory";

interface VehicleInspectionReportProps {
  slug: string;
  inspectionReport: InspectionReport;
}

export function VehicleInspectionReport({
  slug,
  inspectionReport,
}: VehicleInspectionReportProps) {
  const entries = Object.entries(inspectionReport).filter(
    ([, v]) => v != null && v !== ""
  );

  return (
    <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-6">
      <h2 className="text-lg font-bold text-[var(--color-primary)]">
        Vehicle Inspection Report
      </h2>
      <div className="mt-4 flex flex-wrap gap-3">
        {entries.map(([key, value]) => (
          <span
            key={key}
            className="inline-flex items-center gap-2 rounded border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm"
          >
            <span className="capitalize text-[var(--color-primary)] opacity-80">
              {key}:
            </span>
            <span
              className={`font-medium ${
                value === "Pass"
                  ? "text-[var(--color-success)]"
                  : "text-[var(--color-primary)]"
              }`}
            >
              {value}
            </span>
          </span>
        ))}
      </div>
      <Link
        href="#"
        className="mt-4 inline-block rounded-[var(--radius-button)] border border-[var(--color-primary)] px-4 py-2 text-sm font-bold text-[var(--color-primary)] hover:opacity-90"
      >
        Download Inspection PDF
      </Link>
    </div>
  );
}
