const jwt = require("jsonwebtoken");

// Middleware de base : Vérifie si l'utilisateur est authentifié via le Token
function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1]; // Récupère le token après "Bearer "
        
        try {
            const decoded = jwt.verify(token, process.env.Token_Secret);
            req.user = decoded; // Stocke les infos du token (id, name, role) dans la requête
            next();
        } catch (error) {
            return res.status(401).json({ message: "Invalid token, access denied" });
        }
    } else {
        return res.status(401).json({ message: "No token provided, access denied" });
    }
}

// Middleware : Vérifie si l'utilisateur est l'auteur de la ressource OU un administrateur
function verifyTokenAndAuthorization(req, res, next) {
    verifyToken(req, res, () => {
        // L'utilisateur peut agir s'il cible son propre ID ou s'il est admin
        if (req.user.id === req.params.id || req.user.role === "admin") {
            next();
        } else {
            return res.status(403).json({ message: "You are not allowed, access denied" });
        }
    });
}

// Middleware : Restreint l'accès uniquement aux Administrateurs
function verifyTokenAndAdmin(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.role === "admin") {
            next();
        } else {
            return res.status(403).json({ message: "Access denied, admin only" });
        }
    });
}

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
};