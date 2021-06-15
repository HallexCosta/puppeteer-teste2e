// tests e2e
import { deepStrictEqual } from 'assert'
import * as puppeteer from 'puppeteer'

class Example {
  public title: string = ''
  public names: string[] = []

  async start() {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
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
