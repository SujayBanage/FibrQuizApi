import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

export const MONGODB_URI =
  process.env.NODE_ENV === "development"
    ? process.env.MONGODB_URI_DEV
    : process.env.MONGODB_URI_PROD;

export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
