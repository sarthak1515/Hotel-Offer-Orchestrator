import { SupplierHotelOffer } from "../types/suppliers.type";

export const supplierAMockData: SupplierHotelOffer[] = [
  {
    hotelId: "24515d0b-d4d5-4939-908f-47d237fc3aaf",
    name: "Savoy",
    price: 6000,
    city: "delhi",
    commissionPct: 10,
    // Supplier B → Savoy @5340 (≈11% cheaper) -> B wins
  },
  {
    hotelId: "391d2965-ea29-4815-b421-3e803eab5a78",
    name: "Radisson",
    price: 5900,
    city: "delhi",
    commissionPct: 13,
    // Supplier B → Radisson @5500 (≈6.8% cheaper) → choose higher commission -> A wins
  },
  {
    hotelId: "ebf8e90c-b90c-49f9-9ebc-f3d9d3429b6c",
    name: "Marriott",
    price: 3200,
    city: "mumbai",
    commissionPct: 12,
    // Supplier B → Marriott @6500 (≈103% more expensive)-> A wins
  },
];

export const supplierBMockData: SupplierHotelOffer[] = [
  {
    hotelId: "c2922bfb-424f-4c95-8011-3558b0a542af",
    name: "Savoy",
    price: 5340,
    city: "delhi",
    commissionPct: 20,
  },
  {
    hotelId: "40532dca-bace-4da5-8953-6d021893b3a3",
    name: "Radisson",
    price: 5500,
    city: "delhi",
    commissionPct: 11,
  },
  {
    hotelId: "2f2546d4-d92a-47bb-aec2-b6a236e23c66",
    name: "Marriott",
    price: 6500,
    city: "mumbai",
    commissionPct: 11,
  },
  {
    hotelId: "2f2546d4-d92a-47bb-aec2-b6a236e23c67",
    name: "Lalit",
    price: 6500,
    city: "delhi",
    commissionPct: 11,
  },
];
