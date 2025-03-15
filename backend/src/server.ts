import app from "./app";
import initializeUsers, { initializeAdmin } from "./seeders/init_users";
import { User } from "./models";
import sequelize from "./database/sequelize";

require("dotenv").config();

const PORT = process.env.PORT || 3000;

https.createServer(options, app).listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on https://localhost:${PORT}`);
});
