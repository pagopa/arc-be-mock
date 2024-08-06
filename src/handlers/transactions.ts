import { RequestHandler } from "express";
import { pipe } from "fp-ts/function";
import * as E from "fp-ts/lib/Either";
import { sendResponseWithData, tupleWith } from "../utils/utils";
import { TransactionsResponse } from "../generated/arc_be_mock/TransactionsResponse";
import { TransactionDetailResponse } from "../generated/arc_be_mock/TransactionDetailResponse";
import {
  OriginEnum,
  PaymentMethodEnum,
} from "../generated/arc_be_mock/InfoTransaction";
import { TransactionReceiptResponse } from "../generated/arc_be_mock/TransactionReceiptResponse";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const getTransactionsDataR = require("../mockresponses/getTransactions.json");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const getTransactionDetailR = require("../mockresponses/getTransactionDetail.json");

export const getTransactionsHandler =
  (): RequestHandler =>
  async (_req, res): Promise<void> => {
    pipe(
      E.right(getTransactionsDataR),
      E.map(TransactionsResponse.encode),
      tupleWith(res),
      E.fold((_) => res.send(500), sendResponseWithData),
    );
  };

export const getTransactionDetailHandler =
  (): RequestHandler =>
  async (req, res): Promise<void> => {
    const { transactionId } = req.params;

    const infoTransaction = {
      ...getTransactionDetailR.infoTransaction,
      origin: OriginEnum.INTERNAL,
      paymentMethod: PaymentMethodEnum.BBT,
      transactionId,
    };
    const getTransactionDetailRComputed = {
      ...getTransactionDetailR,
      infoTransaction,
    };
    if (transactionId === "401") {
      pipe(E.right(res.send(401)));
    } else {
      pipe(
        E.right(getTransactionDetailRComputed),
        E.map(TransactionDetailResponse.encode),
        tupleWith(res),
        E.fold((_) => res.send(500), sendResponseWithData),
      );
    }
  };

export const getTransactionReceiptHandler =
  (): RequestHandler =>
  async (_req, res): Promise<void> => {
    const pdfUrl = `https://raw.githubusercontent.com/pagopa/pagopa-arc-be-mock/develop/public/receipt.pdf`;
    pipe(
      E.right({
        attachments: [
          {
            content_type: "application/pdf",
            id: "id_allegato",
            name: "ricevuta 1",
            url: pdfUrl,
          },
        ],
      }),
      E.map(TransactionReceiptResponse.encode),
      tupleWith(res),
      E.fold((_) => res.send(500), sendResponseWithData),
    );
  };
