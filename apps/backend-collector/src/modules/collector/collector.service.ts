import { Injectable } from '@nestjs/common';

import { ReactReleaseNoteFactory } from 'src/technologies/factories/react/implementation';

@Injectable()
export class CollectorService {
  constructor(
    private readonly reactReleaseNoteFactory: ReactReleaseNoteFactory,
  ) {}

  async collectAllData() {
    const reactReleaseNotes =
      await this.reactReleaseNoteFactory.getNewReleaseNotes();

    const releaseNotes = [...reactReleaseNotes];

    //TODO: connection count locker (smth about 50 per time)
    await Promise.all(
      releaseNotes.map(async (releaseNote) => {
        await releaseNote.save();
      }),
    );

    return releaseNotes;
  }
}
