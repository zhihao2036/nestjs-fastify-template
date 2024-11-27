import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: FastifyRequest['raw'], res: FastifyReply['raw'], next: () => void) {
    const startAt = process.hrtime();
    const { method, url } = req;
    const userAgent = req.headers['user-agent'] ?? '';
    this.logger.log(`Request ${method} ${url}`);
    next();
  }
}
