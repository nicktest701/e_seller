const db = require("../db/dbConnection");

const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      lowercase: true,
      required: true,
    }, 
    voucherType: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    details: Object,
  },
  {
    timestamps: true,
  }
);

module.exports = db.model("Category", CategorySchema);
