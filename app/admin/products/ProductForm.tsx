"use client";

import { useState, useEffect } from "react";
import type { Vehicle, InspectionReport } from "@/app/lib/types";

const INSPECTION_FIELDS: (keyof InspectionReport)[] = [
  "engine",
  "suspension",
  "brakes",
  "transmission",
  "electrical",
  "bodywork",
];

const INSPECTION_OPTIONS = [
  "Pass",
  "Fail",
  "Good",
  "Fair",
  "Poor",
  "Needs Attention",
  "Excellent",
  "Not Inspected",
];

const defaultInspection: InspectionReport = {
  engine: "",
  suspension: "",
  brakes: "",
  transmission: "",
  electrical: "",
  bodywork: "",
};

interface ProductFormProps {
  initial?: Partial<Vehicle>;
  slug?: string;
  mode: "create" | "edit";
}

export function ProductForm({
  initial,
  slug,
  mode,
}: ProductFormProps) {
  const [form, setForm] = useState({
    make: initial?.make ?? "",
    model: initial?.model ?? "",
    year: initial?.year ?? new Date().getFullYear(),
    price: initial?.price ?? 0,
    mileage: initial?.mileage ?? 0,
    downPayment: initial?.downPayment ?? 0,
    slug: initial?.slug ?? "",
    stockId: initial?.stockId ?? "",
    engine: initial?.engine ?? "",
    transmission: initial?.transmission ?? "",
    fuelType: initial?.fuelType ?? "",
    color: initial?.color ?? "",
    vin: initial?.vin ?? "",
    engineCapacity: initial?.engineCapacity ?? "",
    driveTrain: initial?.driveTrain ?? "",
    description: initial?.description ?? "",
    location: initial?.location ?? "",
    imageUrls: initial?.imageUrls ?? [""],
    features: initial?.features ?? [],
    inspectionReport: { ...defaultInspection, ...initial?.inspectionReport },
  });
  const [featuresText, setFeaturesText] = useState(
    initial?.features?.join(", ") ?? ""
  );
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [uploadingImages, setUploadingImages] = useState<boolean[]>([]);

  // Auto-generate slug from make, model, and year
  useEffect(() => {
    // Only auto-generate in create mode or if slug is empty
    if (mode === "create" || !form.slug) {
      if (form.make && form.model && form.year) {
        const generatedSlug = `${form.make}-${form.model}-${form.year}`
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""); // Remove special characters
        
        setForm((prev) => ({
          ...prev,
          slug: generatedSlug,
        }));
      }
    }
  }, [form.make, form.model, form.year, mode, form.slug]);

  const suggestSlug = () => {
    if (form.make && form.model && form.year) {
      setForm((prev) => ({
        ...prev,
        slug: `${prev.make}-${prev.model}-${prev.year}`
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
      }));
    }
  };

  const updateImage = (index: number, value: string) => {
    setForm((prev) => {
      const next = [...prev.imageUrls];
      next[index] = value;
      return { ...prev, imageUrls: next };
    });
  };

  const addImage = () => {
    setForm((prev) => ({
      ...prev,
      imageUrls: [...prev.imageUrls, ""],
    }));
  };

  const removeImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = async (file: File, index: number) => {
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    setUploadingImages((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/vehicle-images", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      updateImage(index, data.publicUrl);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image. Make sure the storage bucket is created in Supabase.");
    } finally {
      setUploadingImages((prev) => {
        const next = [...prev];
        next[index] = false;
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const features = featuresText
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);

    const payload = {
      ...form,
      imageUrls: form.imageUrls.filter(Boolean),
      features,
    };

    try {
      const url =
        mode === "create"
          ? "/api/admin/vehicles"
          : `/api/admin/vehicles/${slug}`;
      const method = mode === "create" ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Request failed");
      }
      setStatus("success");
      if (mode === "create") {
        window.location.href = "/admin/products";
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to save");
    }
  };

  const inputClass =
    "w-full rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white px-4 py-2 text-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]";
  const labelClass = "mb-1 block text-sm font-medium text-[var(--color-primary)]";

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {status === "success" && mode === "edit" && (
        <p className="rounded bg-green-100 p-3 text-sm text-green-800">
          Vehicle updated successfully.
        </p>
      )}
      {status === "error" && (
        <p className="rounded bg-red-100 p-3 text-sm text-red-800">
          {errorMsg}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="make" className={labelClass}>
            Make *
          </label>
          <input
            id="make"
            type="text"
            required
            value={form.make}
            onChange={(e) => setForm((p) => ({ ...p, make: e.target.value }))}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="model" className={labelClass}>
            Model *
          </label>
          <input
            id="model"
            type="text"
            required
            value={form.model}
            onChange={(e) => setForm((p) => ({ ...p, model: e.target.value }))}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="year" className={labelClass}>
            Year *
          </label>
          <input
            id="year"
            type="number"
            required
            min={1990}
            max={2030}
            value={form.year || ""}
            onChange={(e) =>
              setForm((p) => ({ ...p, year: Number(e.target.value) || 0 }))
            }
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="price" className={labelClass}>
            Price (USD) *
          </label>
          <input
            id="price"
            type="number"
            required
            min={0}
            value={form.price || ""}
            onChange={(e) =>
              setForm((p) => ({ ...p, price: Number(e.target.value) || 0 }))
            }
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="mileage" className={labelClass}>
            Mileage (km) *
          </label>
          <input
            id="mileage"
            type="number"
            required
            min={0}
            value={form.mileage || ""}
            onChange={(e) =>
              setForm((p) => ({ ...p, mileage: Number(e.target.value) || 0 }))
            }
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="downPayment" className={labelClass}>
            Down Payment (USD)
          </label>
          <input
            id="downPayment"
            type="number"
            min={0}
            value={form.downPayment || ""}
            onChange={(e) =>
              setForm((p) => ({ ...p, downPayment: Number(e.target.value) || 0 }))
            }
            className={inputClass}
            placeholder="Optional down payment amount"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="slug" className={labelClass}>
            Slug * <span className="text-xs font-normal opacity-70">(Auto-generated from make-model-year)</span>
          </label>
          <div className="flex gap-2">
            <input
              id="slug"
              type="text"
              required
              value={form.slug}
              onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
              className={inputClass}
              placeholder="Auto-generates as you type"
            />
            <button
              type="button"
              onClick={suggestSlug}
              className="rounded-[var(--radius-button)] border border-[var(--color-primary)] px-3 py-2 text-sm font-medium text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10"
              title="Regenerate slug from current make, model, and year"
            >
              Regenerate
            </button>
          </div>
          <p className="mt-1 text-xs text-[var(--color-primary)] opacity-60">
            This will be used in the URL: /inventory/{form.slug || "your-slug"}
          </p>
        </div>
        <div>
          <label htmlFor="stockId" className={labelClass}>
            Stock ID *
          </label>
          <input
            id="stockId"
            type="text"
            required
            value={form.stockId}
            onChange={(e) =>
              setForm((p) => ({ ...p, stockId: e.target.value }))
            }
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="engine" className={labelClass}>
            Engine
          </label>
          <input
            id="engine"
            type="text"
            value={form.engine}
            onChange={(e) =>
              setForm((p) => ({ ...p, engine: e.target.value }))
            }
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="transmission" className={labelClass}>
            Transmission
          </label>
          <input
            id="transmission"
            type="text"
            value={form.transmission}
            onChange={(e) =>
              setForm((p) => ({ ...p, transmission: e.target.value }))
            }
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="fuelType" className={labelClass}>
            Fuel Type
          </label>
          <input
            id="fuelType"
            type="text"
            value={form.fuelType}
            onChange={(e) =>
              setForm((p) => ({ ...p, fuelType: e.target.value }))
            }
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="color" className={labelClass}>
            Color
          </label>
          <input
            id="color"
            type="text"
            value={form.color}
            onChange={(e) =>
              setForm((p) => ({ ...p, color: e.target.value }))
            }
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="vin" className={labelClass}>
            VIN
          </label>
          <input
            id="vin"
            type="text"
            value={form.vin}
            onChange={(e) =>
              setForm((p) => ({ ...p, vin: e.target.value }))
            }
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="engineCapacity" className={labelClass}>
            Engine Capacity
          </label>
          <input
            id="engineCapacity"
            type="text"
            value={form.engineCapacity}
            onChange={(e) =>
              setForm((p) => ({ ...p, engineCapacity: e.target.value }))
            }
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="driveTrain" className={labelClass}>
          Drive Train
        </label>
        <input
          id="driveTrain"
          type="text"
          value={form.driveTrain}
          onChange={(e) =>
            setForm((p) => ({ ...p, driveTrain: e.target.value }))
          }
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="location" className={labelClass}>
          Location
        </label>
        <input
          id="location"
          type="text"
          value={form.location}
          onChange={(e) =>
            setForm((p) => ({ ...p, location: e.target.value }))
          }
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          value={form.description}
          onChange={(e) =>
            setForm((p) => ({ ...p, description: e.target.value }))
          }
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>
          Vehicle Images (Max 10 images, 5MB each)
        </label>
        <div className="space-y-2">
          {form.imageUrls.map((url, i) => (
            <div key={i} className="flex gap-2">
              {url ? (
                <div className="flex flex-1 items-center gap-2 rounded border border-[var(--color-border)] p-2">
                  <img
                    src={url}
                    alt={`Preview ${i + 1}`}
                    className="h-16 w-16 rounded object-cover"
                  />
                  <span className="flex-1 truncate text-sm text-[var(--color-primary)]">
                    {url}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateImage(i, "")}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex flex-1 gap-2">
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file, i);
                    }}
                    className={inputClass}
                    disabled={uploadingImages[i]}
                  />
                  {uploadingImages[i] && (
                    <span className="text-sm text-[var(--color-primary)]">
                      Uploading...
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
          {form.imageUrls.length < 10 && (
            <button
              type="button"
              onClick={addImage}
              className="text-sm font-medium text-[var(--color-primary)] hover:underline"
            >
              + Add another image
            </button>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="features" className={labelClass}>
          Features (comma-separated)
        </label>
        <input
          id="features"
          type="text"
          value={featuresText}
          onChange={(e) => setFeaturesText(e.target.value)}
          className={inputClass}
          placeholder="Air Conditioning, Power Windows, ..."
        />
      </div>

      <div>
        <h3 className="mb-3 font-medium text-[var(--color-primary)]">
          Inspection Report
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {INSPECTION_FIELDS.map((key) => (
            <div key={key}>
              <label
                htmlFor={`insp-${key}`}
                className="mb-1 block text-sm text-[var(--color-primary)]"
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <select
                id={`insp-${key}`}
                value={form.inspectionReport[key] ?? ""}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    inspectionReport: {
                      ...p.inspectionReport,
                      [key]: e.target.value,
                    },
                  }))
                }
                className={inputClass}
              >
                <option value="">Select status...</option>
                {INSPECTION_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-[var(--radius-button)] bg-[var(--color-primary)] px-6 py-3 font-bold text-white hover:opacity-90 disabled:opacity-70"
        >
          {status === "loading" ? "Saving..." : mode === "create" ? "Create Vehicle" : "Save Changes"}
        </button>
        <a
          href="/admin/products"
          className="rounded-[var(--radius-button)] border border-[var(--color-border)] px-6 py-3 font-medium text-[var(--color-primary)] hover:bg-[var(--color-border)]/20"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
