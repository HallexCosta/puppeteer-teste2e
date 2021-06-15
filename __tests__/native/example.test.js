// tests e2e
const { deepStrictEqual } = require('assert')
const puppeteer = require('puppeteer')

class Example {
  async start() {
    const browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-infobars',
        '--window-position=0,0',
        '--ignore-certifcate-errors',
        '--ignore-certifcate-errors-spki-list',
        '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'
      ],
      executablePath: process.env.PUPPETEER_EXEC,
      headless: true,
      ignoreHTTPSErrors: true
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
