// const axios = require("axios");
const puppeteer = require("puppeteer");

const URL = "https://www.apmex.com/category/10010/gold-coins?page=3"; // site we scrape

const scrape = async () => {
	let items = [];

	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	await page.goto(URL);
	const resultsSelector = ".item-link";
	await page.waitForSelector(resultsSelector);
	let itemsHTML = await page.$$eval(resultsSelector, (element) => element.map((e) => e.innerHTML));
	itemsHTML.forEach((i) => {
		let item = new Object();
		item.title = i.img;
		// item.title = await i.$eval(".mod-product-title", (element) => element.textContent.trim());
		// item.price = await i.$eval(".mod-product-pricing", (element) => element.textContent.trim());
		// item.img = await i.$eval(".mod-product-img>img", (element) => element.src);
		items.push({ ...item });
	});
	console.log(items[0]);
};
scrape();
module.exports = { scrape };
