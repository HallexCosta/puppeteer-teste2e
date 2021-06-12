const { deepStrictEqual } = require('assert')
const puppeteer = require('puppeteer')
// tests e2e

class Example {
  constructor() {
    this.title = ''
    this.names = []
  }

  async start() {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      executablePath: process.env.PUPPETEER_EXEC_PATH, // set by docker container
      headless: false
    })
    const page = await browser.newPage()

    const uri = `${this.getBaseURL()}/lista-de-animes`

    await page.goto(uri, {
      timeout: 0,
      waitUntil: 'networkidle2'
    })

    this.names = await page.evaluate(() => {
      const anchors = [
        ...(document.querySelectorAll < HTMLAnchorElement > '.aba ul > li > a')
      ]

      return anchors.map(anchor => String(anchor.textContent))
    })

    console.log()
    this.title = await page.title()
    await browser.close()
  }
}

const example = (async () => {
  const example = new Example()
  await example.start()
  return example
})()

// Should be able get title "Example Domain"
{
  deepStrictEqual(example.title, 'Example Domain')
}

// Should be able get animes names
{
  deepStrictEqual(typeof example.names, 'array')
  deepStrictEqual(example.names.length > 0, true)
}
