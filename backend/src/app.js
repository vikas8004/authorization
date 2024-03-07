import express from "express";
import userRouter from "./routers/user.router.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(
  cors({
    // credentials:true,
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/api/v1", userRouter);

export default app;
