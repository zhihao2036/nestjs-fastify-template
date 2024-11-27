import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  constructor() {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async handleCron() {
    console.log("tick...")
  }
}
