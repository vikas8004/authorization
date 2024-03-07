import express from "express";
import userRouter from "./routers/user.router.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors()
);
app.use(cookieParser());
app.use("/api/v1", userRouter);

export default app;
