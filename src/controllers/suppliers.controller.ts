import { Request, Response } from "express";
import { supplierAMockData, supplierBMockData } from "../data/suppliers.data";

export const getSupplierAHotels = (req: Request, res: Response) => {
  const city = ((req.query.city as string) || "").toLowerCase();
  const hotels = city
    ? supplierAMockData.filter((h) => h.city.toLowerCase() === city)
    : supplierAMockData;
  res.json(hotels);
};

export const getSupplierBHotels = (req: Request, res: Response) => {
  const city = ((req.query.city as string) || "").toLowerCase();
  const hotels = city
    ? supplierBMockData.filter((h) => h.city.toLowerCase() === city)
    : supplierBMockData;
  res.json(hotels);
};
