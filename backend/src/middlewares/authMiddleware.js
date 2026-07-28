import jwt from "jsonwebtoken";
import Utilisateur from "../models/Utilisateur.js";
import AppError from "../utils/AppError.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Vous n'êtes pas autorisé", 401);
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const utilisateur = await Utilisateur.findById(decoded.id);
    if (!utilisateur) {
      throw new AppError("Aucun utilisateur trouvé", 404);
    }
    req.user = utilisateur;
    next();
  } catch (error) {
    next(error);
  }
};
export default authMiddleware;
