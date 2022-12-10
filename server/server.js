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

app.get("/items", (req, res) => {
	// prices=[{"low": NUM,"high": NUM},{"low": NUM,"high": NUM}]
	let pageNum = req.query.page;
	let prices = JSON.parse(req.query.prices);
	let materials = JSON.parse(req.query.materials);
	let filters = [];
	let query;
	// Creating a special query.
	if (prices.length !== 0) {
		prices.forEach((obj) => {
			filters.push({
				price: {
					$gte: obj.low,
					$lte: obj.high,
				},
			});
		});
	}
	if (materials.length !== 0) {
		materials.forEach((mat) => {
			console.log(mat);
			filters.push({
				material: mat,
			});
		});
	}
	if (filters.length !== 0) query = { $or: filters };

	(async () => {
		let queryResult;
		await client.connect();
		if (query !== undefined) {
			queryResult = await itemsCollection
				.find(query)
				// TODO: replace skip - not good in large scales.
				.skip(ITEMSINPAGE * pageNum)
				.limit(ITEMSINPAGE)
				.toArray();
		} else {
			// Getting the specific items that are relevant to the page.
			// Adding ObjectData to the Counter with our page number.
			queryResult = await itemsCollection
				.find({
					_id: {
						$gt: ObjectId(objectData + (objectCounter + pageNum * ITEMSINPAGE - 1).toString(16)),
					},
				})
				.limit(ITEMSINPAGE)
				.toArray();
		}
		res.json(queryResult);
		client.close();
	})();
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log("Hosted: http://localhost:" + port);
});
