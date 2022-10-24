import React from "react";
import { Link } from "react-router-dom";
import "./Components.scss";

// Replace all to get data from parent (About).
export default function Card(props) {
	return (
		<Link to={"/silver123"} className="card-container">
			<div className="product-badge top-pick">Top Pick</div>
			<i className="add-to-cart-button"></i>
			<img
				src="https://www.images-apmex.com/images/products/2022-great-britain-1-oz-silver-britannia-bu_238885_slab.jpg"
				width={130}
				height={130}
				alt="coin"
			/>
			<div className="item-material">material: {props.item.material}</div>
			<div className="item-price">price: {props.item.price}</div>
		</Link>
	);
}
