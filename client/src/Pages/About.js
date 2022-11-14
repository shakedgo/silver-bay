import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Components/Card";
import Sort from "../Components/Sort";
import "./About.scss";

export default function About() {
	const [sorts, setSorts] = useState({ material: [], price: [] });
	const [items, setItems] = useState([]);
	const [sortedItems, setSortedItems] = useState([]);
	const [btnText, setBtnText] = useState("Refresh Database");

	useEffect(() => {
		(async () => {
			const res = await axios.get("/items");
			setItems(res.data);
			setSortedItems(res.data);
		})();
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
			setSortedItems([...bag]);
		} else {
			console.log("no sorts");
			setSortedItems(items);
		}

		function priceFilter(itemPrice) {
			// this function checks if the item price is in the range of the prices sort.
			itemPrice = Number(itemPrice.split("$")[1].replace(",", ""));
			let pricesMat = sorts.price.map((sort) => sort.split("to"));
			let validPrice = false;
			pricesMat.forEach((price) => {
				let [bottom, top] = [price.sort((a, b) => a - b)[0], price.sort((a, b) => a - b).at(-1)];
				if (itemPrice > bottom && itemPrice < top) validPrice = true;
			});
			return validPrice;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sorts]);

	const sortChange = (e, type) => {
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
	const refreshData = async () => {
		setBtnText("Refreshing...");
		await axios.get("/refresh-data");
		setSortedItems(items);
		setBtnText("Refresh Database");
	};

	return (
		<div className="about">
			<Sort changeState={sortChange} />
			<div className="cards">
				<button onClick={() => refreshData()}>{btnText}</button>
				{sortedItems.map((item) => {
					return <Card key={item._id} item={item} />;
				})}
			</div>
		</div>
	);
}
