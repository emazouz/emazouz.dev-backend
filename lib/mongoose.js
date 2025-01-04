import mongoose from "mongoose";

export function mongooseConnect() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  } else {
    const url = process.env.MONGODB_URI;
    return mongoose.connect(url);
  }
}
