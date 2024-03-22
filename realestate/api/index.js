import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-route.js";
import authRouter from "./routes/auth.route.js";
import middleware from "../middleware/middleware.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
