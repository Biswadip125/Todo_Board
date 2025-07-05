import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    minlength: 8,
    require: true,
  },
});

export const User = mongoose.model("User", userSchema);
