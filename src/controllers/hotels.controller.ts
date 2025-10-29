import { NextFunction, Request, Response } from "express";
import { Connection, WorkflowClient } from "@temporalio/client";
import { hotelOrchestrator } from "../workflows/hotel-orchestrator.workflows";
import { Hotel } from "../types/hotels.type";
import redis from "../databases/redis.databases";

/**
 * Helper to get filtered hotels from Redis given score bounds.
 */
async function getFilteredHotelsFromCache(
  redisKey: string,
  min: number | string,
  max: number | string
) {
  const members = await redis.zrangebyscore(redisKey, min, max);
  return members.map((m) => JSON.parse(m));
}

export const getHotels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const city = ((req.query.city as string) || "").trim().toLowerCase();
  if (!city) {
    return next(
      Object.assign(new Error("City query param required."), { status: 400 })
    );
  }

  const redisKey = `hotels:${city}`;
  const min = req.query.minPrice ? Number(req.query.minPrice) : "-inf";
  const max = req.query.maxPrice ? Number(req.query.maxPrice) : "+inf";

  try {
    const cachedHotels = await redis.zrange(redisKey, 0, -1);
    if (cachedHotels.length > 0) {
      console.log(`Cache hit for ${city}`);
      const filtered = await getFilteredHotelsFromCache(redisKey, min, max);
      return res.json(filtered);
    }

    console.log(`Cache miss for ${city}, fetching from Temporal workflow`);

    const connection = await Connection.connect({
      address: process.env.TEMPORAL_ADDRESS ?? "temporal:7233",
    });

    const client = new WorkflowClient({ connection });

    const handle = await client.start(hotelOrchestrator, {
      args: [city],
      taskQueue: "hotel-offers-task-queue",
      workflowId: `hotel-orch-${city}-${Date.now()}`,
    });

    const hotels: Hotel[] = await handle.result();
    const pipeline = redis.multi();
    hotels.forEach((h) => pipeline.zadd(redisKey, h.price, JSON.stringify(h)));
    pipeline.expire(redisKey, 300);
    await pipeline.exec();
    const filteredResult = await getFilteredHotelsFromCache(redisKey, min, max);
    return res.json(filteredResult);
  } catch (err) {
    next(Object.assign(new Error((err as Error).message), { status: 500 }));
  }
};
