import bcryptjs from "bcryptjs";

const hashPassword = async (password) => {
  try {
    const salt = 10;
    const hashed_password = await bcryptjs.hash(password, salt);
    return hashed_password;
  } catch (error) {
    console.log(`Error on Password Hashing : ${error}`);
  }
};

const verifyPassword = async (upassword, password) => {
  try {
    const verified_password = await bcryptjs.compare(upassword, password);
    return verified_password;
  } catch (error) {
    console.log(`Error on verifying password : ${error}`);
  }
};

export { hashPassword, verifyPassword };
