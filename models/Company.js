// models/Company.js

const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    Cid: {
      type: String,
    },
    location: {
      type: String,
    },
    description: {
      type: String,
    },
    joined_date: {
      type: Date,
    },
    email: {
      type: String,
    },
    logo: {
      type: String,
    },
 
    updated_date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = Company = mongoose.model("company", CompanySchema);
