import { ActionLog } from "../models/actionLog.model.js";

export const getAllLogs = async (req, res) => {
  try {
    const logs = await ActionLog.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .populate("task", "title")
      .populate("user", "name");

    return res.status(200).json({
      success: true,
      logs,
    });
  } catch (err) {
    console.lgo(err);
    return res.status(500).json({
      success: false,
      message: "Failed to Fetch logs",
    });
  }
};
