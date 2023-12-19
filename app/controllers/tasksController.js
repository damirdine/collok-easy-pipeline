import models from "../models/index.js";

const getTasksByColocation = async (req, res) => {
  try {
    const colocationId = req.params.colocationId;

    const tasks = await models.task.findAll({
      include: [
        {
          model: models.objective,
          where: { colocation_id: colocationId },
          required: true,
        },
      ],
    });

    res.json(tasks);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Erreur lors de la récupération des tâches." });
  }
};

export default getTasksByColocation;
