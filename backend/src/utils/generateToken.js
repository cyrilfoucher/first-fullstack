import jwt from "jsonwebtoken";
const generateToken = (utilisateur) => {
  return jwt.sign(
    { id: utilisateur._id, email: utilisateur.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
};

export default generateToken;
