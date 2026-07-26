import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/database.js";

dotenv.config();

await connectDB();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
