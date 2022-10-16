import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";

export default function Navbar() {
	return (
		<div className="container">
			<Link to={"/best"}>Best Seller</Link>
			<Link to={"/gold"}>Gold</Link>
			<Link to={"/silver"}>Silver</Link>
			<Link to={"/platpald"}>Platinum & Palladium</Link>
			<Link to={"/deals"}>Deals</Link>
			<Link to={"/rare"}>Rare Coins</Link>
			<Link to={"/curr"}>Currency & Others</Link>
			<Link to={"/sell"}>Sell to Us</Link>
			<Link to={"/charts"}>Charts</Link>
			<Link to={"/resources"}>Resources</Link>
			<Link to={"/about"}>ABOUT</Link>
		</div>
	);
}
