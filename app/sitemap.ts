import { MetadataRoute } from "next";
import { getVehicles } from "./data/inventory";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://repomotors.com";
  const vehicles = await getVehicles();

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/inventory`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/how-to-buy`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/book-inspection`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ];

  const vehiclePages = vehicles.map((vehicle) => ({
    url: `${baseUrl}/inventory/${vehicle.slug}`,
    lastModified: vehicle.updatedAt ? new Date(vehicle.updatedAt) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...vehiclePages];
}
