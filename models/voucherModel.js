const db = require("../db/dbConnection");

const mongoose = require("mongoose");

const VoucherSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Category",
    },
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

module.exports = db.model("Voucher", VoucherSchema);
