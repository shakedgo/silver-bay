import React from "react";
import Card from "../Components/Card";
import Sort from "../Components/Sort";
import "./About.scss";

export default function About() {
	return (
		<div className="about">
			<Sort />
			<div className="cards">
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
		</div>
	);
}
