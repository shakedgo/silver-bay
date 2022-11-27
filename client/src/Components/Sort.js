import React from "react";

export default function Sort({ changeState }) {
	return (
		<div className="sort-container">
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
					name="0to25"
					id="0to25"
					value="0to25"
					onChange={(e) => changeState(e.target.value, "price")}
				/>
				<label htmlFor="0to25">Under 25$</label>
			</div>
			<div>
				<input
					type="checkbox"
					name="25to99"
					id="25to99"
					value="25to99"
					onChange={(e) => changeState(e.target.value, "price")}
				/>
				<label htmlFor="25to99">25$ to 99$</label>
			</div>
			<div>
				<input
					type="checkbox"
					name="100to499"
					id="100to499"
					value="100to499"
					onChange={(e) => changeState(e.target.value, "price")}
				/>
				<label htmlFor="100to499">100$ to 499$</label>
			</div>
			<div>
				<input
					type="checkbox"
					name="500to999"
					id="500to999"
					value="500to999"
					onChange={(e) => changeState(e.target.value, "price")}
				/>
				<label htmlFor="500to999">500$ to 999$</label>
			</div>
		</div>
	);
}
