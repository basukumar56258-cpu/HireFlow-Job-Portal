import test from "node:test";
import assert from "node:assert/strict";
import { connectDatabase } from "../src/db.js";

test("connectDatabase starts an in-memory MongoDB when MONGO_URI is not set", async () => {
  const previousUri = process.env.MONGO_URI;
  delete process.env.MONGO_URI;

  try {
    const connection = await connectDatabase();
    assert.ok(connection);
    assert.ok(connection.connection);
    await connection.connection.close();
  } finally {
    if (previousUri) {
      process.env.MONGO_URI = previousUri;
    } else {
      delete process.env.MONGO_URI;
    }
  }
});
