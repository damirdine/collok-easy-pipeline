import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../helpers/constant.js";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ error: { message: "Unauthorized - Token not provided" } });
  }
  jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ error: { message: "Forbidden - Invalid token" } });
    }
    req.user = user;
    next();
  });
};

export default authMiddleware;
