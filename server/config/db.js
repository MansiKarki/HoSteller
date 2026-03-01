import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      ssl: true,
      tlsAllowInvalidCertificates: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    throw error;
  }
};

export default connectDB;
