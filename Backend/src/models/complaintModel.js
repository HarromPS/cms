const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    category: { type: String },
    category: { type: String },
    submitted_by: { type: String },
    moderation_status: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("anonymous_complaints", userSchema);
