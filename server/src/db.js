import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let memoryServer;

export async function connectDatabase() {
  if (process.env.MONGO_URI) {
    return mongoose.connect(process.env.MONGO_URI);
  }

  memoryServer = await MongoMemoryServer.create();
  const uri = memoryServer.getUri();
  console.log(`MongoDB memory server started: ${uri}`);
  return mongoose.connect(uri);
}

export async function stopDatabase() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }

  if (memoryServer) {
    await memoryServer.stop();
    memoryServer = null;
  }
}
