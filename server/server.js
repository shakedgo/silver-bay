const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const { scrape } = require("./scraper");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api", (_req, res) => {
	res.json({ username: "shakedgo" });
});

app.get("/items", (_req, res) => {
	const uri = process.env.MONGO;
	const client = new MongoClient(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		serverApi: ServerApiVersion.v1,
	});

	let fetchItems = async () => {
		await client.connect();
		const itemsCollection = client.db("silver-bay").collection("Items");
		res.json(await itemsCollection.find().toArray());
		client.close();
	};
	fetchItems();
});

// const clientPath = path.join(process.cwd(), "client/");
// app.get("*", (_req, res) => {
// 	res.sendFile(path.join(clientPath, "index.html"));
// });

const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log("Hosted: http://localhost:" + port);
});
