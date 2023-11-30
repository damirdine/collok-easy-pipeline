import express from ('express');
const router = express.Router();
import User from ('../models/user');

// Route pour récupérer tous les utilisateurs
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});


export default router;
