import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inventory - Bank Repossessed Cars | Repo Motors",
  description:
    "Browse our inventory of bank repossessed and pre-owned vehicles. Filter by make, model, year, price, and mileage. Fixed prices, no auctions.",
};

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
