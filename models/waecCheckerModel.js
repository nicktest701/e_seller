const db = require("../db/dbConnection");

const mongoose = require("mongoose");

const WaecCheckerSchema = new mongoose.Schema(
  {
    examsType: {
      type: String,
    },
    serial: {
      type: String,
      uppercase: true,
      unique: true,
    },
    pin: {
      type: String,
      uppercase: true,
      unique: true,
    },
    price: Number,
    url: String,
    agent: {
      type: String,
      lowercase: true,
    },
    mobileNo: String,
  },
  {
    timestamps: true,
  }
);

module.exports = db.model("WaecChecker", WaecCheckerSchema);
