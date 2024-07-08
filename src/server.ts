import "reflect-metadata";
import "express-async-errors";
require("dotenv").config();
import express from "express";
import cors from "cors";
import cluster from "cluster";
import process from 'node:process'

const numCPUs = require("node:os").availableParallelism();


import { recommendationRoute, healthcheckRoute } from "./routes";
import { errorMiddleware } from "./middleware";

const app = express();
const PORT = process.env.PORT || 80;
const initialPath = "/api/v1";

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  app.use(express.json());
  app.use(cors());

  app.use(initialPath, healthcheckRoute);
  app.use(initialPath, recommendationRoute);

  app.use(errorMiddleware);

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });

  console.log(`Worker ${process.pid} started`);
}
