import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReleaseNote } from './ReleaseNote.model';

@Injectable()
export class ReleaseNoteService {
  constructor(
    @InjectRepository(ReleaseNote)
    private releaseNotesRepository: Repository<ReleaseNote>,
  ) {}

  async getLatestTechnologeReleaseNote(technologyId: string) {
    return this.releaseNotesRepository.findOne({
      where: { releaseNoteFactoryId: technologyId },
      order: {
        date: 'DESC',
      },
    });
  }
}
