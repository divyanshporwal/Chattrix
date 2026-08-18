import express from "express";
import "dotenv/config";
import connectDB from "./lib/db.js";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";

const app = express();

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

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("Server is listening on PORT: ", process.env.PORT);
});
