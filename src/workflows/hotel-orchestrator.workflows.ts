import { proxyActivities } from "@temporalio/workflow";
import type * as activities from "./activities/suppliers.activities";
import { SupplierHotelOffer } from "../types/suppliers.type";
import { Hotel } from "../types/hotels.type";

const { fetchSupplierAHotelsMockData, fetchSupplierBHotelsMockData } =
  proxyActivities<typeof activities>({
    startToCloseTimeout: "30s",
  });

export async function hotelOrchestrator(city: string): Promise<Hotel[]> {
  const [supplierADataPromise, supplierBDataPromise] = await Promise.allSettled(
    [fetchSupplierAHotelsMockData(city), fetchSupplierBHotelsMockData(city)]
  );

  let supplierAData: SupplierHotelOffer[] =
    supplierADataPromise.status === "fulfilled"
      ? supplierADataPromise.value
      : [];
  let supplierBData: SupplierHotelOffer[] =
    supplierBDataPromise.status === "fulfilled"
      ? supplierBDataPromise.value
      : [];

  supplierAData = supplierAData.map((h) => ({
    ...h,
    supplier: "Supplier A",
  }));
  supplierBData = supplierBData.map((h) => ({
    ...h,
    supplier: "Supplier B",
  }));

  const map = new Map<string, SupplierHotelOffer>();
  const pushIfBetterPrice = (h: SupplierHotelOffer) => {
    const key = h.name.trim().toLowerCase();
    const existing = map.get(key);
    if (!existing || h.price < existing.price) map.set(key, h);
  };

  supplierAData.forEach(pushIfBetterPrice);
  supplierBData.forEach(pushIfBetterPrice);

  const result: Hotel[] = Array.from(map.values()).map((h) => ({
    name: h.name,
    price: h.price,
    supplier: h.supplier || "Unknown",
    commissionPct: h.commissionPct,
  }));

  return result;
}
