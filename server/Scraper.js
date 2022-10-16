const axios = require("axios");
const cheerio = require("cheerio");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const db = () => {
	const uri = process.env.MONGO + "?retryWrites=true&w=majority";
	const client = new MongoClient(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		serverApi: ServerApiVersion.v1,
	});
	client.connect();
	const itemsCollection = client.db("silver-bay").collection("Items");
	itemsCollection.updateMany(
		{ _id: 0.1 },
		{ $set: { name: "Silver-test", material: "silver", price: 0.11 } },
		{ upsert: true }
	);
	console.log("Insert");
	client.close();
};
const URL = "http://scrapesite.com"; // site we scrape

const scrape = () => {
	// Just a demo for cheerio
	// =========================================================================
	// const $ = cheerio.load(page.data);
	// $(".first").each((i, element) => {
	// 	title.push($(element).text().trimStart().trimEnd());
	// 	ids.push($(element).find("a").attr("href").split("/")[4]);
	// 	$(element)
	// 		.siblings("td")
	// 		.each((siblingIndex, sibling) => {
	// 			if (siblingIndex === 0) author.push($(sibling).text());
	// 			if (siblingIndex === 2) {
	// 				date.push(chrono.parseDate($(sibling).text()).toUTCString());
	// 			}
	// 		});
	// });
};

db();
module.exports = { scrape, db, client };
