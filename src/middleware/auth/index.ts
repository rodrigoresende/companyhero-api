require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export async function auth(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers?.authorization;

  if (!authorization) {
    return res.status(401).send({ message: "Not authorized" });
  }

  const [token, secret] = Buffer.from(authorization.split(" ")[1], "base64")
    .toString()
    .split(":");

  // @ts-ignore
  const isValid_token = jwt.verify(token, process.env.SECRET_KEY_JWT);

  // @ts-ignore
  const isValid_secret = jwt.verify(secret, process.env.SECRET_KEY_JWT);

  if (!isValid_token && !isValid_secret) {
    return res.status(401).send({ message: "Not authorized" });
  }

  return next();
}
