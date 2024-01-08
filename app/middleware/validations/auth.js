import { check } from "express-validator";

const authValidator = {
  login: [check("email").isEmail(), check("password").isLength({ min: 8 })],
  register: [check("email").isEmail(), check("password").isLength({ mi: 2 })],
};

export default authValidator;
