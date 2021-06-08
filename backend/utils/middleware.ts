import { NextFunction, Request, Response } from 'express';
import { HookNextFunction } from 'mongoose';

const tokenExtractor = (
  request: Request,
  _response: Response,
  next: HookNextFunction | NextFunction
) => {
  if (Object.getOwnPropertyNames(request.headers).includes('authorization')) {
    const authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      const token = authorization.substring(7);
      Object.assign(request, { token });
      return;
    } else {
      return null;
    }
  }
  next();
};

module.exports = {
  tokenExtractor,
};
