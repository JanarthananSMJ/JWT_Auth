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

export { hashPassword };
