import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface Payload {
  sub: string;
};

function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(token, '19abcf1b1517b81c3c1ed8b4e9e2123b') as Payload;

    request.user_id = sub;

    return next();
  }
  catch (error) {
    return response.status(401).end();
  }
}

export default ensureAuthenticated;
