import { Router } from "express";
import {
  getSupplierAHotels,
  getSupplierBHotels,
} from "../controllers/suppliers.controller";

const router = Router();

router.get("/supplierA/hotels", getSupplierAHotels);
router.get("/supplierB/hotels", getSupplierBHotels);

export default router;
