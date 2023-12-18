import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import models from "../models/index.js";

const SALT_ROUNDS = 10;
const { JWT_SECRET_KEY, JWT_EXPIRED_IN } = process.env;

const authController = {
  async register(req, res) {
    try {
      const body = req.body;

      const foundUser = await models.user.findOne({
        where: { email: body?.email },
      });
      if (foundUser) {
        return res.status(400).json({ message: "User email already exists" });
      }
      // Hash the password
      const hashedPassword = await bcrypt.hash(body?.password, SALT_ROUNDS);

      // Save user to the database
      const user = Object.assign({ ...body }, { password: hashedPassword });
      const userCreated = await models.user.create(user);

      const { password, ...userJWT } = userCreated.toJSON();
      const token = jwt.sign({ ...userJWT }, JWT_SECRET_KEY || "secret", {
        expiresIn: JWT_EXPIRED_IN || "3d",
      });

      return res
        .status(201)
        .json({ message: "Registration successful", token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  async login(req, res) {
    return res.send({ user: {}, token: "" });
  },
};

export default authController;
