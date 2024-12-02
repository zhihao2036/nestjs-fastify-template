import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export class SwaggerConfig {
  static init(app) {
    const config = new DocumentBuilder()
      .setTitle('SERVER API')
      .setDescription('The Web server API description')
      .setVersion('1.0')
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs-api', app, documentFactory);
  }
}
