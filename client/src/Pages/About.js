import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Card from "../Components/Card";
import Filter from "../Components/Filter";
import "./About.scss";

export default function About() {
	const fetch = async () => {
		const res = await axios.get("/items", { params: { page, prices: JSON.stringify(filters.prices) } });
		return res.data;
	};

	const [page, setPage] = useState(0);
	const [filters, setFilters] = useState({ prices: [] });
	// const [items, setItems] = useState([]);
	const { data: items, status } = useQuery(["items", page, filters], fetch);
	const [btnText, setBtnText] = useState("Refresh Database");

	const filterChange = (val, type) => {
		// This function updates the filters the user choose
		//TODO: Implement material.
		if (type === "material") {
		}
		if (type === "price") {
			// Check if the selected price range already exists in the filters.prices array
			const index = filters.prices.findIndex((price) => JSON.stringify(price) === JSON.stringify(val));
			if (index !== -1) filters.prices.splice(index, 1);
			else filters.prices.push(val);
			setFilters({ ...filters });
		}
	};

	const refreshData = async () => {
		setBtnText("Refreshing...");
		await axios.get("/refresh-data");
		setBtnText("Refresh Database");
	};

	return (
		<div className="about">
			<Filter changeState={filterChange} />
			<div className="right-container">
				<div className="cards">
					{status === "loading" ? (
						<div>Loading...</div>
					) : (
						items.map((item) => {
							return <Card key={item.id} item={item} />;
						})
					)}
				</div>
				<button className="refresh" onClick={() => refreshData()}>
					{btnText}
				</button>
				<div className="pages">
					<button onClick={() => setPage(0)}>1</button>
					<button onClick={() => setPage(1)}>2</button>
					<button onClick={() => setPage(2)}>3</button>
				</div>
			</div>
		</div>
	);
}
