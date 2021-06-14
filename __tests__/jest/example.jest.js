const puppeteer = require('puppeteer')

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

describe('Jest Puppeteer test', () => {
  let example

  beforeAll(() => {
    example = new Example()
  })

  it('Should be able get title "Assistir Lista de Animes - Online em FHD"', () => {
    example.start().then(() => {
      expect(example.title).toBe('Assistir Lista de Animes - Online em FHD')
    })
  })

  it('Should be able get animes names', () => {
    example.start().then(() => {
      expect(typeof example.names).toBe('object')
      expect(example.names.length > 0).toBe(true)
    })
  })
})
