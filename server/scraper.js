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
	let item = new Object();
	item.title = await page.$eval(".mod-product-title", (element) => element.textContent.trim());
	item.price = await page.$eval(".mod-product-pricing", (element) => element.textContent.trim());
	// item.img = await page.$eval(".mod-product-img", (element) => element.textContent.trim().src);
	items.push({ ...item });
	console.log(items);
};
scrape();
module.exports = { scrape };
