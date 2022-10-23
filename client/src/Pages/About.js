import React, { useEffect, useState } from "react";
import axios from "axios";
// import Card from "../Components/Card";
import Sort from "../Components/Sort";
import "./About.scss";

export default function About() {
	// let sort = {
	// 	name: [],
	// 	material: [],
	// 	price: [],
	// };
	let sorts;
	// const [sorts, setSorts] = useState({});
	const [items, setItems] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const res = await axios.get("/items");
			setItems(res.data);
		};
		fetchData();
	}, []);

	const handleChange = (e) => {
		sorts = e;
		console.log(sorts);
	};

	return (
		<div className="about">
			<Sort changeState={handleChange} />
			{items.map((item, index) => (
				<div key={"material" + index}>
					{item.material},{item.price}
				</div>
			))}
			{/* {console.log(sorts)} */}

			{/* <div className="cards">{sortedItems}</div> */}
			{/* {sorted.map((item, index) => (
				<>
					<div key={"material" + index}>{item.material}</div>
					<div key={"price" + index}>{item.price}</div>
				</>
			))} */}
		</div>
	);
}
