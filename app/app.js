// Importations nécessaires
import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './database/db.js'; 
import userRoutes from './routes/UserRoutes.js';
import setupAssociations from './models/associations.js';

setupAssociations();

sequelize.sync()
    .then(() => {
        console.log('Modèles synchronisés avec la base de données');
    })
    .catch((error) => {
        console.error('Erreur de synchronisation', error);
    });
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', userRoutes);


// Authentification à la base de données
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });



// Démarrage du serveur sur le port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
