import "dotenv/config";

const envValidation: Readonly<{
  MONGO_DB_URL: string;
  DB_NAME: string;
  PORT: number;
  NODE_ENV: string;
  CLIENT_ORIGIN: string;
  JWT_ACCESS_KEY: string;
  JWT_REFRESH_KEY: string;
  JWT_ACCESS_KEY_EXPIRY: string;
  JWT_REFRESH_KEY_EXPIRY: string;
}> = Object.freeze({
  MONGO_DB_URL: String(process.env.MONGO_DB_URL!),
  DB_NAME: String(process.env.DB_NAME!),
  PORT: Number(process.env.PORT!) || 6000,
  NODE_ENV: String(process.env.NODE_ENV!),
  CLIENT_ORIGIN: String(process.env.CLIENT_ORIGIN!),
  JWT_ACCESS_KEY: String(process.env.JWT_ACCESS_KEY!),
  JWT_REFRESH_KEY: String(process.env.JWT_REFRESH_KEY!),
  JWT_ACCESS_KEY_EXPIRY: String(process.env.JWT_ACCESS_KEY_EXPIRY!),
  JWT_REFRESH_KEY_EXPIRY: String(process.env.JWT_REFRESH_KEY_EXPIRY!),
});

export default envValidation;
