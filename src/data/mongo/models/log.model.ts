import { Schema, model } from "mongoose";

const logSchema = new Schema(
  {
    level: {
      type: String,
      required: true,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    message: {
      type: String,
      required: true,
    },
    origin: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  { versionKey: false }
);

export const LogModel = model("Log", logSchema);
