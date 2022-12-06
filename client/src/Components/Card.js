import React from "react";
import { Link } from "react-router-dom";
import "./Components.scss";

export default function Card(props) {
	return (
		<Link to={"/silver123"} id={props.item.id} className="card-container">
			<div className="item-material">material: {props.item.material}</div>
			{/* <i className="add-to-cart-button"></i> */}
			<img src={props.item.img} width={130} height={130} alt="coin" />
			<div className="item-title">{props.item.title}</div>
			<div className="item-price">{props.item.price}$</div>
		</Link>
	);
}
