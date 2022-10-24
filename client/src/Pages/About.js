import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Components/Card";
import Sort from "../Components/Sort";
import "./About.scss";

export default function About() {
	const [sortSaver] = useState({ material: [], price: [] });
	const [sorts, setSorts] = useState({});
	const [items, setItems] = useState([]);
	const [sortedItems, setSortedItems] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const res = await axios.get("/items");
			setItems(res.data);
		};
		fetchData();
	}, []);

	useEffect(() => {
		let bag = [];
		if (sortSaver.material.length !== 0 || sortSaver.price.length !== 0) {
			if (sorts.material.length > 0 && sorts.price.length > 0) {
				setSortedItems(
					items.forEach((item) => {
						if (sorts.material.includes(item.material) && sorts.price.includes(item.price)) bag.push(item);
					})
				);
			} else if (sorts.material.length > 0) {
				setSortedItems(
					items.forEach((item) => {
						if (sorts.material.includes(item.material)) bag.push(item);
					})
				);
			} else if (sorts.price.length > 0) {
				setSortedItems(
					items.forEach((item) => {
						if (sorts.price.includes(item.price)) bag.push(item);
					})
				);
			}
		}
		setSortedItems([...bag]);
	}, [sorts, sortSaver]);

	const handleChange = (e, type) => {
		if (type === "material") {
			if (!sortSaver.material.includes(e)) sortSaver.material.push(e);
			else sortSaver.material.splice(sortSaver.material.indexOf(e), 1);
			setSorts({ ...sortSaver });
		}
		if (type === "price") {
			if (!sortSaver.price.includes(e)) sortSaver.price.push(e);
			else sortSaver.price.splice(sortSaver.price.indexOf(e), 1);
			setSorts({ ...sortSaver });
		}
	};

	return (
		<div className="about">
			<Sort changeState={handleChange} />
			<div className="cards">
				{sortedItems.map((item, index) => {
					return <Card item={item} />;
				})}
			</div>
		</div>
	);
}
