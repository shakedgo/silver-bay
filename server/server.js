const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// const { scrape } = require("./scraper"); // Add lazy loading

const app = express();
app.use(express.json());
app.use(cors());

const ITEMSINPAGE = 5;

const uri = process.env.MONGO;
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});
const itemsCollection = client.db("silver-bay").collection("items");

let firstItem;
let objectData;
let objectCounter;
(async () => {
	await client.connect();
	firstItem = await itemsCollection.findOne();
	client.close();
	// Saving the data,machineid, processid from ObjectId
	objectData = firstItem._id.toString().slice(0, 18);
	// Saving and parsing the counter of ObjectId
	objectCounter = parseInt(firstItem._id.toString().slice(18), 16);
})();

app.get("/refresh-data", (_req, res) => {
	(async () => {
		await scrape();
		res.send("done");
	})();
});
// localhost:4000/items?page=0&prices=[{"low":0,"high":200},{"low":1500, "high": 2000}]
app.get("/items", (req, res) => {
	// [{"low": NUM,"high": NUM},{"low": NUM,"high": NUM}];
	let filters;
	console.log(filters);
	if (req.query.prices !== undefined) {
		// Creating a special query.
		let payload = JSON.parse(req.query.prices);
		let priceFilters = [];
		payload.forEach((obj) => {
			priceFilters.push({
				price: {
					$gte: obj.low,

					$lte: obj.high,
				},
			});
		});
		filters = { $or: priceFilters };
	}
	let pageNum = req.query.page;
	(async () => {
		await client.connect();
		if (filters !== undefined) {
			res.json(
				await itemsCollection
					.find(filters)
					.skip(ITEMSINPAGE * pageNum) // Skip not good in large scales.
					.limit(ITEMSINPAGE)
					.toArray()
			);
		} else {
			res.json(
				// Searching for 5 items that are relevant to the page.
				// Adding ObjectData to the Counter with our page number.
				await itemsCollection
					.find({
						_id: {
							$gt: ObjectId(objectData + (objectCounter + pageNum * ITEMSINPAGE - 1).toString(16)),
						},
					})
					.limit(ITEMSINPAGE)
					.toArray()
			);
		}
		client.close();
	})();
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log("Hosted: http://localhost:" + port);
});
