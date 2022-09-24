/* eslint-disable no-console */
import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_DB_CONNECTION_URI ?? '',);
    console.info(`Mongo DB Connected: ${connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;