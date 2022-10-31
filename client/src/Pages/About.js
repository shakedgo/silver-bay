import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Components/Card";
import Sort from "../Components/Sort";
import "./About.scss";

export default function About() {
	const [sorts, setSorts] = useState({ material: [], price: [] });
	const [items, setItems] = useState([]);
	const [sortedItems, setSortedItems] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const res = await axios.get("/items");
			setItems(res.data);
			setSortedItems(res.data);
		};
		fetchData();
	}, []);

	useEffect(() => {
		// this useEffect will rerender the items that is relevant according to the sort
		let bag = [];
		if (sorts.material.length !== 0 || sorts.price.length !== 0) {
			if (sorts.material.length > 0 && sorts.price.length > 0) {
				items.forEach((item) => {
					if (sorts.material.includes(item.material) && priceFilter(item.price)) bag.push(item);
				});
			} else if (sorts.material.length > 0) {
				items.forEach((item) => {
					if (sorts.material.includes(item.material)) bag.push(item);
				});
			} else if (sorts.price.length > 0) {
				items.forEach((item) => {
					if (priceFilter(item.price)) bag.push(item);
				});
			}
		} else {
			console.log("no sorts");
			setSortedItems(items);
		}
		setSortedItems([...bag]);

		function priceFilter(itemPrice) {
			// this function checks if the item price is in the range of the price sort.
			let pricesMat = sorts.price.map((sort) => sort.split("to"));
			let completeArr = pricesMat.reduce((prev, arr) => prev.concat(arr));
			let [bottom, top] = [completeArr.sort((a, b) => a - b)[0], completeArr.sort((a, b) => a - b).at(-1)];
			if (itemPrice > bottom && itemPrice < top) return true;
			return false;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sorts]);

	const handleChange = (e, type) => {
		// This function update the sorts the user choose
		if (type === "material") {
			if (!sorts.material.includes(e)) sorts.material.push(e);
			else sorts.material.splice(sorts.material.indexOf(e), 1);
			setSorts({ ...sorts });
		}
		if (type === "price") {
			if (!sorts.price.includes(e)) sorts.price.push(e);
			else sorts.price.splice(sorts.price.indexOf(e), 1);
			setSorts({ ...sorts });
		}
	};

	return (
		<div className="about">
			<Sort changeState={handleChange} />
			<div className="cards">
				{sortedItems.map((item, index) => {
					console.log(item);
					return <Card key={item.title + index} item={item} />;
				})}
			</div>
		</div>
	);
}
