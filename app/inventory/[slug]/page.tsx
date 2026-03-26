import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getVehicleBySlug } from "@/app/data/inventory";
import { galleryImageUrls } from "@/app/lib/cardImages";
import { JsonLd } from "../../components/JsonLd";
import { VehicleGallery } from "../../components/VehicleGallery";
import { VehicleDetailSidebar } from "../../components/VehicleDetailSidebar";
import { VehicleBigSpecs } from "../../components/VehicleBigSpecs";
import { VehicleDetailTabs } from "../../components/VehicleDetailTabs";
import { VehicleInspectionReport } from "../../components/VehicleInspectionReport";

export const revalidate = 3600; // Revalidate every hour (ISR)

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle)
    return { title: "Vehicle Not Found | Repo Motors" };
  return {
    title: `${vehicle.year} ${vehicle.make} ${vehicle.model} - ${vehicle.stockId} | Repo Motors`,
    description:
      vehicle.description ||
      `${vehicle.year} ${vehicle.make} ${vehicle.model} - Bank repossessed. ${vehicle.mileage / 1000}k km. Fixed price.`,
  };
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);

  if (!vehicle) notFound();

  const alt = `${vehicle.year} ${vehicle.make} ${vehicle.model} - Bank Repossessed Vehicle`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
    description: vehicle.description || `${vehicle.year} ${vehicle.make} ${vehicle.model} - Bank Repossessed Vehicle`,
    image: galleryImageUrls(vehicle.imageUrls)[0],
    sku: vehicle.stockId,
    offers: {
      "@type": "Offer",
      price: vehicle.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  const carSchema = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
    brand: { "@type": "Brand", name: vehicle.make },
    vehicleModel: vehicle.model,
    modelDate: vehicle.year,
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: vehicle.mileage,
      unitCode: "KMT",
    },
    vehicleIdentificationNumber: vehicle.vin,
    color: vehicle.color,
    fuelType: vehicle.fuelType,
    vehicleTransmission: vehicle.transmission,
  };

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <JsonLd data={productSchema} />
      <JsonLd data={carSchema} />

      <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 lg:px-8">
        <Link
          href="/inventory"
          className="mb-6 inline-block text-sm font-medium text-[var(--color-primary)] hover:opacity-80"
        >
          ← Back to Inventory
        </Link>

        <h1 className="mb-6 text-2xl font-bold text-[var(--color-primary)] md:text-3xl">
          {vehicle.year} {vehicle.make} {vehicle.model} - {vehicle.stockId}
        </h1>

        <VehicleGallery imageUrls={vehicle.imageUrls} alt={alt} sold={vehicle.sold} />

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_350px]">
          <div className="order-2 flex flex-col gap-8 lg:order-1">
            <section>
              <h2 className="mb-4 text-lg font-bold text-[var(--color-primary)]">
                Overview
              </h2>
              <VehicleBigSpecs vehicle={vehicle} />
            </section>

            <section>
              <h2 className="mb-4 text-lg font-bold text-[var(--color-primary)]">
                Seller&apos;s Remarks
              </h2>
              <p className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-6 text-[var(--color-primary)]">
                {vehicle.description ||
                  "Contact us for detailed remarks."}
              </p>
            </section>

            <section>
              <VehicleDetailTabs vehicle={vehicle} />
            </section>

            <section>
              <VehicleInspectionReport
                slug={slug}
                inspectionReport={vehicle.inspectionReport}
              />
            </section>
          </div>

          <div className="order-1 lg:order-2">
            <VehicleDetailSidebar vehicle={vehicle} />
          </div>
        </div>
      </div>
    </main>
  );
}
