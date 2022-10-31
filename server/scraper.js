// const axios = require("axios");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const URL = "https://www.apmex.com/category/10010/gold-coins?page=3"; // site we scrape

const scrape = async () => {
	let items = [];

	//Getting page data from dynamic page, useing puppeteer.
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(URL);
	const resultsSelector = ".item-link";
	await page.waitForSelector(resultsSelector);
	let pageData = await page.$eval("body", (element) => element.innerHTML);

	//scraping the items data with cheerio for convenience.
	const $ = cheerio.load(pageData);
	$(".mod-product-card").each((i, element) => {
		let item = new Object();
		item._id = $(element).find(".item-link").attr("data-product-id");
		item.title = $(element).find(".mod-product-title").text().trimStart().trimEnd();
		item.img = $(element).find("img").attr("src");
		item.price = $(element).find(".mod-product-pricing").text().trimStart().trimEnd();
		items.push({ ...item });
	});

	console.log(items);
};
scrape();
module.exports = { scrape };
