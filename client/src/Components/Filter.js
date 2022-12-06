import React from "react";

export default function Filter({ changeState }) {
	return (
		<div className="filter-container">
			<h4>Metal Type</h4>
			<div>
				<input
					type="checkbox"
					name="gold"
					id="gold"
					value="Gold"
					onChange={(e) => changeState(e.target.value, "material")}
				/>
				<label htmlFor="gold">Gold</label>
			</div>
			<div>
				<input
					type="checkbox"
					name="silver"
					id="silver"
					value="Silver"
					onChange={(e) => changeState(e.target.value, "material")}
				/>
				<label htmlFor="silver">Silver</label>
			</div>
			<div>
				<input
					type="checkbox"
					name="plat"
					id="plat"
					value="Plat"
					onChange={(e) => changeState(e.target.value, "material")}
				/>
				<label htmlFor="plat">Platinum</label>
			</div>
			<div>
				<input
					type="checkbox"
					name="pallad"
					id="pallad"
					value="Pallad"
					onChange={(e) => changeState(e.target.value, "material")}
				/>
				<label htmlFor="pallad">Palladium</label>
			</div>
			<br />
			<h4>Price</h4>
			<div>
				<input
					type="checkbox"
					name="0to99"
					id="0to99"
					onChange={(e) => changeState({ low: 0, high: 99 }, "price")}
				/>
				<label htmlFor="0to99">Under 99$</label>
			</div>
			<div>
				<input
					type="checkbox"
					name="100to499"
					id="100to499"
					onChange={(e) => changeState({ low: 100, high: 499 }, "price")}
				/>
				<label htmlFor="100to499">100$ to 499$</label>
			</div>
			<div>
				<input
					type="checkbox"
					name="500to999"
					id="500to999"
					onChange={(e) => changeState({ low: 500, high: 999 }, "price")}
				/>
				<label htmlFor="500to999">500$ to 999$</label>
			</div>
			<div>
				<input
					type="checkbox"
					name="1000to1499"
					id="1000to1499"
					onChange={(e) => changeState({ low: 1000, high: 1499 }, "price")}
				/>
				<label htmlFor="1000to1499">1000$ to 1499$</label>
			</div>
			<div>
				<input
					type="checkbox"
					name="1500to2500"
					id="1500to2500"
					onChange={(e) => changeState({ low: 1500, high: 2500 }, "price")}
				/>
				<label htmlFor="1500to2500">1500$ to 2500$</label>
			</div>
		</div>
	);
}
