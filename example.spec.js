const timeout = 1000 * 600 * 30;
class Example {
  async start() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://example.com");
    console.log(await page.title());

    await browser.close();
  }
}

describe("Test e2e", () => {
  it(
    'Should be able get title "Example Domain"',
    async (done) => {
      const example = new Example();
      await example.start();
      done();
    },
    timeout
  );
});
