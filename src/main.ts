import { AppModule } from '@app/app.module';
import { CONFIG } from '@config/index';
import { tenancyMiddleware } from '@core/middlewares/tenancy.middleware';
import { NestFactory } from '@nestjs/core';

(async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);

  app.use(tenancyMiddleware);

  await app.listen(CONFIG.PORT);
})();
