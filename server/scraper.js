// const axios = require("axios");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const URL = "https://www.apmex.com/category/10010/gold-coins?page=3"; // site we scrape
const uri = process.env.MONGO;
// console.log;
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});

// TODO: Set item price as number.
//		 Add material type.
//		 If price is "" set it to "price is not shown".
//		 load page with all images.
const scrape = async () => {
	let items = [];

	//Getting page data from dynamic page, useing puppeteer.
	console.log("Loading page...");
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(URL);
	const resultsSelector = ".item-link";
	await page.waitForSelector(resultsSelector);
	let pageData = await page.$eval("body", (element) => element.innerHTML);
	console.log("Page loaded.");

	//scraping the items data with cheerio for convenience.
	console.log("Starting scrape...");
	const $ = cheerio.load(pageData);
	$(".mod-product-card").each((i, element) => {
		let item = new Object();
		item.id = $(element).find(".item-link").attr("data-product-id");
		item.title = $(element).find(".mod-product-title").text().trimStart().trimEnd();
		item.img = $(element).find("img").attr("src");
		item.price = $(element).find(".mod-product-pricing").text().trimStart().trimEnd();
		items.push({ ...item });
	});
	console.log("Scrape done.");

	console.log("Refreshing database...");
	await client.connect();
	const collection = client.db("silver-bay").collection("items");
	for (let i = 0; i < items.length; i++) {
		await collection.updateMany(
			{ _id: items[i].id },
			{
				$set: {
					_id: items[i].id,
					title: items[i].title,
					img: items[i].img,
					price: items[i].price,
				},
			},
			{ upsert: true }
		);
	}
	console.log("Database updated successfully.");
	client.close();
};
scrape();
module.exports = { scrape };
