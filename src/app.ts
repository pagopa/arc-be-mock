import * as express from "express";
import {
  getTransactionDetailHandler,
  getTransactionsHandler,
} from "./handlers/transactions";

export const newExpressApp: () => Promise<Express.Application> = async () => {
  const app = express();
  const router = express.Router();

  app.use(express.json());

  app.use((_req, _res, next) => {
    setTimeout(next, Number(process.env.ENDPOINT_DELAY));
  });

  app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Authorization, Content-Type, Accept",
    );
    res.header("Access-Control-Allow-Methods", [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ]);
    next();
  });

  app.use(router);

  router.get("/transactions/", getTransactionsHandler());
  router.get("/transactions/:transactionId", getTransactionDetailHandler());

  return app;
};
