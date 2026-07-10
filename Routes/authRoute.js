const express = require('express');
const router = express.Router();

const { 
  registerCtel, 
  loginCtrl, 
  verifyCodeCtrl
} = require('../Controllers/authController'); 

// Importation des middlewares de sécurité
const { 
  verifyToken, 
  verifyTokenAndAdmin, 
  verifyTokenAndAuthorization 
} = require('../Middlewares/verifyToken');

// ----------------------------------------------------
// Routes Publiques (Authentification et MFA)
// ----------------------------------------------------

// Inscription d'un nouvel utilisateur
router.route('/register').post(registerCtel);

// Première étape de connexion (Vérification email/pass + Envoi du code MFA)
router.route('/login').post(loginCtrl);

// Deuxième étape de connexion (Validation du code + Génération du JWT)
router.route('/verify-code').post(verifyCodeCtrl);


module.exports = router;