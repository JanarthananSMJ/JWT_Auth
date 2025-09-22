import UserModel from "../models/user_model.js";
import { hashPassword, verifyPassword } from "../utils/password.js";
import { generateToken } from "../utils/token.js";

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

const userLogin = async (req, res) => {
  try {
    const { userid, upassword } = req.body;
    if (userid == "" || upassword == "") {
      return res
        .status(400)
        .json({ message: "All fields are required in Login" });
    }
    const existuser = await UserModel.findOne({ userid }).select(
      "password role"
    );
    if (!existuser) {
      return res.status(404).json({ message: "user Not Found" });
    }
    const { password, role } = existuser;
    const verifiedpassword = await verifyPassword(upassword, password);
    if (!verifiedpassword) {
      return res.status(401).json({ message: "Inavalid Password" });
    }
    const token = await generateToken(userid, role);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });
    res.status(200).json({ message: "User LoggedIn" });
  } catch (error) {
    return res.status(500).json({ message: `Error on User Login - ${error}` });
  }
};
export { userRegister, userLogin };
