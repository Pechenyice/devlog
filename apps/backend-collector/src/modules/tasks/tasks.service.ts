import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { CollectorService } from '../collector/collector.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly collectorService: CollectorService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCollectNewData() {
    try {
      await this.collectorService.collectAllData();
    } catch (e) {
      this.logger.error('[TasksService] error during collecting new data', {
        e,
      });
    }
  }
}
