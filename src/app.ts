import express from "express";
import routeBuilder from "./routes/index";

const initApp = async () => {
  const app = express();

  app.set("port", process.env.PORT || 8000);
  app.set("hostname", process.env.HOSTNAME);
  app.set("prefix", "/api");

  app.use(express.json());

  app.use('/api', await routeBuilder());

  return app;
};

export default initApp;
