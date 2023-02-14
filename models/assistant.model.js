const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assistantSchema = new Schema(
  {
    userId: { type: String },
    name: { type: String, max: 50 },
    model: { type: String, max: 50 },
    strengths: [],
    avatar: { type: String, default: "" },
    prompt: { type: String },
    chatLog: [],
    temperature: { type: Number },
    maxToken: {
      type: Number,
      required: true,
      integer: true,
      get: (v) => Math.round(v),
      set: (v) => Math.round(v),
    },
    topP: { type: Number },
    frequencyPenalty: { type: Number },
    presencePenalty: { type: Number },
    bestOf: {
      type: Number,
      required: true,
      integer: true,
      get: (v) => Math.round(v),
      set: (v) => Math.round(v),
    },
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
