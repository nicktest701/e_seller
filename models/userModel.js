const db = require("../db/dbConnection");

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
    },
    mobileNo: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = db.model("User", UserSchema);
