import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.log("Database connection error: ", error);
      process.exit(1);
      //1 means failed , 0 means success
    });
};

export default connectDB;
