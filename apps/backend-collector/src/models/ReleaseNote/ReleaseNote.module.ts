import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReleaseNote } from './ReleaseNote.model';
import { ReleaseNoteService } from './ReleaseNote.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReleaseNote])],
  providers: [ReleaseNoteService],
  exports: [ReleaseNoteService],
})
export class ReleaseNoteModule {}
