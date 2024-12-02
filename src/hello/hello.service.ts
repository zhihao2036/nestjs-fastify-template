import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class HelloService {
  private readonly logger = new Logger(HelloService.name);

  findAll() {
    this.logger.log('HELLO WORLD log');
    return `HELLO WORLD`;
  }
}
