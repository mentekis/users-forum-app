import { Request, Response, NextFunction } from "express";

export async function middlewareCheckOrigin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const origin = req.headers.host;
  console.log("origin name: ", origin);

  if (origin === "103.52.114.161:3000") {
    return next();
  }
  res.status(403).json({ message: "You are not allowed", origin });
}
