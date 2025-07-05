import mongoose from "mongoose";

const actionLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      require: true,
    },
    action: {
      type: String,
      enum: [
        "create",
        "update",
        "delete",
        "assign",
        "change-status",
        "change-priority",
        "drag-drop",
        "reassign",
        "smart-assign",
        "conflict-resolved",
      ],
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export const ActionLog = mongoose.model("ActionLog", actionLogSchema);
