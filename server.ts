import app from "./src/app";

const PORT = process.env.PORT || 3000;

const server = app
  .listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
  })
  .on("error", (err) => {
    console.error("Server failed to start:", err);
  });

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (err, _) => {
  console.error("Unhandled Promise Rejection:", err);
  server.close(() => process.exit(1));
});
