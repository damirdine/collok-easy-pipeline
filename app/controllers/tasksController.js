import db from "../models/index.js";
const { sequelize, task, objective } = db;

const tasksController = {
  async getTasksByColocation(req, res) {
    try {
      const colocationId = req.params.colocationId;

      const tasks = await task.findAll({
        include: [
          {
            model: objective,
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
  },

  async getTask(req, res) {
    try {
      const { taskId, colocationId } = req.params;

      const taskInstance = await db.task.findOne({
        where: { id: taskId },
        include: [
          {
            model: db.objective,
            as: "objective",
            attributes: ["name", "deadline", "created_by", "is_completed"],
            required: true,
            include: [
              {
                model: db.user,
                as: "assigned_users",
                through: { attributes: [] },
                attributes: ["id", "firstname", "lastname", "avatar"],
              },
            ],
            where: { colocation_id: colocationId },
          },
        ],
      });

      if (!taskInstance) {
        return res
          .status(404)
          .send({ error: "Tâche non trouvée dans cette colocation." });
      }

      res.json(taskInstance);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ error: "Erreur lors de la récupération de la tâche." });
    }
  },

  async updateTask(req, res) {
    try {
      const { taskId, colocationId } = req.params;
      const updateData = req.body; // Les données à mettre à jour

      const task = await db.task.findByPk(taskId, {
        include: [{ model: db.objective, as: "objective" }],
      });
      if (!task) {
        return res.status(404).send({ error: "Tâche non trouvée." });
      }
      // Mise à jour de l'objective si nécessaire
      if (
        updateData.is_completed !== undefined ||
        updateData.name !== undefined ||
        updateData.deadline !== undefined
      ) {
        const objectiveUpdate = {};
        if (updateData.is_completed !== undefined)
          objectiveUpdate.is_completed = updateData.is_completed;
        if (updateData.name !== undefined)
          objectiveUpdate.name = updateData.name;
        if (updateData.deadline !== undefined)
          objectiveUpdate.deadline = updateData.deadline;

        await task.objective.update(objectiveUpdate);
      }

      // Vérifiez si la mise à jour concerne la task
      if (updateData.estimated_duration !== undefined) {
        // Mettez à jour la task
        await task.update({
          estimated_duration: updateData.estimated_duration,
        });
      }

      res.send({ message: "Tâche mise à jour avec succès." });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ error: "Erreur lors de la mise à jour de la tâche." });
    }
  },
};

export default tasksController;
