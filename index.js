const puppeteer = require('puppeteer')
const { Example } = require('./Example')

;(async () => {
  const example = new Example()
  await example.start()
})()
