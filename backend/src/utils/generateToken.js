import jwt from "jsonwebtoken";
const generateToken = (utilisateur) => {
  return jwt.sign(
    { id: utilisateur._id, email: utilisateur.email, role: utilisateur.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
};

export default generateToken;
