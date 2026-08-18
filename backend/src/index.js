import express from "express";
import "dotenv/config";
import connectDB from "./lib/db.js";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import fs from "fs";
import path from "path";
import job from "./lib/cron.js";

const app = express();
const publicDir = path.join(process.cwd(), "public");

app.use(clerkMiddleware());
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});

//if public directory exists, serve the static files
//this is for production build
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));

  app.get("/{*any}", (req, res, next) => {
    res.sendFile(path.join(publicDir, "index.html"), (err) => next(err));
  });
}

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("Server is listening on PORT: ", process.env.PORT);
  if (process.env.NODE_ENV === "production") {
    job.start();
  }
});
