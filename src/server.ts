import appInit from "./app";
import { Logger } from "./config/logger.config";

appInit().then((app) => {
  const logger = Logger.Instance;
  app.listen(app.get("port"), () => {
    logger.info(
      `Started on :${app.get("port")}${app.get("prefix")}`
    );
  });
});
