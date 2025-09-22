import jwt from "jsonwebtoken";

const generateToken = async (userid, role) => {
  const { TOKEN_SECRET, TOKEN_EXPIRES_IN } = process.env;
  const token = jwt.sign({ userid, role }, TOKEN_SECRET, {
    expiresIn: TOKEN_EXPIRES_IN,
  });
  return token;
};

export { generateToken };
