const { deepStrictEqual } = require('assert')
const puppeteer = require('puppeteer')
// tests e2e
class Example {
  async start() {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      executablePath: process.env.PUPPETEER_EXEC_PATH, // set by docker container
      headless: true
    })
    const page = await browser.newPage()

    const uri = `https://yayanimes.net/lista-de-animes`

    await page.goto(uri, {
      timeout: 0,
      waitUntil: 'networkidle2'
    })

    this.title = await page.title()

    this.names = await page.evaluate(() => {
      const anchors = [...document.querySelectorAll(' .aba ul > li > a')]

      return anchors.map(anchor => String(anchor.textContent))
    })

    await browser.close()
  }
}

// Should be able get title "Example Domain"
const example = new Example()

{
  ;(async () => {
    await example.start()

    deepStrictEqual(example.title, 'Assistir Lista de Animes - Online em FHD')
  })()
}

// Should be able get animes names
{
  ;(async () => {
    await example.start()

    deepStrictEqual(typeof example.names, 'object')
    deepStrictEqual(example.names.length > 0, true)
  })()
}
