import { SupplierHotelOffer } from "../../types/suppliers.type";
import { fetchWithTimeout } from "../../utils/common.utils";

export async function fetchSupplierAHotelsMockData(
  city: string
): Promise<SupplierHotelOffer[]> {
  const url = `${
    process.env.SERVICE_URL || "http://app:3000"
  }/supplierA/hotels?city=${encodeURIComponent(city)}`;
  const res = await fetchWithTimeout(url);
  if (!res.ok)
    throw new Error(`[SupplierA]: Failed fetching hotels for "${city}"`);
  return (await res.json()) as SupplierHotelOffer[];
}

export async function fetchSupplierBHotelsMockData(
  city: string
): Promise<SupplierHotelOffer[]> {
  const url = `${
    process.env.SERVICE_URL || "http://app:3000"
  }/supplierB/hotels?city=${encodeURIComponent(city)}`;
  const res = await fetchWithTimeout(url);
  if (!res.ok)
    throw new Error(`[SupplierB]: Failed fetching hotels for "${city}"`);
  return (await res.json()) as SupplierHotelOffer[];
}
