// tests e2e
const { deepStrictEqual } = require('assert')
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

class Example {
  async start() {
    puppeteer.use(StealthPlugin())
    const browser = await puppeteer.launch({
      executablePath: process.env.PUPPETEER_EXEC,
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

const example = new Example()

// Should be able get title "Example Domain"
{
  example
    .start()
    .then(() => {
      deepStrictEqual(example.title, 'Assistir Lista de Animes - Online em FHD')
    })
    .catch(e => console.log(e))
  // ;(async () => {
  //   await example.start()
  //
  //   deepStrictEqual(example.title, 'Assistir Lista de Animes - Online em FHD')
  // })()
}

// Should be able get animes names
{
  example
    .start()
    .then(() => {
      deepStrictEqual(typeof example.names, 'object')
      deepStrictEqual(example.names.length > 0, true)
    })
    .catch(e => console.log(e))
  // ;(async () => {
  //   await example.start()
  //
  //   deepStrictEqual(typeof example.names, 'object')
  //   deepStrictEqual(example.names.length > 0, true)
  // })()
}
