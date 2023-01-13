import mongoose from "mongoose";

mongoose.set("strictQuery", true);

export const connection = mongoose.connect(
  "mongodb://127.0.0.1:27017/productDB"
);
