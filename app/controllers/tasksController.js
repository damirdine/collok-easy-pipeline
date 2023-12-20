import db from "../models/index.js";
const { sequelize, task, objective } = db; // Extrayez les modèles ici

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

      const taskInstance = await task.findOne({
        // Utilisez task ici au lieu de models.task
        where: { id: taskId },
        include: [
          {
            model: objective,
            as: "objective", // Assurez-vous que cet alias correspond à l'alias défini dans l'association
            where: { colocation_id: colocationId },
            required: true,
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
      res
        .status(500)
        .send({ error: "Erreur lors de la récupération de la tâche." });
    }
  },

  async updateTaskStatus(req, res) {
    const { taskId, colocationId } = req.params;
    const { isCompleted } = req.body;

    const t = await sequelize.transaction();

    try {
      const taskInstance = await task.findOne({
        // Utilisez task ici au lieu de models.task
        where: { id: taskId },
        include: [
          {
            model: objective, // Utilisez objective ici
            where: { colocation_id: colocationId },
            required: true,
          },
        ],
        transaction: t,
      });

      if (!taskInstance) {
        await t.rollback();
        throw new Error(
          "Task not found or does not belong to the specified colocation."
        );
      }

      taskInstance.is_completed = isCompleted;
      await taskInstance.save({ transaction: t });

      await t.commit();
      res
        .status(200)
        .send({ message: "Statut de la tâche mis à jour avec succès." });
    } catch (error) {
      await t.rollback();
      res.status(500).send({
        error:
          error.message ||
          "Erreur lors de la mise à jour du statut de la tâche.",
      });
    }
  },
};

export default tasksController;
