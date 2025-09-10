import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "../db/index.js";

dotenv.config({ path: "./.env" });

const startServer = async () => {
  try {
    await connectDB(); // Connect to MySQL
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("MySQL connection failed:", error);
    process.exit(1);
  }
};

startServer();
