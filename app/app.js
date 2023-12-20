// Importations nécessaires
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";

import models from "./models/index.js";
import apiV1Router from "./routes/router.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// http request logger
app.use(morgan("tiny"));
const router = express.Router();

router.get("/hello", async (req, res) => {
  try {
    const data = await models.colocation.findAll({
      include: [
        "users",
        {
          model: models.objective,
          as: "objectives",
          // include: ["task", "outgoing"],
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

// app.use("/api", apiRouter)

// Démarrage du serveur sur le port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
