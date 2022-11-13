import { ReleaseNote } from 'src/models/ReleaseNote/ReleaseNote.model';

export abstract class AbstractReleaseNoteFactory {
  abstract releaseNoteFactoryId: string;

  abstract getAllReleaseNotes(): Promise<ReleaseNote[]>;

  abstract filterNewReleaseNotes(
    releaseNoteEntities: ReleaseNote[],
  ): Promise<ReleaseNote[]>;

  abstract getNewReleaseNotes(): Promise<ReleaseNote[]>;

  abstract getReleaseNoteTitle(releaseNote: any, page: any): Promise<string>;

  abstract getReleaseNoteDate(releaseNote: any, page: any): Promise<Date>;

  abstract getReleaseNoteLink(releaseNote: any, page: any): Promise<string>;

  abstract getReleaseNotePreview(page: any): Promise<string>; // path to image or default technology image

  abstract getReleaseNoteLegend(page: any): Promise<string>; // first words
}
