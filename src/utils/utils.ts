import { Response } from "express";
import { Either, map } from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import ReadableStream = NodeJS.ReadableStream;

export const splitAt: (index: number, x: string) => ReadonlyArray<string> = (
  index: number,
  x: string,
) => [x.slice(0, index), x.slice(index)];

export const tupleWith: <A, D, E>(
  v: D,
) => (fa: Either<E, A>) => Either<E, readonly [A, D]> =
  <A, D, E>(v: D): ((e: Either<E, A>) => Either<E, readonly [A, D]>) =>
  (e: Either<E, A>): Either<E, readonly [A, D]> =>
    pipe(
      e,
      map((r) => [r, v]),
    );

export const sendResponseWithData: <Data, Locals extends Record<string, Data>>([
  response,
  data,
]: readonly [Data, Response<Data, Locals>]) => Response<Data, Locals> = ([
  data,
  response,
]) => response.send(data);

export const streamToString: (stream: ReadableStream) => Promise<string> = (
  stream,
) => {
  // eslint-disable-next-line functional/prefer-readonly-type
  const chunks: Buffer[] = [];
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line functional/immutable-data
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on("error", (err) => reject(err));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
};
