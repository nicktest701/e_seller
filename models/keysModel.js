const db = require("../db/dbConnection");

const mongoose = require("mongoose");

const KeySchema = new mongoose.Schema(
  {
    primaryKey: {
      type: String,
      unique: true,
    },
    secondaryKey: {
      type: String,
      unique: true,
    },
    apiKey: {
      type: String,
      unique: true,
    },
    xReferenceId: {
      type: String,
      unique: true,
    },
    accessToken: {
      type: String,
      unique: true,
    },
    refreshToken: {
      type: String,
      unique: true,
    },

    basicAuth: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = db.model("Key", KeySchema);
