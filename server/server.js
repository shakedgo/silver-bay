import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

dotenv.config();
const app = express();
app.use(json());
app.use(cors());

const ITEMSINPAGE = 5;

const uri = process.env.MONGO;
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});
export default client;
const itemsCollection = client.db("silver-bay").collection("items");

let firstItem;
let objectData;
let objectCounter;
(async () => {
	await client.connect();
	firstItem = await itemsCollection.findOne();
	// Saving the data,machineid, processid from ObjectId
	objectData = firstItem._id.toHexString().slice(0, 18);
	// Saving and parsing the counter of ObjectId
	objectCounter = parseInt(firstItem._id.toHexString().slice(18), 16);
})();

app.get("/refresh-data", async (_req, res) => {
	let scrape = (await import("./scraper.js")).default;
	await scrape();
	res.send("done");
});

app.get("/items", async (req, res) => {
	// prices=[{"low": NUM,"high": NUM},{"low": NUM,"high": NUM}]
	let pageNum = req.query.page;
	let prices = JSON.parse(req.query.prices);
	let materials = JSON.parse(req.query.materials);
	let priceFilters = [];
	let materialFilters = [];
	let query;
	// Creating a special query.
	if (prices.length !== 0) {
		prices.forEach((obj) => {
			priceFilters.push({
				price: {
					$gte: obj.low,
					$lte: obj.high,
				},
			});
		});
	}
	if (materials.length !== 0) {
		materials.forEach((mat) => {
			materialFilters.push({
				material: mat,
			});
		});
	}
	if (priceFilters.length !== 0 && materialFilters.length !== 0)
		query = { $and: [{ $or: materialFilters }, { $or: priceFilters }] };
	else if (priceFilters.length !== 0) query = { $or: priceFilters };
	else if (materialFilters.length !== 0) query = { $or: materialFilters };

	let queryResult;
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
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log("Hosted: http://localhost:" + port);
});
