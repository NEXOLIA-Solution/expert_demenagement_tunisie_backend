const mongoose = require('mongoose');
require('dotenv').config();

// Récupération de l'URL depuis les variables d'environnement
const dbURI = process.env.DB_Online_URL;

if (!dbURI) {
    console.error("❌ Erreur : DB_URL n'est pas définie dans le fichier .env");
    process.exit(1);
}

// Configuration et options de connexion Mongoose
mongoose.connect(dbURI)
    .then(() => {
        // Extraction du type de base pour un affichage propre dans les logs
        const isAtlas = dbURI.includes('mongodb+srv');
        console.log(`✅ Connexion réussie à MongoDB (${isAtlas ? 'Atlas / Cloud' : 'Locale'}).`);
    })
    .catch((error) => {
        console.error("❌ Échec de la connexion à la base de données :");
        console.error(error.message);
        process.exit(1); // Arrête le serveur si la connexion échoue
    });

module.exports = mongoose.connection;