import { RequestHandler } from "express";
import { pipe } from "fp-ts/function";
import * as E from "fp-ts/lib/Either";
import { sendResponseWithData, tupleWith } from "../utils/utils";

export const getTransactionsHandler =
  (): RequestHandler =>
  async (_req, res): Promise<void> => {
    pipe(
      E.right({
        data: [
          {
            amount: "180,00",
            isCart: true,
            payeeName: "Comune di Milano",
            payeeTaxCode: "XXX",
            transactionDate: "27/03/2024",
            transactionId: "1234",
          },
        ],
      }),
      // E.map(TransactionResponse.encode),
      tupleWith(res),
      E.fold((_) => res.send(500), sendResponseWithData),
    );
  };

export const getTransactionDetailHandler =
  (): RequestHandler =>
  async (req, res): Promise<void> => {
    const { transactionId } = req.params;
    pipe(
      E.right({
        data: {
          carts: [
            {
              amount: "180,00",
              debtor: { name: "string", taxCode: "string" },
              payee: { name: "string", taxCode: "string" },
              refNumberType: "string",
              refNumberValue: "string",
              subject: "string",
            },
          ],
          infoTransaction: {
            amount: "string",
            authCode: "string",
            fee: "string",
            origin: "INTERNAL",
            payer: { name: "string", taxCode: "string" },
            paymentMethod: "BBT",
            pspName: "string",
            rrn: "string",
            transactionDate: "string",
            transactionId,
            walletInfo: {
              accountHolder: "string",
              blurredNumber: "string",
              brand: "string",
            },
          },
        },
      }),
      // E.map(TransactionResponseDetail.encode),
      tupleWith(res),
      E.fold((_) => res.send(500), sendResponseWithData),
    );
  };
