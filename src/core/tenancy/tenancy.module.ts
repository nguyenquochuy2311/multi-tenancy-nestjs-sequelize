import { CONNECTION, connectDB } from '@core/helpers/database.helper';
import { Global, Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request as ExpressRequest } from 'express';

const connectionFactory = {
  provide: CONNECTION,
  scope: Scope.REQUEST,
  useFactory: (req: ExpressRequest & { workspaceID: string }) => {
    return connectDB(req.workspaceID);
  },
  inject: [REQUEST],
};

@Global()
@Module({
  providers: [connectionFactory as any],
  exports: [CONNECTION as any],
})
export class TenancyModule {}
