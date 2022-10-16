import React from "react";
import Card from "../Components/Card";
import Sort from "../Components/Sort";

export default function About() {
	return (
		<div className="about" style={{ display: "flex", flexWrap: "wrap" }}>
			<Sort />
			<Card /> {/* Every card will be fetched from the database, with the relevant sort */}
			<Card />
			<Card />
			<Card />
			<Card />
			<Card />
			<Card />
			<Card />
			<Card />
			<Card />
			<Card />
			<Card />
			<Card />
			<Card />
			<Card />
		</div>
	);
}
