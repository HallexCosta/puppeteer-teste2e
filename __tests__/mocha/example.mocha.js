const { expect, use } = require('chai')
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

class Example {
  async start() {
    puppeteer.use(StealthPlugin())
    const browser = await puppeteer.launch({
      executablePath: process.env.PUPPETEER_EXEC_PATH, // set by docker container
      headless: true,
      args: ['--no-sandbox']
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

describe('Mocha Puppeteer test', () => {
  let example

  before(() => {
    example = new Example()
  })

  it('Should be able get title "Assistir Lista de Animes - Online em FHD"', async () => {
    await example.start()

    expect(example.title).to.be.equal(
      'Assistir Lista de Animes - Online em FHD'
    )
  })

  it('Should be able get animes names', async () => {
    await example.start()

    expect(typeof example.names).to.be.equal('object')
    expect(example.names.length > 0).to.be.equal(true)
  })
})
