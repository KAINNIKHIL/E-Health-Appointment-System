import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASS,
  {
    host: process.env.MYSQL_HOST || "localhost",
    dialect: "mysql",
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`MySQL connected: ${process.env.MYSQL_DB}`);

    await sequelize.sync({ alter: true });
    console.log("All models synced!");
    
    return sequelize;
  } catch (error) {
    console.error("MySQL connection failed:", error.message);
    throw error;
  }
};

export { connectDB, sequelize };
