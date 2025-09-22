import UserModel from "../models/user_model.js";
import { hashPassword } from "../utils/password.js";

const userRegister = async (req, res) => {
  try {
    const { username, userid, password, role } = req.body;
    if (username == "" || userid == "" || password == "" || role == "") {
      return res
        .status(400)
        .json({ message: "All fields are required in register" });
    }
    const existuser = await UserModel.findOne({ userid });
    if (existuser) {
      return res.status(409).json({ message: "user already registered" });
    }
    const hashedpassword = await hashPassword(password);
    const new_user = new UserModel({
      username,
      userid,
      password: hashedpassword,
      role,
    });
    new_user.save();
    res.status(201).json({ message: "User Registed" });
  } catch (error) {
    return res
      .status(500)
      .json({ Error: `Error on Registering User : ${error}` });
  }
};

export { userRegister };
