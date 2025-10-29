import { NativeConnection, Worker } from "@temporalio/worker";
import path from "path";

async function run() {
  const connection = await NativeConnection.connect({
    address: process.env.TEMPORAL_ADDRESS ?? "temporal:7233",
  });

  const worker = await Worker.create({
    connection,
    workflowsPath: path.join(__dirname, "../hotel-orchestrator.workflows.ts"),
    activities: require("../activities/suppliers.activities.ts"),
    taskQueue: "hotel-offers-task-queue",
  });
  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
