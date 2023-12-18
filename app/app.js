// Importations nécessaires
import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

import models from "./models/index.js";
import authRouter from "./routes/auth.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const router = express.Router();
router.get("/hello", async (req, res) => {
  try {
    const data = await models.colocation.findAll({
      include: [
        "users",
        {
          model: models.objective,
          as: "objectives",
          include: ["task", "outgoing"],
        },
        "admin_user",
      ],
    });
    res.send({ data: data[0] });
  } catch (error) {
    res.send({ error });
  }
});
app.use("/", router);

app.use("/auth", authRouter);

// app.use("/api", apiRouter)

// Démarrage du serveur sur le port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
