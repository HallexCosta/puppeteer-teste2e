import puppeteer from "puppeteer";
// tests e2e

class Example {
  async start() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://example.com");
    console.log(await page.title());

    await browser.close();
  }
}

// Should be able get title "Example Domain"
{
  const example = new Example();
  await example.start();
}
