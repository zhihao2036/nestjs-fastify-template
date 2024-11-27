import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { ConfigModule } from '@nestjs/config';
import { loadEnvFile } from './common/utils/config';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: loadEnvFile(),
    }),
    CoreModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
