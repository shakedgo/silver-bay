import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Card from "../Components/Card";
import Filter from "../Components/Filter";
import "./About.scss";

export default function About() {
	const fetch = async () => {
		const res = await axios.get("/items", {
			params: { page, materials: JSON.stringify(filters.materials), prices: JSON.stringify(filters.prices) },
		});
		return res.data;
	};

	const [page, setPage] = useState(0);
	const [filters, setFilters] = useState({ materials: [], prices: [] });
	// const [items, setItems] = useState([]);
	const { data: items, status } = useQuery(["items", page, filters], fetch);
	const [btnText, setBtnText] = useState("Refresh Database");

	const filterChange = (val, type) => {
		// This function updates the filters the user choose
		const filterList = filters[type];
		const index = filterList.findIndex((filter) => JSON.stringify(filter) === JSON.stringify(val));
		// if exist remove, else add
		if (index !== -1) filterList.splice(index, 1);
		else filterList.push(val);

		setFilters({ ...filters });
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
