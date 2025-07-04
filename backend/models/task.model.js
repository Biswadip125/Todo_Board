import mongoose, { Mongoose, Types } from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    assignedUser: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["Todo", "In Progress", "Done"],
      default: "Todo",
    },
    priority: { type: Number, default: 3 },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
