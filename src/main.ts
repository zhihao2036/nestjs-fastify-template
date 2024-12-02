import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import helmet from '@fastify/helmet';
import fastifyCsrf from '@fastify/csrf-protection';
import { SwaggerConfig } from './common/plugins/swaggerConfig';
import { Logger } from 'nestjs-pino';
import { IdUtil } from './common/utils/IdUtil';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      // Define a custom request id function
      genReqId: (req) => {
        const existingID = req.id ?? req.headers['x-request-id'];
        if (existingID) return existingID;
        const id = IdUtil.getSimpleUUID();
        return id;
      },
    }),
    { bufferLogs: true },
  );
  app.useGlobalPipes(new ValidationPipe());

  if (process.env.NODE_ENV !== 'production') {
    SwaggerConfig.init(app);
  }

  app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });

  app.register(fastifyCsrf);

  app.useLogger(app.get(Logger));

  await app.listen({
    port: +process.env.NODE_PORT,
    host: process.env.NODE_HOST,
  });

  console.log(`Application is running on: ${await app.getUrl()}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
