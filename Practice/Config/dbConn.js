import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDb = async () => {
  try {
    await mongoose
      .connect(process.env.DATABASE_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("mongo connected"));
  } catch (err) {
    console.log(err);
  }
};

export default connectDb;
