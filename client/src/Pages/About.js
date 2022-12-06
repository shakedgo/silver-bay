import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Components/Card";
import Filter from "../Components/Filter";
import "./About.scss";

export default function About() {
	const [page, setPage] = useState(0);
	const [filters, setFilters] = useState({ prices: [] });
	const [items, setItems] = useState([]);
	const [btnText, setBtnText] = useState("Refresh Database");

	useEffect(() => {
		(async () => {
			// TODO: Use react query to cache results
			const res = await axios.get("/items", { params: { page, prices: JSON.stringify(filters.prices) } });
			setItems(res.data);
		})();
	}, [page, filters]);

	const filterChange = (e, type) => {
		// This function updates the filters the user choose
		//TODO: Implement material.
		if (type === "material") {
		}
		if (type === "price") {
			if (!JSON.stringify(filters.prices).includes(JSON.stringify(e))) filters.prices.push(e);
			else filters.prices.splice(filters.prices.indexOf(e), 1);
			setFilters({ ...filters });
			setItems([]);
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
					{items.length === 0 ? (
						<p>loading data</p>
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
