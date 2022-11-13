import { launch, Page, Browser } from 'puppeteer';

export const openPage = async (
  url: string,
): Promise<{ browser: Browser; page: Page }> => {
  const browser = await launch({
    headless: true,
    //TODO: FIXME: maximum speed optimization here
    // args: PUPPETEER_MINIMAL_ARGS,
    // userDataDir: './puppeteerInternalCache',
  });

  const page = await browser.newPage();

  // await page.setRequestInterception(true);
  // page.on('request', (request) => {
  //   const url = request.url();
  //   if (PUPPETEER_BLOCKED_DOMAINS.some((domain) => url.includes(domain))) {
  //     request.abort();
  //   } else {
  //     request.continue();
  //   }
  // });

  await page.goto(url, {
    waitUntil: 'networkidle2',
  });

  return { browser, page };
};
