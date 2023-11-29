// Importations nécessaires
import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const router = express.Router();
router.get("/", (req, res) => {
  res.send("hello");
});
app.use("/", router);

// Authentification à la base de données



// Démarrage du serveur sur le port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
