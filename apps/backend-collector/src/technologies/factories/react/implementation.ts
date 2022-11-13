import { Injectable, Logger } from '@nestjs/common';
import { Page, ElementHandle } from 'puppeteer';

import { ReleaseNote } from 'src/models/ReleaseNote/ReleaseNote.model';
import { ReleaseNoteService } from 'src/models/ReleaseNote/ReleaseNote.service';

import { REACT_RELEASE_NOTES_FACTORY_ID } from 'src/technologies/constants';
import { openPage } from 'src/technologies/utils';

import { AbstractReleaseNoteFactory } from '../abstract';

@Injectable()
export class ReactReleaseNoteFactory extends AbstractReleaseNoteFactory {
  logger = new Logger(ReactReleaseNoteFactory.name);

  constructor(private readonly releaseNoteService: ReleaseNoteService) {
    super();
  }

  releaseNoteFactoryId = REACT_RELEASE_NOTES_FACTORY_ID;

  releaseNotesPageUrl = 'https://ru.reactjs.org/blog/all.html/';

  async getAllReleaseNotes(): Promise<ReleaseNote[]> {
    try {
      const { browser, page } = await openPage(this.releaseNotesPageUrl);

      const releaseNotes = await page.$$('li');

      const releaseNoteEntities: ReleaseNote[] = [];

      // not Promise.all to not overuse memory
      for (const releaseNoteElem of releaseNotes) {
        const releaseNote = new ReleaseNote();

        const [link, title, date] = await Promise.all([
          this.getReleaseNoteLink(releaseNoteElem, page),
          this.getReleaseNoteTitle(releaseNoteElem, page),
          this.getReleaseNoteDate(releaseNoteElem, page),
        ]);

        const notePage = await browser.newPage();

        await notePage.goto(link, { waitUntil: 'domcontentloaded' });

        const [legend, ogImage] = await Promise.all([
          this.getReleaseNoteLegend(notePage),
          this.getReleaseNotePreview(notePage),
        ]);

        await notePage.close();

        releaseNote.releaseNoteFactoryId = this.releaseNoteFactoryId;
        releaseNote.link = link;
        releaseNote.title = title;
        releaseNote.date = date;
        releaseNote.legend = legend;
        releaseNote.preview = ogImage;

        releaseNoteEntities.push(releaseNote);
      }

      await browser.close();

      return releaseNoteEntities;
    } catch (e) {
      this.logger.error(
        '[ReactReleaseNoteFactory] error during collecting data',
        { e },
      );

      return [];
    }
  }

  async getNewReleaseNotes(): Promise<ReleaseNote[]> {
    const releaseNotes = await this.getAllReleaseNotes();

    return this.filterNewReleaseNotes(releaseNotes);
  }

  async filterNewReleaseNotes(
    releaseNoteEntities: ReleaseNote[],
  ): Promise<ReleaseNote[]> {
    const lastReleaseNote =
      await this.releaseNoteService.getLatestTechnologeReleaseNote(
        this.releaseNoteFactoryId,
      );

    if (!lastReleaseNote) return releaseNoteEntities;

    const newReleaseNotes = releaseNoteEntities.filter(
      (releaseNote) =>
        releaseNote.date.getTime() > lastReleaseNote.date.getTime(),
    );

    return newReleaseNotes;
  }

  async getReleaseNoteTitle(
    releaseNoteElem: ElementHandle<HTMLLIElement>,
    page: Page,
  ): Promise<string> {
    const title = await page.evaluate(
      (el) => el.querySelector('h2 > a').textContent,
      releaseNoteElem,
    );

    return title;
  }

  async getReleaseNoteDate(
    releaseNoteElem: ElementHandle<HTMLLIElement>,
    page: Page,
  ): Promise<Date> {
    const date = await page.evaluate(
      (el) => el.querySelectorAll('div')[0].textContent,
      releaseNoteElem,
    );

    return new Date(date);
  }

  async getReleaseNoteLink(
    releaseNoteElem: ElementHandle<HTMLLIElement>,
    page: Page,
  ): Promise<string> {
    const link = await page.evaluate(
      (el) => el.querySelector<HTMLLinkElement>('h2 > a').href,
      releaseNoteElem,
    );

    return link;
  }

  async getReleaseNotePreview(page: Page): Promise<string> {
    const ogImage = await page.evaluate(() => {
      const ogImage = document.querySelector<HTMLMetaElement>(
        "head > meta[property='og:image']",
      ).content;

      return ogImage;
    });

    return ogImage;
  }

  async getReleaseNoteLegend(page: Page): Promise<string> {
    const legend = await page.evaluate(() => {
      const legend = document.querySelectorAll('p')[0].textContent;

      return legend;
    });

    return legend;
  }
}
