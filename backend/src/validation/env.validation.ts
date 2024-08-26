import "dotenv/config";

const envValidation = Object.freeze({
  MONGO_DB_URL: process.env.MONGO_DB_URL!,
  PORT: process.env.PORT!,
  NODE_ENV: process.env.NODE_ENV!,
});

export default envValidation;
