import "reflect-metadata";
import app from "./app";
import dataSource from "./config/db";

const port = 3000;

const startServer = async () => {
  try {
    await dataSource.initialize();
    console.log("Database connection established");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startServer();
