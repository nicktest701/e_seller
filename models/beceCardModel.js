const db = require("../db/dbConnection");

const mongoose = require("mongoose");

const WaecCheckerSchema = new mongoose.Schema(
  {
    serial: {
      type: String,
      // unique: true,
    },
    pin: {
      type: String,
      // unique: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = db.model("BeceCard", WaecCheckerSchema);
