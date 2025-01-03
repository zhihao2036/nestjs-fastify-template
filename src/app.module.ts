import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { loadEnvFile } from './common/utils/env-load';
import { AppController } from './app.controller';
import { ThrottlerModule } from '@nestjs/throttler';
import { CoreModule } from './common/module/core.module';
import { LoggerModule } from 'nestjs-pino';
import { HelloModule } from './hello/hello.module';
import { join } from 'path';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: loadEnvFile(),
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        pinoHttp: {
          useLevel: config.get('LOG_LEVEL'),
          transport: {
            targets: [
              // remove this config to get logs in console
              {
                target: 'pino-roll',
                options: {
                  file: join('logs', 'log'),
                  frequency: 'daily',
                  mkdir: true,
                  dateFormat: 'yyyy-MM-dd',
                  extension: '.log',
                },
              },
            ],
          },
        },
      }),
    }),
    CoreModule,
    TaskModule,
    HelloModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
