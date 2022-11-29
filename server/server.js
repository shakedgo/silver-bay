const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// const { scrape } = require("./scraper");

const app = express();
app.use(express.json());
app.use(cors());

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
		await client.connect();
		const itemsCollection = client.db("silver-bay").collection("items");
		let first = await itemsCollection.findOne();
		let objectData = first._id.toString().slice(0, 18);
		let objectCounter = first._id.toString().slice(18);
		res.json(
			await itemsCollection
				.find({
					_id: {
						$gt: ObjectId(objectData + (parseInt(objectCounter, 16) + req.query.page * 5 - 1).toString(16)),
					},
				})
				.limit(5)
				.toArray()
		);
		client.close();
	})();
});

// const clientPath = path.join(process.cwd(), "client/");
// app.get("*", (_req, res) => {
// 	res.sendFile(path.join(clientPath, "index.html"));
// });

const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log("Hosted: http://localhost:" + port);
});
