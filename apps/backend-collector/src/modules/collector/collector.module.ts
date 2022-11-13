import { Module } from '@nestjs/common';

import { TechnologiesModule } from 'src/technologies/technologies.module';

import { CollectorService } from './collector.service';

@Module({
  imports: [TechnologiesModule],
  providers: [CollectorService],
  exports: [CollectorService],
})
export class CollectorModule {}
