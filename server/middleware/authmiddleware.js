import jwt from "jsonwebtoken";

const verifyTokenMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(404).json({ message: "No Token" });
    }
    const decode = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decode;
  } catch (error) {
    return res.status(401).json({ Error: `Unauthorized - ${error}` });
  }
};

export default verifyTokenMiddleware;
