import mongoose from "mongoose";
import { MONGODB_URI } from "../config.js";

const databaseConnection = async () => {
  return await mongoose.connect(MONGODB_URI);
};
export default databaseConnection;
