import authConfig from "@config/auth";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface IPayload {
  id: string;
}

export async function auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não enviado" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, authConfig.secret) as IPayload;

    req.id = decoded.id;
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }

  return next();
}
