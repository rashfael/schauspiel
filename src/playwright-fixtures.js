// TODO control playwright context
const { chromium } = require('playwright')
const { config } = require('./config')
const wrap = require('./wrap')

module.exports = function (fixtures) {
	fixtures.browser(async ({}, run) => {
		const browser = await chromium.launch({
			headless: !config.headful
		})
		await run(browser)
		await browser.close()
	}, {scope: 'browser'})

	fixtures.page(async ({browser}, run) => {
		const context = await browser.newContext({
			viewport: {width: 1920, height: 1080}
		})
		const page = await context.newPage()
		// page.on('pageerror', exception => {
		// 	console.log(`Uncaught exception: "${exception}"`)
		// })
		//
		// page.on('requestfailed', request => {
		// 	console.log(request.url() + ' ' + request.failure().errorText)
		// })
		//
		// page.on('console', msg => console.log(msg.text()))
		// page.on('framenavigated', frame => {
		// 	if (frame !== page.mainFrame()) return
		// 	console.log('NAV', frame.url())
		// })
		await run(wrap(page))
	})
}
