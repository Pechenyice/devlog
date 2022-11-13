import { Module } from '@nestjs/common';
import { CollectorModule } from '../collector/collector.module';

import { TasksService } from './tasks.service';

@Module({
  imports: [CollectorModule],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
