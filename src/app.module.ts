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
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import * as dayjs from 'dayjs';

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
      cache: true,
      envFilePath: loadEnvFile(),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('MYSQL_HOST'),
        port: parseInt(config.get('MYSQL_PORT')),
        username: config.get('MYSQL_USERNAME'),
        password: config.get('MYSQL_PASSWORD'),
        database: config.get('MYSQL_DATABASE'),
        timezone: config.get('MYSQL_TIMEZONE'),
        // logger: new TypeormLogger(),
        autoLoadEntities: true,
        dateStrings: true,
      }),
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        pinoHttp: {
          // useLevel: config.get('LOG_LEVEL'),
          redact: ['req.headers', 'res.headers'],
          // date fn will slow down Pino's performance.
          timestamp: () => `,"time":"${dayjs().format('YYYY-MM-DD HH:mm:ss')}"`,
          autoLogging: {
            ignore: (req) => req.url === '/health',  // 忽略健康检查接口的日志
          },
          customProps: (req, res) => ({
            context: 'HTTP',
          }),
          customLogLevel: (req, res, err) => {
            if (res.statusCode >= 400 && res.statusCode < 500) {
              return 'warn';
            }
            if (res.statusCode >= 500 || err) {
              return 'error';
            }
            return 'info';
          },
          transport: {
            targets: [
              // log into file
              {
                target: 'pino-roll',
                options: {
                  file: join('logs', 'log'),
                  frequency: 'daily',
                  mkdir: true,
                  dateFormat: 'yyyy-MM-dd',
                  extension: '.log',
                  translateTime: 'yyyy-mm-dd HH:MM:ss',
                },
              },
              // log into shell
              {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  singleLine: true,
                  translateTime: 'yyyy-mm-dd HH:MM:ss',
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
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
