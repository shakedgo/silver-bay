const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { scrape } = require("./scraper"); // Add lazy loading

const app = express();
app.use(express.json());
app.use(cors());

const ITEMSINPAGE = 10;

const uri = process.env.MONGO;
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});

app.get("/refresh-data", (_req, res) => {
	(async () => {
		await scrape();
		res.send("done");
	})();
});

app.get("/items", (req, res) => {
	(async () => {
		let pageNum = req.query.page;
		await client.connect();
		const itemsCollection = client.db("silver-bay").collection("items");
		let first = await itemsCollection.findOne();
		let objectData = first._id.toString().slice(0, 18);
		// Saving the data,machineid, processid from ObjectId
		let objectCounter = parseInt(first._id.toString().slice(18), 16); // Saving and parsing the counter of ObjectId
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
		client.close();
	})();
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log("Hosted: http://localhost:" + port);
});
