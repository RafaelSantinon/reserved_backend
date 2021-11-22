import { Request, Response, NextFunction, request } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;

  if (!authToken) return res.status(401).end();

  const token = authToken.split(' ')[1];

  try {
    const { sub } = verify(
      token,
      '208784feb4163b36d766e7cbf8e42206'
    ) as IPayload;

    request.user_id = sub;
  } catch (err) {
    return res.status(401).end();
  }

  return next();
}
