const mongoose = require("mongoose");

let MONGO = process.env.MONGO_URL;
//  let MONGO = process.env.MONGO_URL_LOCAL;

if (process.env.NODE_ENV === "production") {
  MONGO = process.env.MONGO_URL;
}

const db = mongoose.createConnection(MONGO, {
  dbName: "Momo",
  useNewUrlParser: true,
  serverSelectionTimeoutMS: 0,
  socketTimeoutMS: 0,
  connectTimeoutMS: 0,
  keepAlive: true,
});

db.on("connected", () => {
  console.log("connnected");
});

db.on("disconnected", () => {
  console.log("disconnected");
});

process.on("SIGINT", async () => {
  await db.close();
  process.exit(0);
});

module.exports = db;
