import { Controller, Get } from '@nestjs/common';
import { HelloService } from './hello.service';
import { Throttle } from '@nestjs/throttler';

@Controller('hello')
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Get()
  findAll() {
    return this.helloService.findAll();
  }
}
