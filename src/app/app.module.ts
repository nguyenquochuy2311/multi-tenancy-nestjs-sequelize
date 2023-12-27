import { TenancyModule } from '@core/tenancy/tenancy.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './modules/board/board.module';
import { WorkspaceModule } from './modules/workspace/workspace.module';

@Module({
  imports: [WorkspaceModule, TenancyModule, BoardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
