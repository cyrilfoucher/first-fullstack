import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import produitsRoutes from "./routes/produits.routes.js";
import commandesRoutes from "./routes/commande.routes.js";
import ErrorMiddleware from "./middlewares/errorMiddleware.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/produits", produitsRoutes);
app.use("/api/commandes", commandesRoutes);
app.use(ErrorMiddleware);
export default app;
