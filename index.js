import puppeteer from "puppeteer";

class Example {
  async start() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://example.com");
    console.log(await page.title());

    await browser.close();
  }
}

(async () => {
  const example = new Example();
  await example.start();
})();
