import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const isAuthenticated = (req, res, next) => {
  try {
    //checkng token is available or not
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    //decoding the token

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }

    //checking the user is exist or not
    const user = User.findById(decode.userId).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    //setting the user to the request
    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error ",
    });
  }
};
