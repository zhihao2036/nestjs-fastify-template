import { Injectable, Logger } from '@nestjs/common';
import { IdUtil } from 'src/common/utils/id-util';

@Injectable()
export class HelloService {
  private readonly logger = new Logger(HelloService.name);

  findAll() {
    const id = IdUtil.getSnowflakeID();
    this.logger.log(`HELLO WORLD ${id}`);
    return `HELLO WORLD ${id}`;
  }
}
