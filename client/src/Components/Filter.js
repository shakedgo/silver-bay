import React from "react";

export default function Filter({ changeState }) {
	// TODO: Add Sorts
	return (
		<div className="filter-container">
			<h4>Metal Type</h4>
			<div>
				<input
					type="checkbox"
					name="gold"
					id="gold"
					value="Gold"
					onChange={(e) => changeState(e.target.value, "materials")}
				/>
				<label htmlFor="gold">Gold</label>
			</div>
			<div>
				<input
					type="checkbox"
					name="silver"
					id="silver"
					value="Silver"
					onChange={(e) => changeState(e.target.value, "materials")}
				/>
				<label htmlFor="silver">Silver</label>
			</div>
			<div>
				<input
					type="checkbox"
					name="plat"
					id="plat"
					value="Plat"
					onChange={(e) => changeState(e.target.value, "materials")}
				/>
				<label htmlFor="plat">Platinum</label>
			</div>
			<div>
				<input
					type="checkbox"
					name="pallad"
					id="pallad"
					value="Pallad"
					onChange={(e) => changeState(e.target.value, "materials")}
				/>
				<label htmlFor="pallad">Palladium</label>
			</div>
			<br />
			<h4>Prices</h4>
			<div>
				<input
					type="checkbox"
					name="0to99"
					id="0to99"
					onChange={(e) => changeState({ low: 0, high: 99 }, "prices")}
				/>
				<label htmlFor="0to99">Under 99$</label>
			</div>
			<div>
				<input
					type="checkbox"
					name="100to499"
					id="100to499"
					onChange={(e) => changeState({ low: 100, high: 499 }, "prices")}
				/>
				<label htmlFor="100to499">100$ to 499$</label>
			</div>
			<div>
				<input
					type="checkbox"
					name="500to999"
					id="500to999"
					onChange={(e) => changeState({ low: 500, high: 999 }, "prices")}
				/>
				<label htmlFor="500to999">500$ to 999$</label>
			</div>
			<div>
				<input
					type="checkbox"
					name="1000to1499"
					id="1000to1499"
					onChange={(e) => changeState({ low: 1000, high: 1499 }, "prices")}
				/>
				<label htmlFor="1000to1499">1000$ to 1499$</label>
			</div>
			<div>
				<input
					type="checkbox"
					name="1500to2500"
					id="1500to2500"
					onChange={(e) => changeState({ low: 1500, high: 2500 }, "prices")}
				/>
				<label htmlFor="1500to2500">1500$ to 2500$</label>
			</div>
		</div>
	);
}
