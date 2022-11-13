import { Module } from '@nestjs/common';

import { ReleaseNoteModule } from 'src/models/ReleaseNote/ReleaseNote.module';

import { ReactReleaseNoteFactory } from './factories/react/implementation';

@Module({
  imports: [ReleaseNoteModule],
  providers: [ReactReleaseNoteFactory],
  exports: [ReactReleaseNoteFactory],
})
export class TechnologiesModule {}
