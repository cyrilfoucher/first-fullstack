import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import produitsRoutes from "./routes/produits.routes.js";
import commandesRoutes from "./routes/commande.routes.js";
import stripeRoutes from "./routes/stripe.routes.js";
import ErrorMiddleware from "./middlewares/errorMiddleware.js";

const app = express();

app.use(cors());
app.use("/api/stripe/webhook", express.raw({ type: "application/json" }));
app.use((req, res, next) => {
  if (req.originalUrl === "/api/stripe/webhook") {
    return next();
  }

  express.json()(req, res, next);
});

app.use("/api/auth", authRoutes);
app.use("/api/produits", produitsRoutes);
app.use("/api/commandes", commandesRoutes);
app.use("/api/stripe", stripeRoutes);

app.use(ErrorMiddleware);

export default app;
