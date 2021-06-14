import { NextFunction, Request, Response } from 'express';

const tokenExtractor = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  if (Object.getOwnPropertyNames(request.headers).includes('authorization')) {
    const authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      const token = authorization.substring(7);
      Object.assign(request, { token });
    }
  }
  return next();
};

export = {
  tokenExtractor,
};
