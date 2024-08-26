// packages
import { Application } from "express";
import express from "express";
import cookieParser from "cookie-parser";
import path from "node:path";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

// utils,routers and constant
import connectDB from "./config/db_Config";
// import userRoute from "./routers/user.router.js";
import errorMiddleware from "./middlewares/error.middleware";
import envValidation from "./validation/env.validation";

// set variable
const app: Application = express();

// set dotenv config
dotenv.config({
  path: "../.env",
});

//if .env file is not found

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

// set middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CROSS_ORIGIN,
    credentials: true,
  })
);
// set routes
// app.use("/api/users", userRoute);

// set global level error handling middlwere
app.use(errorMiddleware);

/* database connection and app listen to port */
(async () =>
  connectDB().then((resolve) => {
    try {
      app.listen(envValidation.PORT, () => {
        const { port } = resolve.connection;
        console.log(`db connect at port ${port}`);
        console.log(`app working => ${process.env.PORT}`);
      });
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }))();
