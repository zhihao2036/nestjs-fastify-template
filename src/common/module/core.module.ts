import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpTransformInterceptor } from '../interceptors/http-transform.interceptor';

@Module({
  providers: [{ provide: APP_INTERCEPTOR, useClass: HttpTransformInterceptor }],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
