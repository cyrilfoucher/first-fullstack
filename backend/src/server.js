import "dotenv/config";

import app from "./app.js";
import connectDB from "./config/database.js";

await connectDB();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
