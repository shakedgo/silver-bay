import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Components/Card";
import Filter from "../Components/Filter";
import "./About.scss";

export default function About() {
	const [page, setPage] = useState(0);
	const [filters, setFilters] = useState({ material: [], price: [] });
	const [items, setItems] = useState([]);
	const [filteredItems, setFilteredItems] = useState([]);
	const [btnText, setBtnText] = useState("Refresh Database");

	useEffect(() => {
		(async () => {
			const res = await axios.get("/items", { params: { page } });
			// const res = await axios.get("/items");
			setItems(res.data);
			setFilteredItems(res.data);
		})();
	}, [page]);

	useEffect(() => {
		// this useEffect will rerender the items that is relevant according to the filter
		let bag = [];
		if (filters.material.length !== 0 || filters.price.length !== 0) {
			if (filters.material.length > 0 && filters.price.length > 0) {
				items.forEach((item) => {
					if (filters.material.includes(item.material) && priceFilter(item.price)) bag.push(item);
				});
			} else if (filters.material.length > 0) {
				items.forEach((item) => {
					if (filters.material.includes(item.material)) bag.push(item);
				});
			} else if (filters.price.length > 0) {
				items.forEach((item) => {
					if (priceFilter(item.price)) bag.push(item);
				});
			}
			setFilteredItems([...bag]);
		} else {
			console.log("no filters");
			setFilteredItems(items);
		}

		function priceFilter(itemPrice) {
			// this function checks if the item price is in the range of the prices filter.
			itemPrice = Number(itemPrice.split("$")[1].replace(",", ""));
			let pricesMat = filters.price.map((filter) => filter.split("to"));
			let validPrice = false;
			pricesMat.forEach((price) => {
				let [bottom, top] = [price.filter((a, b) => a - b)[0], price.filter((a, b) => a - b).at(-1)];
				if (itemPrice > bottom && itemPrice < top) validPrice = true;
			});
			return validPrice;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filters]);

	const filterChange = (e, type) => {
		// This function update the filters the user choose
		if (type === "material") {
			if (!filters.material.includes(e)) filters.material.push(e);
			else filters.material.splice(filters.material.indexOf(e), 1);
			setFilters({ ...filters });
		}
		if (type === "price") {
			if (!filters.price.includes(e)) filters.price.push(e);
			else filters.price.splice(filters.price.indexOf(e), 1);
			setFilters({ ...filters });
		}
	};
	const refreshData = async () => {
		setBtnText("Refreshing...");
		await axios.get("/refresh-data");
		setFilteredItems(items);
		setBtnText("Refresh Database");
	};

	return (
		<div className="about">
			<Filter changeState={filterChange} />
			<div className="cards">
				<button onClick={() => refreshData()}>{btnText}</button>
				{items.length === 0 ? (
					<p>loading data</p>
				) : (
					filteredItems.map((item) => {
						return <Card key={item.id} item={item} />;
					})
				)}
				<button onClick={() => setPage(0)}>1</button>
				<button onClick={() => setPage(1)}>2</button>
				<button onClick={() => setPage(2)}>3</button>
			</div>
		</div>
	);
}
