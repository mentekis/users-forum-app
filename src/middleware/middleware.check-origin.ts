import { Request, Response, NextFunction } from "express";
import { env } from "../utils/envalid/env";

export async function middlewareCheckOrigin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const origin = req.headers.host;

  if (origin === `${env.HOST}:3000`) {
    return next();
  }
  res.status(403).json({ message: "You are not allowed", origin });
}
