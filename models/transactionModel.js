const db = require("../db/dbConnection");

const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    info: {
      type: Object,
    },
    vouchers: Array,
  },

  {
    timestamps: true,
  }
);

module.exports = db.model("Transaction", TransactionSchema);
