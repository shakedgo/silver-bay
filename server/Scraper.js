const axios = require("axios");
const { INSPECT_MAX_BYTES } = require("buffer");
const cheerio = require("cheerio");

const URL = "https://www.apmex.com/category/10010/gold-coins?page=3"; // site we scrape

const scrape = async () => {
	// Just a demo for cheerio
	// ============================================================
	let items = [];
	let page = await axios.get(URL);
	const $ = cheerio.load(page.data);
	// console.log($(".mod-product-card").children);
	$(".mod-product-card").each((i, element) => {
		console.log("in");
		let item = new Object();
		item._id = $(element).text().trimStart().trimEnd();
		item.title = $(element).text().trimStart().trimEnd();
		item.img = $(element).text().trimStart().trimEnd();
		item.price = $(element).text().trimStart().trimEnd();
		items.push({ ...item });
	});
	console.log(items);
};
scrape();

module.exports = { scrape };
