import appInit from "./app";
import { Logger } from "./config/logger.config";

appInit().then((app) => {
  const logger = Logger.Instance;
  app.listen(app.get("port"), app.get("hostname"), () => {
    logger.info(
      `Started on ${app.get("hostname")}:${app.get("port")}${app.get("prefix")}`
    );
  });
});
