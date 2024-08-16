import { NextFunction, Request, Response } from "express";

export async function middlewareCheckOrigin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const origin = req.headers.host;
  console.log("origin: ", origin);

  if (origin === "localhost:3000") {
    next();
  }

  res.status(403).json({ message: "You are not allowed" });
}
