import models from "../models/index.js";

const outgoingController = {
  async getOutgoingsByColocation(req, res) {
    try {
      const colocationId = req.params.colocationId;

      const outgoings = await models.outgoing.findAll({
        include: [
          {
            model: models.objective,
            where: { colocation_id: colocationId },
            required: true,
          },
        ],
      });

      res.json(outgoings);
    } catch (error) {
      res
        .status(500)
        .send({ error: "Erreur lors de la récupération des factures." });
    }
  },
};

export default outgoingController;
