const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const URL = "https://www.apmex.com/category/10010/gold-coins?page=3"; // site we scrape
const uri = process.env.MONGO;
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});

// TODO: If price is "" set it to "price is not specified".
const scrape = async () => {
	let items = [];

	//Getting page data from dynamic page, using puppeteer.
	console.log("Loading page...");
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(URL, { waitUntil: "networkidle2", timeout: 0 });
	const resultsSelector = ".item-link";
	await page.waitForSelector(resultsSelector);
	let pageData = await page.$eval("body", (element) => element.innerHTML);
	console.log("Page loaded.");

	//scraping the items data with cheerio for convenience.
	console.log("Starting scrape...");
	const $ = cheerio.load(pageData);
	$(".mod-product-card").each((i, element) => {
		let item = {
			id: $(element).find(".item-link").attr("data-product-id"),
			title: $(element).find(".item-link").attr("title"),
			material: $(element).find(".item-link").attr("data-eventaction").split(/[| ]+/)[1],
			img: $(element).find("img").attr("data-original"),
			price: parseInt($(element).find("span.price").text().split("$")[1].replace(",", "")),
		};
		if (item.img === undefined) item.img = $(element).find("img").attr("src"); // Only in the first ten images.
		items.push({ ...item });
	});
	console.log("Scrape done.");

	// Pushing the data to the database.
	console.log("Refreshing database...");
	await client.connect();
	const collection = client.db("silver-bay").collection("items");

	// getting the ids that are in the database.
	const idsInDatabase = await collection.distinct("id", {});
	// Filtering out the items that are already in the collection.
	items = items.filter((item) => !idsInDatabase.includes(item.id));

	console.log(items.length + " New items.");
	if (items.length !== 0) await collection.insertMany(items);
	console.log("Database updated successfully.");
	client.close();
};
scrape();
module.exports = { scrape };
