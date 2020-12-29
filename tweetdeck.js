const puppeteer = require(__dirname + '/node_modules/puppeteer');
(async() => {
	const browser = await puppeteer.launch({
		headless: true
	})
	const page = await browser.newPage()
  //url nav
	await page.goto("https://twitter.com/login?hide_message=true&redirect_after_login=https%3A%2F%2Ftweetdeck.twitter.com%2F%3Fvia_twitter_login%3Dtrue", {
		//waitUntil: 'networkidle2'
	})
	//Input username 
	await page.type('input[name="session[username_or_email]"]', 'USERNAME', {
		delay: 50
	})
	//Input password 
	await page.type('input[name="session[password]"]', 'PASSWORD', {
		delay: 50
	})
	//button click
	await page.click('#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > div.css-1dbjc4n.r-13qz1uu > form > div > div:nth-child(8) > div')
	await page.waitForNavigation()


	page.on('response', async(response) => {

		// Ignore GET requests
		if (response.request().method() !== 'GET') return

		//filter url search streamming api
		//You can add search by adding column search on https://tweetdeck.twitter.com/ 
		if (response.url().includes('/universal.json?q=')) {

			if (response.url() == response.url()) {
				//Get raw json data
				const data = await response.json()
				//Convert a JavaScript object into a string
				const ResStrings = JSON.stringify(data)
				//play the data as you wish
				console.log(ResStrings)
			}

		}
	})
})()