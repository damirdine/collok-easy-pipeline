// Importations nécessaires
import express from "express";
import bodyParser from "body-parser";

import models from "./models/index.js";
import apiV1Router from "./routes/router.js";
import authRouter from "./routes/auth.js";
import authMiddleware from "./middleware/auth.js";
import taskRouter from "./routes/task.js";
import outgoingRouter from "./routes/outgoing.js";

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

    res.send({ data: data });
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
});
app.use("/", router);

app.use("/api/v1", apiV1Router);

app.use("/auth", authRouter);

app.use("/api/colocation", taskRouter);
app.use("/api/colocation", outgoingRouter);

// app.use("/api", apiRouter)

// Démarrage du serveur sur le port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
