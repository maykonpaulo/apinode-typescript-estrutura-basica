import "reflect-metadata";
import "module-alias/register";
import "express-async-errors";
import "dotenv/config";
import { AppError } from "@utils/errors/AppError";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";

import "@database/connection";
import "./container";

import { router } from "./infra/http/routes";

const app = express();

app.use(express.json());

app.use(cors());

app.use(router);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ error: err.message });
  }

  return response.status(500).json({ error: `Internal server error - ${err.message}` });
});

const port = parseInt(process.env.API_PORT, 10) || 3030;

app.listen(
  port,
  "localhost",
  () => console.log(`Server is running [ENV:${process.env.NODE_ENV}]! Listening on ${port}!`),
);
