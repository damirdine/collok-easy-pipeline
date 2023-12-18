import models from "../models/index.js";

const authController = {
  async register(req, res) {
    const user = await models.user.findAll();
    return res.send({ user: user[0], token: "" });
  },
  async login(req, res) {
    return res.send({ user: {}, token: "" });
  },
};

export default authController;
