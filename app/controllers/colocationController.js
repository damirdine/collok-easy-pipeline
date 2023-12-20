// controllers/colocationController.js
import models from "../models/index.js";

export const getColocations = async (req, res) => {
  try {
    const data = await models.colocation.findAll();
    res.json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getColocationById = async (req, res) => {
  const { colocationId } = req.params;
  try {
    const colocation = await models.colocation.findByPk(colocationId);
    if (colocation) {
      res.json({ colocation });
    } else {
      res.status(404).json({ error: "Colocation not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createColocation = async (req, res) => {
  const { name, admin_user_id } = req.body;

  try {
    const colocation = await models.colocation.create({
      name,
      admin_user_id,
    });

    res.status(201).json({ colocation });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getColocationByAdmin = async (req, res) => {
  const { adminUserId } = req.params;

  try {
    const colocation = await models.colocation.findOne({
      where: { admin_user_id: adminUserId }
    });

    if (colocation) {
      res.json({ colocation });
    } else {
      res.status(404).json({ error: "Colocation not found for admin user" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateColocationAdmin = async (req, res) => {
  const { colocationId } = req.params;
  const { admin_user_id } = req.body;

  try {
    const colocation = await models.colocation.findByPk(colocationId);
    console.log(colocation)
    if (colocation) {
      await colocation.update({ admin_user_id });
      res.json({ colocation });
    } else {
      res.status(404).json({ error: "Colocation not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// A tester
export const addColocationMember = async (req, res) => {
  const { colocationId } = req.params;
  const { user_id } = req.body;

  try {
    const user = await models.user.findByPk(user_id);

    if (user) {
      // Si le USER est deja assigné a une Colocation , on la remplace directement ?
      if (user.colocation_id !== colocationId) {
        await user.update({
          "colocation_id" : colocationId
        });
        res.json({ user });
      } else {
        res.json({ message: "User is already a member of the colocation." });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const deleteColocationMember = async (req, res) => {
  const { colocationId } = req.params;
  const { user_id } = req.body;
  try {
    const user = await models.user.findByPk(user_id);
    const userData = user.dataValues;
    
    if (userData) {
      if (userData.colocation_id && userData.colocation_id == colocationId) {
        await user.update({ colocation_id: null });
        res.json({ message: "User removed from the colocation." });
      } else {
        res.status(404).json({ error: "User is not a member of the colocation." });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

