import models from "../models/index.js";

const userController = {
  async getAll(req, res) {
    try {
      const users = await models.user.findAll();
      res.json({ data: users });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: { messsage: "Erreur serveur" } });
    }
  },
  async editProfile(req, res) {
    try {
      throw new Error("hello");
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: { messsage: "Erreur serveur" } });
    }
  },
  async deleteProfile(req, res) {
    // if not admin can delete
    try {
      throw new Error("hello");
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: { messsage: "Erreur serveur" } });
    }
  },
  async me(req, res) {
    try {
      const foundUser = await models.user.findByPk(req?.user?.id || 1);
      if (!foundUser) {
        throw new Error("User not found.");
      }
      const { password, ...data } = foundUser.toJSON();
      return res.json({ data });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: {
          message: error.message.includes("User not")
            ? error.message
            : "Internal Server Error",
        },
      });
    }
  },
};
export default userController;
