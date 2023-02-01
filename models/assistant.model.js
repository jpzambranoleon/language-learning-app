const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assistantSchema = new Schema(
  {
    name: { type: String, max: 50 },
    profilePic: { type: String, default: "" },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const Assistant = mongoose.model("assistant", assistantSchema);
module.exports = Assistant;
