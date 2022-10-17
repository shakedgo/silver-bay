// import React, { useEffect, useState } from "react";
// import axios from "axios";
import Card from "../Components/Card";
import Sort from "../Components/Sort";
import "./About.scss";

export default function About() {
	let sorts = {
		material: [],
		price: [],
	};
	const handleChange = (e, type) => {
		if (type === "material") {
			if (!sorts.material.includes(e)) sorts.material.push(e);
			else sorts.material.splice(sorts.material.indexOf(e), 1);
		} else if (type === "price") {
			if (!sorts.price.includes(e)) sorts.price.push(e);
			else sorts.price.splice(sorts.price.indexOf(e), 1);
		}
		//axios.get("/items", {params: {sorts}})
	};
	return (
		<div className="about">
			<Sort handleChange={handleChange} />
			<div className="cards">
				<Card /> {/* Every card will be fetched from the database, with the relevant sort */}
			</div>
		</div>
	);
}
