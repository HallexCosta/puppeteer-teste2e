const puppeteer = require("puppeteer");
// tests e2e

class Example {
  async start() {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox"],
      executablePath: process.env.PUPPETEER_EXEC_PATH, // set by docker container
      headless: false,
    });
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
