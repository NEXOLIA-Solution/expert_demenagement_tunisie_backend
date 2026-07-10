const express = require('express');
const router = express.Router();

const {
  registerVideoCtrl,
  updateVideoCtrl,
  deleteVideoCtrl,
  readOneVideo,
  readAllVideos,
} = require('../../Controllers/GestionWebSiteSections/VideoController.js');

// Importation du middleware de sécurité (Ajustez le chemin relatif si nécessaire)
const { verifyTokenAndAdmin } = require('../../Middlewares/verifyToken');

// ----------------------------------------------------
// Routes Publiques (Accessibles par tout le monde)
// ----------------------------------------------------

// Récupérer toutes les vidéos
router.get('/all', readAllVideos);

// Récupérer une vidéo spécifique par son ID
router.get('/:id', readOneVideo);


// ----------------------------------------------------
// Routes Privées (Réservées uniquement aux Administrateurs)
// ----------------------------------------------------

// Ajouter une nouvelle vidéo -> verifyTokenAndAdmin obligatoire
router.post('/register', verifyTokenAndAdmin, registerVideoCtrl);

// Modifier une vidéo -> verifyTokenAndAdmin obligatoire
router.put('/:id', verifyTokenAndAdmin, updateVideoCtrl);

// Supprimer une vidéo -> verifyTokenAndAdmin obligatoire
router.delete('/:id', verifyTokenAndAdmin, deleteVideoCtrl);

module.exports = router;