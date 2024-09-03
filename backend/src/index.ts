// packages
import { Application } from "express";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

// utils , routers and constant
import connectDB from "./config/db_Config.js";
import AuthRoutes from "./routes/auth.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import envValidation from "./validation/env.validation.js";

// set variable
const app: Application = express();

// set dotenv config
dotenv.config({
  path: "../.env",
});

// set middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: [envValidation.CLIENT_ORIGIN],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    preflightContinue: false,
  })
);

// set routes
app.use("/api/auth", AuthRoutes);

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
