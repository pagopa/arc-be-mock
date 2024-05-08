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

export const getTransactionsHandler =
  (): RequestHandler =>
  async (_req, res): Promise<void> => {
    pipe(
      E.right([
        {
          amount: "180,00",
          isCart: true,
          payedByMe: true,
          payeeName: "Comune di Milano",
          payeeTaxCode: "MI_XXX",
          registeredToMe: true,
          transactionDate: "27/03/2024",
          transactionId: "1",
        },
        {
          amount: "65,20",
          isCart: true,
          payedByMe: false,
          registeredToMe: true,
          transactionDate: "10/08/2022",
          transactionId: "2",
        },
        {
          amount: "199,99",
          isCart: true,
          payedByMe: true,
          payeeName: "Comune di Napoli",
          payeeTaxCode: "NA_XXX",
          registeredToMe: false,
          transactionDate: "01/01/2001",
          transactionId: "3",
        },
      ]),
      E.map(TransactionsResponse.encode),
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
          origin: OriginEnum.INTERNAL,
          payer: { name: "string", taxCode: "string" },
          paymentMethod: PaymentMethodEnum.BBT,
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
      }),
      E.map(TransactionDetailResponse.encode),
      tupleWith(res),
      E.fold((_) => res.send(500), sendResponseWithData),
    );
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
