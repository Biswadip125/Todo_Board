import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  // checking all fields are present or not
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  try {
    //checking user is alerady exist or not
    const existedUser = await User.findOne({
      email,
    });

    if (existedUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists please login",
      });
    }
    //checking the password is 8 characters long or not
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password should be minimum 8 characters long",
      });
    }

    //hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //creating the user
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User Created Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error ",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const existedUser = await User.findOne({ email });

    if (!existedUser) {
      return res.status(400).json({
        success: false,
        message: "Incorrect username or password",
      });
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      existedUser.password
    );

    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        message: "Incorrect username or pasoword",
      });
    }

    const token = generateToken(existedUser._id);

    res.cookie("token", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return res.status(200).json({
      success: true,
      message: `Welcome back ${existedUser.name}`,
      id: existedUser._id,
      name: existedUser.name,
      email: existedUser.email,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "").status(200).json({
    success: true,
    messsage: "User logged out Successfully",
  });
};
