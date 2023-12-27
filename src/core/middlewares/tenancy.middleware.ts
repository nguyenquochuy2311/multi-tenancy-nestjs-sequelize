import { UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

const TENANT_HEADER = 'workspaceid';

export function tenancyMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  if (req.url === '/workspace') return next();

  if (!req.headers[TENANT_HEADER]) {
    throw new UnauthorizedException();
  }

  (req as any).workspaceID = req.headers[TENANT_HEADER];

  return next();
}
