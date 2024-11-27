import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpTransformInterceptor } from '../interceptors/http-transform.interceptor';
import { HttpLoggerMiddleware } from '../middleware/http-logger.middleware';

@Module({
  providers: [{ provide: APP_INTERCEPTOR, useClass: HttpTransformInterceptor }],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
