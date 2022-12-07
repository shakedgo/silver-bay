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

	const filterChange = (e, type) => {
		// This function updates the filters the user choose
		//TODO: Implement material.
		if (type === "material") {
		}
		//TODO: fix react query confusing querys.
		// 100-499 + 500-999 -100-499 failed
		if (type === "price") {
			if (!JSON.stringify(filters.prices).includes(JSON.stringify(e))) filters.prices.push(e);
			else filters.prices.splice(filters.prices.indexOf(e), 1);
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
