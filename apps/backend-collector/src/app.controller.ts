import { Controller, Get } from '@nestjs/common';

import { ReleaseNote } from './models/ReleaseNote/ReleaseNote.model';
import { CollectorService } from './modules/collector/collector.service';

@Controller()
export class AppController {
  constructor(private readonly collectorService: CollectorService) {}

  @Get('/health-check')
  healthcheck(): string {
    return 'ok';
  }

  @Get('/test')
  test(): Promise<ReleaseNote[]> {
    return this.collectorService.collectAllData();
  }
}
