import mongoose from "mongoose";

const user_schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    userid: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "manager", "employee"],
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("Users", user_schema);

export default UserModel;
