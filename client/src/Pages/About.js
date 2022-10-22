import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Components/Card";
import Sort from "../Components/Sort";
import "./About.scss";

export default function About() {
	let sorts = {
		material: [],
		price: [],
	};
	const [items, setItems] = useState([]);
	const [sort, setSort] = useState(sorts);
	let sortedItems = [];

	useEffect(() => {
		const fetchData = async () => {
			const res = await axios.get("/items");
			setItems(res.data);
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (sort.material !== [] && sort.price !== []) {
			items.forEach((item) => {
				if (sort.material.includes(item.material) && sort.price.includes(item.price)) sortedItems.push(item);
			});
		}
		sortedItems.map((item) => <Card props={item}></Card>);
	}, [sort]);

	const handleChange = (e, type) => {
		if (type === "material") {
			if (!sorts.material.includes(e)) sorts.material.push(e);
			else sorts.material.splice(sorts.material.indexOf(e), 1);
		} else if (type === "price") {
			if (!sorts.price.includes(e)) sorts.price.push(e);
			else sorts.price.splice(sorts.price.indexOf(e), 1);
		}
		setSort(sorts);
	};
	return (
		<div className="about">
			<Sort handleChange={handleChange} />
			<div className="cards">{sortedItems}</div>
			{sortedItems}
			{items.map((item) => (
				<>
					<div>{item.material}</div>
					<div>{item.price}</div>
				</>
			))}
		</div>
	);
}
