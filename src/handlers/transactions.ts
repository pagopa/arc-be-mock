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
          payeeTaxCode: "1199250158",
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
          payeeTaxCode: "80014890638",
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
    const usertest = { name: "Matteo Rossi", taxCode: "MTTRSS74B23F205K" };
    pipe(
      E.right({
        carts: [
          {
            amount: "180,00",
            debtor: usertest,
            payee: usertest,
            refNumberType: "1234567",
            refNumberValue: "1234567111111111111",
            subject: "Bollo auto 2023",
          },
        ],
        infoTransaction: {
          amount: "180,00",
          authCode: "111111111000000",
          fee: "1,00",
          origin: OriginEnum.INTERNAL,
          payer: usertest,
          paymentMethod: PaymentMethodEnum.BBT,
          pspName: "Poste SpA",
          rrn: "0000000000000001",
          transactionDate: "30/01/2022",
          transactionId,
          walletInfo: {
            accountHolder: "Mario Rossi",
            blurredNumber: "45******",
            brand: "mastercard",
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
