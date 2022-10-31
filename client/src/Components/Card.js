import React from "react";
import { Link } from "react-router-dom";
import "./Components.scss";

// Replace all to get data from parent (About).
export default function Card(props) {
	return (
		<Link to={"/silver123"} className="card-container">
			<div className="product-badge top-pick">Top Pick</div>
			<div className="item-material">material: {props.item.material}</div>
			{/* <i className="add-to-cart-button"></i> */}
			<img src={props.item.img} width={130} height={130} alt="coin" />
			<div className="item-title">Title: {props.item.title}</div>
			<div className="item-price">Price: {props.item.price}</div>
		</Link>
	);
}
