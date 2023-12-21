import models from "../models/index.js";

export const getColocations = async (req, res) => {
  try {
    const data = await models.colocation.findAll();
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getColocationById = async (req, res) => {
  const { colocationID } = req.params;
  try {
    const data = await models.colocation.findByPk(colocationID);
    if (data) {
      res.json({ data });
    } else {
      res.status(404).json({ error: "Colocation not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createColocation = async (req, res) => {
  const { name, admin_user_id } = req.body;

  try {
    // if (!name || !admin_user_id) {
    //   // Besoin de détail + la gestion d'erreur ? vérification des types ? 
    //   return res.status(400).json({ error: "Bad Request - Name and admin_user_id are required." });
    // }

    const data = await models.colocation.create({
      name,
      admin_user_id,
    });
    await data.reload();
    res.status(201).json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getColocationByAdmin = async (req, res) => {
  const { adminUserId } = req.params;

  try {
    const data = await models.colocation.findOne({
      where: { admin_user_id: adminUserId }
    });

    if (data) {
      res.json({ data });
    } else {
      res.status(404).json({ error: "Colocation not found for admin user" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateColocationAdmin = async (req, res) => {
  const { colocationID } = req.params;
  const { newAdminID } = req.body;

  try {
    const data = await models.colocation.findByPk(colocationID);
    if (data) {
      await data.update({ "admin_user_id" : newAdminID });
      // penser a reload pour mettre a jour l'affichage de l'updatetime
      await data.reload();
      res.json({ data });
    } else {
      res.status(404).json({ error: "Colocation not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const addColocationMember = async (req, res) => {
  const { colocationID } = req.params;
  const { user_id } = req.body;

  try {
    const data = await models.user.findByPk(user_id);

    if (data) {
      // Si le USER est deja assigné a une Colocation , on la remplace directement ?
      if (data.colocation_id !== colocationID) {
        await data.update({
          "colocation_id" : colocationID
        });
        // On renvoie le user updated , devrions nous renvoyer la coloc a laquelle il appartient maintenant ? 
        await data.reload();
        res.json({ data });
      } else {
        res.json({ message: "User is already a member of the colocation." });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const deleteColocationMember = async (req, res) => {
  const { colocationID } = req.params;
  const { user_id } = req.body;
  try {
    const user = await models.user.findByPk(user_id);
    const userData = user.dataValues;
    
    if (userData) {
      if (userData.colocation_id && userData.colocation_id == colocationID) {
        await user.update({ colocation_id: null });
        // a voir quelle retour vous voulez sur un delete
        res.json({ data : {
          message: "User removed from the colocation successfully."
        }});
      } else {
        res.status(404).json({ error: "User is not a member of the colocation." });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

