import { RequestHandler } from "express";
import { pipe } from "fp-ts/function";
import * as E from "fp-ts/lib/Either";
import { sendResponseWithData, tupleWith } from "../utils/utils";
import { TokenResponse } from "../generated/arc_be_mock/TokenResponse";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const getOneIdentityDataR = require("../mockresponses/oneidentity.json");

export const getOneIdentityHandler =
  (): RequestHandler =>
  async (_req, res): Promise<void> => {
    pipe(
      E.right(getOneIdentityDataR),
      E.map(TokenResponse.encode),
      tupleWith(res),
      E.fold((_) => res.send(500), sendResponseWithData),
    );
  };
