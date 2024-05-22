import mongoose from "mongoose";
let isConnected: boolean = false;
export const connectDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("Mongodb is already connected.");
    return;
  }
  try {
    await mongoose.connect(process.env.DATABASE_URL || "", {
      dbName: "NetflixClone",
    });
    isConnected = true;
    console.log("Mongodb connected.");
  } catch (error) {
    console.log(error);
  }
};
