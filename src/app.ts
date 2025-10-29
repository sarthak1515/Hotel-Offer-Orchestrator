import express, { NextFunction, Request, Response } from "express";
import suppliersRouter from "./routes/suppliers.routes";
import hotelsRouter from "./routes/hotels.routes";
import rateLimit from "express-rate-limit";
import { errorHandler } from "./middleware/error-handler.middleware";

const app = express();

app.use(express.json());
app.use(
  rateLimit({
    windowMs: 10 * 1000,
    max: 10,
    message: {
      status: 429,
      error: "Too many requests. Try again in a few seconds.",
    },
  })
);

app.use((req: Request, res: Response, next) => {
  if (req.path.startsWith("/supplier")) {
    return suppliersRouter(req, res, next);
  }
  next();
});
app.use("/api/hotels", hotelsRouter);
app.use((req: Request, res: Response, next: NextFunction) => {
  next(Object.assign(new Error("Route not found."), { status: 404 }));
});

app.use(errorHandler);

export default app;
