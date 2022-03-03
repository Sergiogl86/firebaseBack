import * as express from "express";

import Debug from "debug";

const debug = Debug("instaface:error");

const noEncontradoHandler = (req: express.Request, res: express.Response) => {
  res.status(404).json({ error: "Endpoint no encontrado!" });
};

// eslint-disable-next-line no-unused-vars
const finalErrorHandler = (
  error: { message?: string; code?: number },
  req: express.Request,
  res: express.Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: any
) => {
  debug("Ha ocurrido un error: ", error.message);
  const message = error.code ? error.message : "Error General";
  res.status(error.code || 500).json({ error: message });
};

export { noEncontradoHandler, finalErrorHandler };
