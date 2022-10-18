const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const { scrape, db, queryBuilder } = require("./Scraper");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api", (_req, res) => {
	res.json({ username: "shakedgo" });
});

app.get("/items", (req, res) => {
	let sorts = JSON.parse(req.query.sorts);
	if (sorts.material !== [] || sorts.price !== []) {
		const uri = process.env.MONGO;
		const client = new MongoClient(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1,
		});
		client.connect();
		const itemsCollection = client.db("silver-bay").collection("Items");
		let query = queryBuilder(sorts);
		console.log(query);
		itemsCollection
			.find(query)
			.toArray()
			.then((ress) => {
				console.log(ress);
				client.close();
			});
		// res.json(itemsCollection.find({ material: sorts.material, price: sorts.price })); // check if sort is json with the required sorts
		// client.close();
	}
	res.send("done");
});

// const clientPath = path.join(process.cwd(), "client/");
// app.get("*", (_req, res) => {
// 	res.sendFile(path.join(clientPath, "index.html"));
// });

const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log("Hosted: http://localhost:" + port);
});
