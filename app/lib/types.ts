export interface InspectionReport {
  engine?: string;
  suspension?: string;
  brakes?: string;
  transmission?: string;
  electrical?: string;
  bodywork?: string;
}

export interface Vehicle {
  id?: string;
  featured?: boolean;
  sold?: boolean;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  downPayment?: number;
  imageUrls: string[];
  slug: string;
  stockId: string;
  engine: string;
  transmission: string;
  fuelType: string;
  color: string;
  vin: string;
  engineCapacity: string;
  driveTrain: string;
  description: string;
  inspectionReport: InspectionReport;
  location: string;
  features?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  text: string;
  createdAt: string;
}
