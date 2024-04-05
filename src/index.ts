import * as http from "http";
import * as App from "./app";
import { logger } from "./logger";
import { config } from "./config";

logger.info(`Endpoint delay: ${config.ENDPOINT_DELAY}ms`);

App.newExpressApp()
  .then((app) => {
    const listeningPorts = [8080, 8081];

    logger.info("Starting pagopa-checkout-be-mock...");

    for (const port of listeningPorts) {
      const server = http.createServer(app);
      server.listen(port);
    }
    logger.info("pagopa-spac-be-mock started.");
  })
  .catch((error) => {
    logger.error(`Error occurred starting server: ${error}`);
  });
