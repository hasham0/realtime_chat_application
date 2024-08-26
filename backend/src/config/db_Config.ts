import envValidation from "../validation/env.validation";
import mongoose from "mongoose";
import "dotenv/config";
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(envValidation.MONGO_DB_URL, {
      dbName: "ChatApplication",
    });
    return connect;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
