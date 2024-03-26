import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import middleware from "../middleware/middleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
app.use(express.json());

/* Debugging */
app.use((req, res, next) => {
  console.log("Request Method:", req.method);
  console.log("Request URL:", req.url);
  console.log("Request Params:", req.params.id);
  console.log("User ID:", req.user?.id); // Check if req.user exists
  next();
});

app.use(cookieParser());
app.use(cors({ origin: true, credentials: true })); //This is important for the cookies to be saved in the client browser
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

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
