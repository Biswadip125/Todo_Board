import { User } from "../models/user.model.js";

export const getOtherUsers = async (req, res) => {
  try {
    const loggedInUserID = req.user._id;
    const otherUsers = await User.find({ _id: { $ne: loggedInUserID } }).select(
      "-password"
    );
    return res.status(200).json({
      success: true,
      otherUsers,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
