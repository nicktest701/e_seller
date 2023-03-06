const db = require("../db/dbConnection");

const mongoose = require("mongoose");

const MomoTransactionSchema = new mongoose.Schema(
  {
    transactionNo: {
      type: String,
      uppercase: true,
      unique: true,
    },
    amount: {
      type: String,
    
    },
    referenceNo: {
      type: String,
      uppercase: true,
      unique: true,
  }
},

   
  {
    timestamps: true,
  }
);

module.exports = db.model("MomoTransaction", MomoTransactionSchema);
