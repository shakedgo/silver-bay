import React from "react";

export default function Sort({ changeState }) {
	let sorts = {
		material: [],
		price: [],
	};
	const handleChange = (e, type) => {
		if (type === "material") {
			if (!sorts.material.includes(e)) sorts.material.push(e);
			else sorts.material.splice(sorts.material.indexOf(e), 1);
		}
		if (type === "price") {
			if (!sorts.price.includes(e)) sorts.price.push(e);
			else sorts.price.splice(sorts.price.indexOf(e), 1);
		}
		// console.log(sorts);
		changeState(sorts);
	};
	return (
		<div className="sort-container">
			<h4>Metal Type</h4>
			<div>
				<input
					type="checkbox"
					name="gold"
					id="gold"
					value="gold"
					onChange={(e) => handleChange(e.target.value, "material")}
				/>
				<label htmlFor="gold">Gold</label>
			</div>
			<div>
				<input
					type="checkbox"
					name="silver"
					id="silver"
					value="silver"
					onChange={(e) => handleChange(e.target.value, "material")}
				/>
				<label htmlFor="silver">Silver</label>
			</div>
			<div>
				<input
					type="checkbox"
					name="plat"
					id="plat"
					value="plat"
					onChange={(e) => handleChange(e.target.value, "material")}
				/>
				<label htmlFor="plat">Platinum</label>
			</div>
			<div>
				<input
					type="checkbox"
					name="pallad"
					id="pallad"
					value="pallad"
					onChange={(e) => handleChange(e.target.value, "material")}
				/>
				<label htmlFor="pallad">Palladium</label>
			</div>
			<br />
			<h4>Price</h4>
			<div>
				<input
					type="checkbox"
					name="under20"
					id="under20"
					value="under20"
					onChange={(e) => handleChange(e.target.value, "price")}
				/>
				<label htmlFor="under20">Under 20$</label>
			</div>
			<div>
				<input
					type="checkbox"
					name="25to90"
					id="25to90"
					value="25to90"
					onChange={(e) => handleChange(e.target.value, "price")}
				/>
				<label htmlFor="25to90">25$ to 90$</label>
			</div>
			<div>
				<input
					type="checkbox"
					name="100to499"
					id="100to499"
					value="100to499"
					onChange={(e) => handleChange(e.target.value, "price")}
				/>
				<label htmlFor="100to499">100$ to 499$</label>
			</div>
			<div>
				<input
					type="checkbox"
					name="500to999"
					id="500to999"
					value="500to999"
					onChange={(e) => handleChange(e.target.value, "price")}
				/>
				<label htmlFor="500to999">500$ to 999$</label>
			</div>
		</div>
	);
}
